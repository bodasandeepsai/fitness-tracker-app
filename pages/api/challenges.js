// pages/api/challenges.js
export default function handler(req, res) {
    const challenges = [
      { id: 1, name: 'Burn 500 Calories', goal: 500 },
    ];
  
    res.status(200).json({ challenges });
  }