from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import gemini_routes, openai_routes

# Initialize FastAPI app
app = FastAPI()

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# Routes
app.include_router(gemini_routes.router, prefix="/api/gemini")
app.include_router(openai_routes.router, prefix="/api/openai")



  


    

