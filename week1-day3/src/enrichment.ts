import { Lead } from "./leadSchema";

export async function enrichLead(lead: Lead): Promise<Lead> {
  const domain = lead.email.split("@")[1]?.toLowerCase() ?? "";

  return {
    ...lead,
    domain,
    emailVerificationStatus: "valid"
  };
}