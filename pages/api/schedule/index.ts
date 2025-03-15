import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '@/lib/mongodb';
import WorkoutSchedule from '@/models/WorkoutSchedule';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const schedules = await WorkoutSchedule.find({ userId: session.user.id })
        .sort({ day: 1 });
      return res.status(200).json(schedules);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      return res.status(500).json({ message: 'Error fetching schedules' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { day, workouts } = req.body;

      // Validate required fields
      if (!day || !workouts) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Update or create schedule for the day
      const schedule = await WorkoutSchedule.findOneAndUpdate(
        { userId: session.user.id, day },
        { 
          userId: session.user.id,
          day,
          workouts,
          updatedAt: new Date(),
        },
        { upsert: true, new: true }
      );

      return res.status(200).json(schedule);
    } catch (error) {
      console.error('Error creating schedule:', error);
      return res.status(500).json({ message: 'Error creating schedule' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 