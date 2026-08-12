import { LeadProfile } from "./icpSchema";
import { scoreICP } from "./scoring";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const leads: LeadProfile[] = [
  {
    companyName: "Acme AI",
    arr: 25_000_000,
    headcount: 250,
    techStack: ["HubSpot", "Slack"],
    location: "United States",
    jobTitle: "VP Sales"
  },

  {
    companyName: "CloudFlow",
    arr: 10_000_000,
    headcount: 150,
    techStack: ["Salesforce"],
    location: "United Kingdom",
    jobTitle: "Marketing Manager"
  },

  {
    companyName: "StartupX",
    arr: 3_000_000,
    headcount: 100,
    techStack: ["Notion"],
    location: "India",
    jobTitle: "CEO"
  },

  {
    companyName: "TinyTech",
    arr: 500_000,
    headcount: 20,
    techStack: ["Slack"],
    location: "India",
    jobTitle: "Founder"
  },

  {
    companyName: "EnterpriseFlow",
    arr: 50_000_000,
    headcount: 1000,
    techStack: ["Salesforce", "AWS"],
    location: "United States",
    jobTitle: "CTO"
  }
];

const scoredLeads = leads.map((lead) => ({
  ...lead,
  fitScore: scoreICP(lead)
}));

// Create the data directory if it doesn't exist
const dataDirectory = join(process.cwd(), "data");

mkdirSync(dataDirectory, { recursive: true });

// Define the output file
const outputPath = join(dataDirectory, "scored_leads.json");

// Save scored leads to JSON
writeFileSync(
  outputPath,
  JSON.stringify(scoredLeads, null, 2),
  "utf-8"
);

// Display results
console.log(JSON.stringify(scoredLeads, null, 2));

console.log(`\nEvaluated ${scoredLeads.length} leads.`);
console.log(`Results saved to: ${outputPath}`);