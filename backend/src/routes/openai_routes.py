from fastapi import APIRouter
import openai, os
from dotenv import load_dotenv
from body_schemas.openai_body_schema import getResponseFromOpenaiBodySchema

# Initialize
router = APIRouter()
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

@router.post("/chat/completion")
def getResponseFromOpenAI(body: getResponseFromOpenaiBodySchema):
    try:    
        completion = openai.chat.completions.create(
            model=body.model,
            messages=[
                {"role": "developer", "content": "You are a helpful assistant."},
                {"role": "user", "content": body.text}
            ]
        )
        return {"success": True, "message": completion.choices[0].message.content, "statusCode": 200}

    except Exception as e:
        response = {"success": False, "message":e.response.json().get('error', {}).get('message', str(e)), "statusCode": e.response.status_code}
        # Logging the error
        print(response)
        return response
  