"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoring_1 = require("./scoring");
const fs_1 = require("fs");
const path_1 = require("path");
const leads = [
    {
        companyName: "Acme AI",
        arr: 25000000,
        headcount: 250,
        techStack: ["HubSpot", "Slack"],
        location: "United States",
        jobTitle: "VP Sales"
    },
    {
        companyName: "CloudFlow",
        arr: 10000000,
        headcount: 150,
        techStack: ["Salesforce"],
        location: "United Kingdom",
        jobTitle: "Marketing Manager"
    },
    {
        companyName: "StartupX",
        arr: 3000000,
        headcount: 100,
        techStack: ["Notion"],
        location: "India",
        jobTitle: "CEO"
    },
    {
        companyName: "TinyTech",
        arr: 500000,
        headcount: 20,
        techStack: ["Slack"],
        location: "India",
        jobTitle: "Founder"
    },
    {
        companyName: "EnterpriseFlow",
        arr: 50000000,
        headcount: 1000,
        techStack: ["Salesforce", "AWS"],
        location: "United States",
        jobTitle: "CTO"
    }
];
const scoredLeads = leads.map((lead) => ({
    ...lead,
    fitScore: (0, scoring_1.scoreICP)(lead)
}));
// Create the data directory if it doesn't exist
const dataDirectory = (0, path_1.join)(process.cwd(), "data");
(0, fs_1.mkdirSync)(dataDirectory, { recursive: true });
// Define the output file
const outputPath = (0, path_1.join)(dataDirectory, "scored_leads.json");
// Save scored leads to JSON
(0, fs_1.writeFileSync)(outputPath, JSON.stringify(scoredLeads, null, 2), "utf-8");
// Display results
console.log(JSON.stringify(scoredLeads, null, 2));
console.log(`\nEvaluated ${scoredLeads.length} leads.`);
console.log(`Results saved to: ${outputPath}`);
