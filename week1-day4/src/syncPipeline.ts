import {
  createCompany,
  createContact,
  createDeal,
  associateContactWithCompany,
  associateDealWithCompany,
  associateDealWithContact
} from "./crmMapper";

async function syncCRM() {
  console.log("Starting HubSpot CRM sync...\n");

  const company = await createCompany({
    name: "Acme AI",
    domain: "acme-ai-demo.com"
  });

  console.log(`Company created: ${company.id}`);

  const contact = await createContact({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@acme-ai-demo.com",
    jobTitle: "VP Sales"
  });

  console.log(`Contact created: ${contact.id}`);

  await associateContactWithCompany(
    contact.id,
    company.id
  );

  console.log(
    `Contact ${contact.id} → Company ${company.id}`
  );

  const deal = await createDeal({
    name: "Acme AI Enterprise Deal",
    amount: "25000",
    pipeline: "default",
    dealStage: "appointmentscheduled"
  });

  console.log(`Deal created: ${deal.id}`);

  await associateDealWithCompany(
    deal.id,
    company.id
  );

  console.log(
    `Deal ${deal.id} → Company ${company.id}`
  );

  await associateDealWithContact(
    deal.id,
    contact.id
  );

  console.log(
    `Deal ${deal.id} → Contact ${contact.id}`
  );

  console.log("\nCRM sync completed successfully.");
}

syncCRM().catch((error) => {
  console.error("\nCRM sync failed.");

  if (error.response?.body) {
    console.error(error.response.body);
  } else {
    console.error(error);
  }

  process.exit(1);
});