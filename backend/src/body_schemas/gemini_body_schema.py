from pydantic import BaseModel

class getResponseFromGeminiBodySchema(BaseModel):
    model: str
    text: str