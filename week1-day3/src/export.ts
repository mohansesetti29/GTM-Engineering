import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { createObjectCsvWriter } from "csv-writer";
import { Lead } from "./leadSchema";

export async function exportLeads(leads: Lead[]) {
  const dataDirectory = join(process.cwd(), "data");

  mkdirSync(dataDirectory, { recursive: true });

  // JSON export
  const jsonPath = join(
    dataDirectory,
    "leads_enriched.json"
  );

  writeFileSync(
    jsonPath,
    JSON.stringify(leads, null, 2),
    "utf-8"
  );

  // CSV export
  const csvPath = join(
    dataDirectory,
    "leads_enriched.csv"
  );

  const csvWriter = createObjectCsvWriter({
    path: csvPath,
    header: [
      { id: "fullName", title: "Full Name" },
      { id: "jobTitle", title: "Job Title" },
      { id: "email", title: "Email" },
      {
        id: "emailVerificationStatus",
        title: "Email Verification Status"
      },
      { id: "linkedinUrl", title: "LinkedIn URL" },
      { id: "companyName", title: "Company Name" },
      { id: "domain", title: "Domain" },
      { id: "companySize", title: "Company Size" },
      { id: "industry", title: "Industry" }
    ]
  });

  await csvWriter.writeRecords(leads);

  console.log(`JSON exported to: ${jsonPath}`);
  console.log(`CSV exported to: ${csvPath}`);
}