from fastapi import FastAPI, HTTPException
import openai

app = FastAPI()
openai.api_key = "OPENAI_API_KEY"


@app.get("/chat_completions")
def getResponse():
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