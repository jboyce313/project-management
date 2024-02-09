import { useState } from "react";
import axios from "axios";

export function PredictCompleteTime() {
  const [teamSize, setTeamSize] = useState("");
  const [budget, setBudget] = useState("");
  const [workload, setWorkLoad] = useState("");
  const [predictedCompletionTime, setPredictedCompletionTime] = useState("");

  const handlePredict = async () => {
    try {
      const response = await axios.post("/data/predict", {
        team_size: teamSize,
        budget: budget,
        workload: workload,
      });
      console.log(response.data.pred_completion_time);
      setPredictedCompletionTime(response.data.pred_completion_time);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <h2>Predict Completion Time</h2>
      <div>
        <label>Team Size:</label>
        <input
          type="number"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
        />
      </div>
      <div>
        <label>Budget:</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <div>
        <label>Workload:</label>
        <input
          type="number"
          value={workload}
          onChange={(e) => setWorkLoad(e.target.value)}
        />
      </div>
      <button onClick={handlePredict}>Predict Completion Time</button>
      {predictedCompletionTime && (
        <p>Predicted Completion Time: {predictedCompletionTime}</p>
      )}
    </div>
  );
}
