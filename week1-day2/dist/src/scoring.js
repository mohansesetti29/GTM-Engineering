"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreICP = scoreICP;
function scoreICP(lead) {
    let score = 0;
    // Company size
    if (lead.headcount >= 50 && lead.headcount <= 500) {
        score += 30;
    }
    // Annual recurring revenue
    if (lead.arr >= 5000000) {
        score += 30;
    }
    // Relevant CRM technology
    if (lead.techStack.includes("HubSpot") ||
        lead.techStack.includes("Salesforce")) {
        score += 20;
    }
    // Relevant buyer persona
    if (["VP Sales", "Head of RevOps", "CTO"].includes(lead.jobTitle)) {
        score += 20;
    }
    return Math.min(score, 100);
}
