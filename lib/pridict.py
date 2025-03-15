# predict.py
import sys
import json
import joblib

# Load the model
model = joblib.load('model.pkl')

# Parse input data
user_data = json.loads(sys.argv[1])
prediction = model.predict([user_data])

# Return the prediction
print(prediction[0])