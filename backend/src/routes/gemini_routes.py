from fastapi import APIRouter
import google.generativeai as genai, os
from dotenv import load_dotenv
from body_schemas.gemini_body_schema import getResponseFromGeminiBodySchema

# Initialize
router = APIRouter()
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


@router.post("/chat/completion")
def getResponseFromGemini(body: getResponseFromGeminiBodySchema):
    try:     
        model = genai.GenerativeModel(body.model)
        response = model.generate_content(body.text, generation_config=genai.GenerationConfig(
            max_output_tokens=500,
            temperature=0.7,
        ))
        print(response)
        return {"success": True, "message": response.text, "statusCode": 200}

    except Exception as e:
        response = {"success": False, "message":"An Error Occured: " + str(e), "statusCode": 500}

        # Logging the error
        print(response)

        return response
    



