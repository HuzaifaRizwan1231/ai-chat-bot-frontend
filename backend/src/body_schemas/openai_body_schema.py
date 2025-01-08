from pydantic import BaseModel

class getResponseFromOpenaiBodySchema(BaseModel):
    model: str
    text: str