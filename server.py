# from flask import Flask, request, jsonify
# import pickle

# app = Flask(__name__)

# with open('trained_model.pkl', 'rb') as file:
#     model = pickle.load(file)

# @app.route('/data/predict', methods=['POST'])

# def predict_completion_time():

#     data = request.get_json()
#     team_size = data['team_size']
#     budget = data['budget']
#     workload = data['workload']

#     predicted_completion_time = model.predict([[team_size, budget, workload]])

#     return jsonify({'pred_completion_time' : predicted_completion_time[0]})

# if __name__ == '__main__':  
#    app.run()

from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

with open('trained_model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/data/predict', methods=['POST'])
def predict_completion_time():
    data = request.get_json()
    
    try:
        team_size = float(data['team_size'])
        budget = float(data['budget'])
        workload = float(data['workload'])
    except ValueError:
        return jsonify({'error': 'Invalid input. Please provide numeric values for team_size, budget, and workload.'}), 400

    predicted_completion_time = model.predict([[team_size, budget, workload]])
    return jsonify({'pred_completion_time': predicted_completion_time[0]})

if __name__ == '__main__':  
    app.run()
