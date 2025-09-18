import os.path
import datetime
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/calendar.readonly"]

def get_token():

    creds = None

    if os.path.exists("config/token.json"):
        creds = Credentials.from_authorized_user_file("config/token.json", SCOPES)
        print("Credentials restored.")
        
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("config/credentials-1.json", SCOPES)
            creds = flow.run_local_server(port=4000)
        with open("config/token.json", "w") as token:
            token.write(creds.to_json())
            print("Token saved.")

    return creds

def list_events():
    """
    Lists the user's calendar events
    """

    creds = get_token()

    try:
        service = build("calendar", "v3", credentials=creds)

        # Call the Calendar API
        now = datetime.datetime.now(tz=datetime.timezone.utc).isoformat()
        print("Getting the upcoming 10 events")
        events_result = (
            service.events()
            .list(
                calendarId="primary",
                timeMin=now,
                maxResults=5,
                singleEvents=True,
                orderBy="startTime",
            )
            .execute()
        )
        events = events_result.get("items", [])

        if not events:
            print("No upcoming events found.")
            return

        # Prints the start and name of the next 10 events
        results = []
        for event in events:
            if "dateTime" in event["start"]:
                start = event["start"]["dateTime"]
                end = event["end"]["dateTime"]
                print(start, "-", end, event["summary"])

    
            # start = event["start"].get("dateTime", event["start"].get("date"))
            # end = event["end"].get("dateTime", event["end"].get("date"))
            # print(start, "-", end, event["summary"])

    except HttpError as error:
        print(f"An error occurred: {error}")


def list_messages():
    """
    Lists the user's Gmail messages.
    """

    creds = get_token()

    try:
        service = build("gmail", "v1", credentials=creds)
        results = (
            service.users().messages().list(userId="me", labelIds=["INBOX"], maxResults=5).execute() # q="newer_than:12h"
        )
        messages = results.get("messages", [])

        if not messages:
            print("No messages found.")
            return
        
        result = []
        print("Messages:")
        for message in messages:
            print(f'Message ID: {message["id"]}')
            msg = (
                service.users().messages().get(userId="me", id=message["id"]).execute()
            )
            
            # if msg['payload']['mimeType'] == 'text/html':
            #     print(f'Email: {msg['payload']['body']['data']}')
            # else:
            #     print(f'Email: {msg['payload']['body'].keys()}')
            # print(f'  Subject: {msg["snippet"]}')
            result.append({"id": message["id"], "subject": msg["snippet"]})
        return result

    except HttpError as error:
        print(f"An error occurred: {error}")

if __name__ == "__main__":
    # email_list = list_messages()
    event_list = list_events()
    # print(email_list)
    print(event_list)