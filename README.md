# 🚦 Road Safety AI Agent

A comprehensive AI-powered agent for analyzing road incidents, generating awareness materials, and coordinating safety responses.

## 🚀 Features
- **Intelligent Incident Parsing**: Extract data from text or PDF reports (OCR supported).
- **Web Research Intelligence**: Automated gathering of regional road safety statistics and guidelines.
- **Artifact Generation**:
    1. **Incident Analysis Report** (PDF)
    2. **Road Safety Awareness Poster** (PNG)
    3. **Prevention Guide** (DOCX)
    4. **Community Briefing** (PPTX)
    5. **Incident Timeline Visualization** (PNG)
- **Distribution**: Seamless sharing via OneDrive and Outlook.
- **Audit Trail**: Full transparency with real-time logging of agent activities.
- **Approval Workbench**: Human-in-the-loop validation before final artifact creation.

## 🛠️ Technology Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Three.js
- **Backend**: FastAPI (Python 3.10+), Agents-based orchestration
- **Agents**:
    - `ParserAgent`: Text/PDF OCR parsing
    - `ResearchAgent`: Web search & stats gathering
    - `ContentAgent`: PDF/Doc/PPT/Image generation
    - `DistributionAgent`: Microsoft Graph API integration
    - `OrchestratorAgent`: Master workflow controller

## 🏗️ Installation

### 1. Requirements
Ensure you have the following installed:
- Node.js 22+
- Python 3.10+
- Tesseract OCR (for scanned PDF support)
- Poppler Utils (for pdf2image)

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Configuration
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_key
SERPAPI_API_KEY=your_serpapi_key
MS_CLIENT_ID=your_onedrive_client_id
MS_CLIENT_SECRET=your_onedrive_client_secret
```

## 📜 License
MIT
