import { useState } from "react";
import axios from "axios";
import "../styles/PredictCompleteTime.css";

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
      
      const completionTimeMonths = Math.floor(response.data.pred_completion_time);
      const completionTimeDays = Math.round((response.data.pred_completion_time % 1) * 30); // Assuming a month has 30 days
      
      setPredictedCompletionTime(`${completionTimeMonths} months and ${completionTimeDays} days`);
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
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
        />
      </div>
      <div>
        <label>Budget:</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <div>
        <label>Workload:</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
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
