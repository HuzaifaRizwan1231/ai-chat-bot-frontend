from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import openai
import os

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
        completion = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "developer", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Hello!"}
            ]
        )
        return (completion.choices[0].message)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))