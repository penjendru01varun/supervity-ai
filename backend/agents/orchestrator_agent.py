import json
import logging
import datetime
from typing import Dict, Any, List
import os
from .parser_agent import ParserAgent
from .research_agent import ResearchAgent
from .content_agent import ContentAgent
from .distribution_agent import DistributionAgent

class OrchestratorAgent:
    def __init__(self, output_dir: str = "data/outputs"):
        self.output_dir = output_dir
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        self.parser = ParserAgent()
        self.research = ResearchAgent()
        self.content = ContentAgent(output_dir)
        self.distribution = DistributionAgent()
        
        self.audit_log: List[Dict[str, Any]] = []

    def log_action(self, agent: str, action: str, data: Any = None):
        log_entry = {
            "timestamp": datetime.datetime.now().isoformat(),
            "agent": agent,
            "action": action,
            "data": data
        }
        self.audit_log.append(log_entry)
        # In a real app, save this to a persistable log file
        logging.info(f"[{agent}] {action}: {json.dumps(data) if data else ''}")

    async def orchestrate_flow(self, input_text: str = None, file_content: bytes = None):
        """
        Main workflow orchestration.
        """
        # 1. Parse Input
        self.log_action("ParserAgent", "Received input", {"has_text": bool(input_text), "has_file": bool(file_content)})
        if file_content:
            parsed_data = await self.parser.parse_pdf(file_content)
        else:
            parsed_data = await self.parser.parse_text(input_text)
        
        self.log_action("ParserAgent", "Parsing completed", parsed_data)
        
        extracted_text = parsed_data.get("raw_text", "")
        # 2. Extract Entities via LLM (Mocked inside Parser for now)
        structured_data = await self.parser.extract_entities(extracted_text)
        self.log_action("ParserAgent", "Entities extracted", structured_data)

        # 3. Research Context
        location = structured_data.get("location", {}).get("address", "Delhi")
        incident_type = structured_data.get("cause_keywords", ["accident"])[0]
        
        self.log_action("ResearchAgent", "Starting research", {"location": location, "type": incident_type})
        
        stats = await self.research.search_stats(location, incident_type)
        guidelines = await self.research.search_guidelines(incident_type)
        prevention = await self.research.search_prevention(structured_data.get("cause_keywords", []))
        authorities = await self.research.search_authorities(location)
        
        research_data = {
            "statistics": stats,
            "guidelines": guidelines,
            "prevention_tips": prevention,
            "authorities": authorities
        }
        self.log_action("ResearchAgent", "Research completed", research_data)

        # 4. Human Approval Workbench (Simulated - returns data for UI presentation)
        blueprint = {
            "incident": structured_data,
            "research": research_data,
            "audit_trail": self.audit_log
        }
        return blueprint

    async def generate_outputs(self, blueprint: dict):
        """
        Generate final outputs after user approval.
        """
        self.log_action("ContentAgent", "Starting artifact generation")
        
        incident_data = blueprint["incident"]
        research_data = blueprint["research"]
        
        pdf_path = self.content.generate_pdf_report(incident_data, research_data)
        poster_path = self.content.generate_poster(incident_data, research_data)
        docx_path = self.content.generate_document(incident_data, research_data)
        pptx_path = self.content.generate_presentation(incident_data, research_data)
        timeline_path = self.content.generate_timeline(incident_data)
        
        generated_files = [pdf_path, poster_path, docx_path, pptx_path, timeline_path]
        self.log_action("ContentAgent", "Artifacts generated", generated_files)
        
        # 5. Distribute
        self.log_action("DistributionAgent", "Sharing artifacts")
        shared_links = await self.distribution.save_to_onedrive(generated_files)
        self.log_action("DistributionAgent", "Shared to OneDrive", shared_links)
        
        return {
            "files": [os.path.basename(f) for f in generated_files],
            "links": shared_links,
            "audit_trail": self.audit_log
        }
