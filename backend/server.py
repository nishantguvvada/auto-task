from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from main import main

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def default():
    return {"response": "working"}

@app.get("/flow")
def flow():
    flow_output = main()
    return {"response": {"summary": flow_output.overall_summary, "action_items": flow_output.action_items}}

@app.get("/sample")
def sample_flow():
    return {
    "response": {
        "summary": "Today's emails included a reminder to complete an urgent task, information about a Google Application Engineer position, an account balance update from HDFC Bank, a curated list of articles from Medium, and a notification about relevant virtual hackathons.",
        "action_items": [
            {
                "action_item": "Complete the urgent task mentioned in the first email."
            },
            {
                "action_item": "Review the Google Application Engineer job description and apply if qualified.  [link to job posting]"
            },
            {
                "action_item": "Review the HDFC Bank account balance statement. [link to online banking]"
            },
            {
                "action_item": "Read the curated articles from Medium. [Link to Sahil Nair's Article], [Link to Geopolitical Economist's Article], [Link to article(s)]"
            },
            {
                "action_item": "Check out the suggested virtual hackathons and update profile to receive future notifications. [link to hackathon list], [link to profile update]"
            }
        ]
    }}

if __name__ == "__main__":
    uvicorn.run(app=app, host="0.0.0.0", port=4000)