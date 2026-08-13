import { Lead } from "./leadSchema";
import { enrichLead } from "./enrichment";
import {
  validateEmailSyntax,
  detectCatchAllDomain
} from "./validation";
import {
  cleanLeads,
  deduplicateByDomain
} from "./deduplication";
import { exportLeads } from "./export";

const rawLeads: Lead[] = [
  {
    fullName: "John Smith",
    jobTitle: "VP Sales",
    email: "john@acme.ai",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/john-smith",
    companyName: "Acme AI, Inc.",
    domain: "acme.ai",
    companySize: 250,
    industry: "B2B SaaS"
  },
  {
    fullName: "Sarah Johnson",
    jobTitle: "Head of RevOps",
    email: "sarah@cloudflow.com",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/sarah-johnson",
    companyName: "CloudFlow",
    domain: "cloudflow.com",
    companySize: 180,
    industry: "B2B SaaS"
  },
  {
    fullName: "Michael Brown",
    jobTitle: "CTO",
    email: "michael@datapulse.io",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/michael-brown",
    companyName: "DataPulse LLC",
    domain: "datapulse.io",
    companySize: 320,
    industry: "Software"
  },
  {
    fullName: "Emily Davis",
    jobTitle: "VP Sales",
    email: "emily@growthstack.com",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/emily-davis",
    companyName: "GrowthStack Corp.",
    domain: "growthstack.com",
    companySize: 120,
    industry: "B2B SaaS"
  },
  {
    fullName: "David Wilson",
    jobTitle: "CEO",
    email: "david@marketflow.io",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/david-wilson",
    companyName: "MarketFlow",
    domain: "marketflow.io",
    companySize: 90,
    industry: "SaaS"
  },
  {
    fullName: "Jessica Taylor",
    jobTitle: "VP Sales",
    email: "jessica@revboost.ai",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/jessica-taylor",
    companyName: "RevBoost",
    domain: "revboost.ai",
    companySize: 210,
    industry: "B2B SaaS"
  },
  {
    fullName: "Daniel Anderson",
    jobTitle: "Head of RevOps",
    email: "daniel@pipelinepro.com",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/daniel-anderson",
    companyName: "PipelinePro",
    domain: "pipelinepro.com",
    companySize: 160,
    industry: "SaaS"
  },
  {
    fullName: "Laura Thomas",
    jobTitle: "CTO",
    email: "laura@techflow.io",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/laura-thomas",
    companyName: "TechFlow",
    domain: "techflow.io",
    companySize: 400,
    industry: "Software"
  },
  {
    fullName: "Robert Jackson",
    jobTitle: "VP Sales",
    email: "robert@salescore.ai",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/robert-jackson",
    companyName: "SalesCore",
    domain: "salescore.ai",
    companySize: 275,
    industry: "B2B SaaS"
  },
  {
    fullName: "Sophia White",
    jobTitle: "Revenue Operations Manager",
    email: "sophia@scaleops.com",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/sophia-white",
    companyName: "ScaleOps",
    domain: "scaleops.com",
    companySize: 190,
    industry: "SaaS"
  },
  {
    fullName: "James Harris",
    jobTitle: "VP Sales",
    email: "james@leadcraft.io",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/james-harris",
    companyName: "LeadCraft",
    domain: "leadcraft.io",
    companySize: 140,
    industry: "B2B SaaS"
  },
  {
    fullName: "Olivia Martin",
    jobTitle: "CTO",
    email: "olivia@automatehq.com",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/olivia-martin",
    companyName: "AutomateHQ",
    domain: "automatehq.com",
    companySize: 350,
    industry: "SaaS"
  },
  {
    fullName: "William Thompson",
    jobTitle: "Head of Sales",
    email: "william@dealflow.ai",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/william-thompson",
    companyName: "DealFlow",
    domain: "dealflow.ai",
    companySize: 230,
    industry: "B2B SaaS"
  },
  {
    fullName: "Ava Garcia",
    jobTitle: "VP Revenue",
    email: "ava@revenuehub.io",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/ava-garcia",
    companyName: "RevenueHub",
    domain: "revenuehub.io",
    companySize: 300,
    industry: "SaaS"
  },
  {
    fullName: "Noah Martinez",
    jobTitle: "CTO",
    email: "noah@cloudscale.com",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/noah-martinez",
    companyName: "CloudScale",
    domain: "cloudscale.com",
    companySize: 450,
    industry: "Software"
  },
  {
    fullName: "Mia Robinson",
    jobTitle: "VP Sales",
    email: "mia@growthlab.ai",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/mia-robinson",
    companyName: "GrowthLab",
    domain: "growthlab.ai",
    companySize: 110,
    industry: "B2B SaaS"
  },
  {
    fullName: "Ethan Clark",
    jobTitle: "Head of RevOps",
    email: "ethan@opsgenius.com",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/ethan-clark",
    companyName: "OpsGenius",
    domain: "opsgenius.com",
    companySize: 170,
    industry: "SaaS"
  },
  {
    fullName: "Isabella Lewis",
    jobTitle: "VP Sales",
    email: "isabella@salespilot.io",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/isabella-lewis",
    companyName: "SalesPilot",
    domain: "salespilot.io",
    companySize: 260,
    industry: "B2B SaaS"
  },
  {
    fullName: "Lucas Lee",
    jobTitle: "CTO",
    email: "lucas@productflow.ai",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/lucas-lee",
    companyName: "ProductFlow",
    domain: "productflow.ai",
    companySize: 200,
    industry: "Software"
  },
  {
    fullName: "Amelia Walker",
    jobTitle: "VP Sales",
    email: "amelia@saasforge.com",
    emailVerificationStatus: "unknown",
    linkedinUrl: "https://linkedin.com/in/amelia-walker",
    companyName: "SaaSForge",
    domain: "saasforge.com",
    companySize: 380,
    industry: "B2B SaaS"
  }
];

async function main() {
  console.log(`Starting with ${rawLeads.length} leads...`);

  // Step 1: Validate email syntax
  const validLeads = rawLeads.filter((lead) =>
    validateEmailSyntax(lead.email)
  );

  console.log(
    `After email validation: ${validLeads.length} leads`
  );

  // Step 2: Enrich leads
  const enrichedLeads = await Promise.all(
    validLeads.map((lead) => enrichLead(lead))
  );

  // Step 3: Detect catch-all domains
  const verifiedLeads = enrichedLeads.map((lead) => ({
    ...lead,
    emailVerificationStatus: detectCatchAllDomain(
      lead.domain
    )
      ? "catch_all" as const
      : "valid" as const
  }));

  // Step 4: Clean
  const cleanedLeads = cleanLeads(verifiedLeads);

  // Step 5: Deduplicate
  const uniqueLeads = deduplicateByDomain(cleanedLeads);

  console.log(
    `After deduplication: ${uniqueLeads.length} leads`
  );

  // Step 6: Export
  await exportLeads(uniqueLeads);

  console.log("\nDay 3 pipeline completed.");
}

main().catch((error) => {
  console.error("Pipeline failed:", error);
  process.exit(1);
});