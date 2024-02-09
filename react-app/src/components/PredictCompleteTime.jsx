import React, { useState } from 'react';
import axios from 'axios';

export const PredictCompletetionTime = () => {

    const[teamSize, setTeamSize] = useState('');
    const[budget, setBudget] = useState('');
    const[workload, setWorkLoad] = useState('');
    const[predictedCompletionTime, setPredictedCompletionTime] = useState('');

    const handlePredict = async () => {

        try {
            const reponse = await axios.post('/predict', {
                team_size: teamSize,
                budget: budget,
                workload: workload
            });
            setPredictedCompletionTime(response.data.predicted_completion_time);
        } catch (error){
            console.error('error', error);
        }

    };

    return (
        <div>
          <h2>Predict Completion Time</h2>
          <div>
            <label>Team Size:</label>
            <input type="number" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} />
          </div>
          <div>
            <label>Budget:</label>
            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
          <div>
            <label>Workload:</label>
            <input type="number" value={workload} onChange={(e) => setWorkload(e.target.value)} />
          </div>
          <button onClick={handlePredict}>Predict Completion Time</button>
          {predictedCompletionTime && (
            <p>Predicted Completion Time: {predictedCompletionTime}</p>
          )}
        </div>
      );
    };










