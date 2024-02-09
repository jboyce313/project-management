from faker import Faker
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

def generate_dummy_data(num_records=1000):
    fake = Faker()
    team_sizes = [np.random.randint(1, 10) for _ in range(num_records)]
    budgets = [np.random.randint(10000, 50000) for _ in range(num_records)]
    workloads = [np.random.randint(1, 10) for _ in range(num_records)]
    completion_times = [20 * team_size + 10 * budget / workload + np.random.normal(0, 10) for team_size, budget, workload in zip(team_sizes, budgets, workloads)]
    
    data = {
        'team_size': team_sizes,
        'budget': budgets,
        'workload': workloads,
        'completion_time': completion_times
    }
    
    return pd.DataFrame(data)

# Generate dummy data
df = generate_dummy_data()

# Split data into features and target variable
X = df[['team_size', 'budget', 'workload']]
y = df['completion_time']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions on the testing data
y_pred = model.predict(X_test)

# Evaluate how accurate the model is using R-squared value.
# The R-squared value tells us how well the independent variables (team_size, budget, workload) predict the dependent variable (completion_time)
# The closer the R-squared value is to 1, the better it indicates that the model is able to predict completion time based on the indepdendent variables.
r_squared = r2_score(y_test, y_pred)
print("R-squared:", r_squared)

# This code will give us an accuracy score by checking what percent of values fall inside our percentage of error, in this case 20%
# It checks the predicted values against the tested values and checks whether it is within 20%, if so then it adds it to the count
# In the end it adds all the accurate predictions up, divides it by all the predictions and gives us a percentage of accuracy.
threshold = 0.20  # Define a threshold (e.g., 20%)
errors = np.abs(y_test - y_pred)  # Calculate absolute errors
accurate_predictions = np.sum(errors < threshold * y_test)  # Count accurate predictions
accuracy_percentage = (accurate_predictions / len(y_test)) * 100  # Calculate accuracy percentage
print("Accuracy Percentage:", accuracy_percentage)

# Since the data generated is all random, the predicted data will also be random and inaccurate.