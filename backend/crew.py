from crewai import LLM, Agent, Task, Crew
from crewai.flow.flow import Flow, listen, start
from pydantic import BaseModel, Field
from typing import List
from list_messages import list_messages
import os
from dotenv import load_dotenv

load_dotenv()

class EmailContent(BaseModel):
    content: str = Field(description="Content of the email.")

class EmailContentList(BaseModel):
    content_list: List[EmailContent] = Field(description="A list of email contents.")

class ActionItems(BaseModel):
    action_item: str = Field(description="Precise action item extracted from the email.")

class EmailSummarization(BaseModel):
    overall_summary: str = Field(description="Overall summary of all the emails received during the day.")
    action_items: List[ActionItems] = Field(description="List of action items extracted from the emails.")

class EmailAutomationState(BaseModel):
    output: EmailSummarization = None
    messages: List[str] = []

llm = LLM(model="gemini/gemini-1.5-flash", api_key=os.getenv("GEMINI_API_KEY"))

content_agent = Agent(
    role="Creative Content Writer",
    goal="Generate a creative email content based on the subject of the email.",
    backstory="Expert professional content creator and editor.",
    llm=llm
)

action_item_agent = Agent(
    role="Executive Assistant",
    goal="Extract actionable items from the provided summary.",
    backstory="Expert professional executive assistant.",
    llm=llm
)

summarization_agent = Agent(
    role="Summarization Assistant",
    goal="Generate summary of the provided content.",
    backstory="Expert professional summarization assistant.",
    llm=llm
)

class EmailAutomationFlow(Flow[EmailAutomationState]):

    @start()
    def get_emails(self):
        emails = list_messages()
        self.state.messages.append({"step":"get_emails", "output": emails})
        return emails
    
    @listen(get_emails)
    def generate_content(self, emails: List):

        input = "\n".join([f'Subject {idx+1}: {item["subject"]}\n----\n' for idx, item in enumerate(emails)])

        task = Task(
            description=f"Generate a creative email content for each of the following subjects. {input}",
            agent=content_agent,
            expected_output="A list of email content. Each email content is a creative write-up based on the subject of the email.",
            output_pydantic=EmailContentList
        )
        crew = Crew(agents=[content_agent], tasks=[task])
        result = crew.kickoff()
        print("Task 1 Response: \n", result)
        self.state.messages.append({"step":"generate_content", "output": result})
        return result.pydantic
    
    @listen(generate_content)
    def generate_action_items(self, content):

        input = "\n".join([f'Email Content {idx+1}: {item.content}\n----\n' for idx, item in enumerate(content.content_list)])

        task = Task(
            description=f"Provide an overall summary for the below content received during the entire day and generate one concrete action item from each of the emails. \n\n {input}",
            agent=action_item_agent,
            expected_output="An overall summary and a list of action items.",
            output_pydantic=EmailSummarization
        )
        crew = Crew(agents=[action_item_agent], tasks=[task])
        result = crew.kickoff()
        print("Task 2 Response: \n", result)
        self.state.messages.append({"step":"generate_action_items", "output": result})
        return result.pydantic


if __name__ == "__main__":
    task_auto_flow = EmailAutomationFlow()
    response = task_auto_flow.kickoff()
    print(response)
