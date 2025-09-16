import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

def list_messages():
    """
    Lists the user's Gmail messages.
    """

    creds = None

    if os.path.exists("config/token.json"):
        creds = Credentials.from_authorized_user_file("config/token.json", SCOPES)
        print("Credentials restored.")
        
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("config/credentials.json", SCOPES)
            creds = flow.run_local_server(port=4000)
        with open("config/token.json", "w") as token:
            token.write(creds.to_json())
            print("Token saved.")

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
    email_list = list_messages()
    print(email_list)