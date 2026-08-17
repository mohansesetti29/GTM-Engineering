import fs from "fs";
import path from "path";

interface RawLead {
  email: string;
}

interface CRMLead {
  email: string;
  domain: string;
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle: string;
  arr: number;
  headcount: number;
  techStack: string[];
  location: string;
  emailVerified: boolean;
  fitScore: number;
  status: "QUALIFIED" | "UNQUALIFIED";
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

function enrichLead(email: string): CRMLead {
  const domain = email.split("@")[1];

  const enrichmentData: Record<
    string,
    Omit<CRMLead, "email" | "domain" | "fitScore" | "status">
  > = {
    "acme.ai": {
      firstName: "John",
      lastName: "Smith",
      companyName: "Acme AI",
      jobTitle: "VP Sales",
      arr: 25000000,
      headcount: 250,
      techStack: ["HubSpot", "Slack"],
      location: "United States",
      emailVerified: true
    },

    "cloudflow.io": {
      firstName: "Sarah",
      lastName: "Johnson",
      companyName: "CloudFlow",
      jobTitle: "Marketing Manager",
      arr: 10000000,
      headcount: 150,
      techStack: ["Salesforce"],
      location: "United Kingdom",
      emailVerified: true
    },

    "startupx.com": {
      firstName: "Mike",
      lastName: "Brown",
      companyName: "StartupX",
      jobTitle: "CEO",
      arr: 3000000,
      headcount: 100,
      techStack: ["Notion"],
      location: "India",
      emailVerified: true
    },

    "enterpriseflow.com": {
      firstName: "Emma",
      lastName: "Davis",
      companyName: "EnterpriseFlow",
      jobTitle: "CTO",
      arr: 50000000,
      headcount: 1000,
      techStack: ["Salesforce", "AWS"],
      location: "United States",
      emailVerified: true
    }
  };

  const companyData = enrichmentData[domain];

  if (!companyData) {
    throw new Error(`No enrichment data found for domain: ${domain}`);
  }

  return {
    email,
    domain,
    ...companyData,
    fitScore: 0,
    status: "UNQUALIFIED"
  };
}

function scoreICP(lead: CRMLead): number {
  let score = 0;

  if (lead.headcount >= 50 && lead.headcount <= 500) {
    score += 30;
  }

  if (lead.arr >= 5000000) {
    score += 30;
  }

  if (
    lead.techStack.includes("HubSpot") ||
    lead.techStack.includes("Salesforce")
  ) {
    score += 20;
  }

  if (
    ["VP Sales", "Head of RevOps", "CTO"].includes(
      lead.jobTitle
    )
  ) {
    score += 20;
  }

  return Math.min(score, 100);
}

function processLead(email: string): CRMLead | null {
  console.log(`\nProcessing: ${email}`);

  if (!validateEmail(email)) {
    console.log("❌ Invalid email format");
    return null;
  }

  try {
    const lead = enrichLead(email);

    console.log(`✓ Enriched: ${lead.companyName}`);

    const fitScore = scoreICP(lead);

    const status =
      fitScore >= 70
        ? "QUALIFIED"
        : "UNQUALIFIED";

    lead.fitScore = fitScore;
    lead.status = status;

    console.log(`✓ ICP Score: ${fitScore}`);
    console.log(`✓ Status: ${status}`);

    return lead;

  } catch (error) {
    console.log(
      `❌ Error: ${
        error instanceof Error
          ? error.message
          : "Unknown error"
      }`
    );

    return null;
  }
}

function main(): void {
  console.log("========================================");
  console.log("AI GTM — LEAD MANAGEMENT SYSTEM");
  console.log("========================================");

  const inputPath = path.join(
    process.cwd(),
    "data",
    "leads.json"
  );

  const outputPath = path.join(
    process.cwd(),
    "output",
    "crm_leads.json"
  );

  const rawData = fs.readFileSync(
    inputPath,
    "utf-8"
  );

  const rawLeads: RawLead[] = JSON.parse(rawData);

  console.log(
    `\nLoaded ${rawLeads.length} raw leads.`
  );

  const processedLeads = rawLeads
    .map((lead) => processLead(lead.email))
    .filter(
      (lead): lead is CRMLead => lead !== null
    );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(processedLeads, null, 2)
  );

  console.log("\n========================================");
  console.log("PIPELINE COMPLETE");
  console.log("========================================");

  console.log(
    `Successfully processed: ${processedLeads.length}`
  );

  console.log(
    `CRM output: ${outputPath}`
  );
}

main();