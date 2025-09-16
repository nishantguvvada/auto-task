from crew import EmailAutomationFlow

def main():
    task_auto_flow = EmailAutomationFlow()
    response = task_auto_flow.kickoff()
    return response

if __name__ == "__main__":
    flow_output = main()
    print(flow_output)