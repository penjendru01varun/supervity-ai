from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from agents.orchestrator_agent import OrchestratorAgent
import os
import uvicorn
import json
import logging

app = FastAPI(title="Road Safety AI Agent API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, set to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Output directory for static files
OUTPUT_DIR = "data/outputs"
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)
    
app.mount("/outputs", StaticFiles(directory=OUTPUT_DIR), name="outputs")

# Initialize Orchestrator
orchestrator = OrchestratorAgent(OUTPUT_DIR)

@app.post("/api/analyze")
async def analyze_incident(
    text: str = Form(None),
    file: UploadFile = File(None)
):
    """
    Step 1: Parse input and perform research context lookup.
    """
    try:
        file_content = None
        if file:
            file_content = await file.read()
        
        blueprint = await orchestrator.orchestrate_flow(input_text=text, file_content=file_content)
        return blueprint
    except Exception as e:
        logging.error(f"Analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate")
async def generate_outputs(blueprint: dict = Body(...)):
    """
    Step 2: Generate all artifacts after human approval.
    """
    try:
        result = await orchestrator.generate_outputs(blueprint)
        return result
    except Exception as e:
        logging.error(f"Generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
