import { hubspotClient } from "./hubspotClient";

export interface CompanyInput {
  name: string;
  domain: string;
}

export interface ContactInput {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
}

export interface DealInput {
  name: string;
  amount: string;
  pipeline: string;
  dealStage: string;
}

export async function createCompany(
  company: CompanyInput
) {
  return hubspotClient.crm.companies.basicApi.create({
    properties: {
      name: company.name,
      domain: company.domain
    }
  });
}

export async function createContact(
  contact: ContactInput
) {
  return hubspotClient.crm.contacts.basicApi.create({
    properties: {
      firstname: contact.firstName,
      lastname: contact.lastName,
      email: contact.email,
      jobtitle: contact.jobTitle
    }
  });
}

export async function createDeal(
  deal: DealInput
) {
  return hubspotClient.crm.deals.basicApi.create({
    properties: {
      dealname: deal.name,
      amount: deal.amount,
      pipeline: deal.pipeline,
      dealstage: deal.dealStage
    }
  });
}
export async function associateContactWithCompany(
  contactId: string,
  companyId: string
) {
  return hubspotClient.crm.associations.v4.basicApi.create(
    "contacts",
    contactId,
    "companies",
    companyId,
    [
      {
        associationCategory: "HUBSPOT_DEFINED" as any,
        associationTypeId: 1
      }
    ]
  );
}

export async function associateDealWithCompany(
  dealId: string,
  companyId: string
) {
  return hubspotClient.crm.associations.v4.basicApi.create(
    "deals",
    dealId,
    "companies",
    companyId,
    [
      {
        associationCategory: "HUBSPOT_DEFINED" as any,
        associationTypeId: 5
      }
    ]
  );
}

export async function associateDealWithContact(
  dealId: string,
  contactId: string
) {
  return hubspotClient.crm.associations.v4.basicApi.create(
    "deals",
    dealId,
    "contacts",
    contactId,
    [
      {
        associationCategory: "HUBSPOT_DEFINED" as any,
        associationTypeId: 3
      }
    ]
  );
}