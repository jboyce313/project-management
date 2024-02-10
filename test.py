import numpy as np

#example from our project list
team_sizes = 6  # number of team members
budgets = 70000  # budget in dollars
workloads = 3  # workload level

# Calculate completion times using the modified equation

completion_times = (workloads / (team_sizes + (budgets / 50000)) * 10)
completion_times_rounded = round(completion_times)
completion_times_hours = round(completion_times  % 2)
# Print results
print(completion_times)
print('Completed in:' , completion_times_rounded, "months", "and", completion_times_hours, "weeks")
