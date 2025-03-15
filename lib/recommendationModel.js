// lib/recommendationModel.js
const { PythonShell } = require('python-shell');

export async function getRecommendation(userData) {
  const options = {
    scriptPath: './lib',
    args: [JSON.stringify(userData)],
  };

  return new Promise((resolve, reject) => {
    PythonShell.run('predict.py', options, (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
}