import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // Ensure you have a User model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "PUT") {
    const { name, email, password } = req.body;
    // Logic to update user details
    try {
      const user = await User.findById(req.user.id); // Assuming you have user authentication
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = password; // You should hash the password before saving
      }
      await user.save();
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error updating account:", error);
      return res.status(500).json({ message: "Error updating account" });
    }
  } else if (req.method === "DELETE") {
    // Logic to delete user account
    try {
      await User.findByIdAndDelete(req.user.id); // Assuming you have user authentication
      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting account:", error);
      return res.status(500).json({ message: "Error deleting account" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 