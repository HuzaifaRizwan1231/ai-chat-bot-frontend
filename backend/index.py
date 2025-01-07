from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import openai
import os
import time

load_dotenv()
app = FastAPI()
openai.api_key = os.getenv("API_KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


@app.get("/api/chat/completion")
def getChatCompletionResponse():
    try:
        
        # A dummy successfull response
        response = {"success": True, "message":"Hello! How can I help you?", "statusCode": 200}

        time.sleep(5)
        return response
    
        completion = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "developer", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Hello!"}
            ]
        )
        return (completion.choices[0].message)

    except Exception as e:
        response = {"success": False, "message":e.response.json().get('error', {}).get('message', str(e)), "statusCode": e.response.status_code}

        # Loggin the error
        print(response)

        return response