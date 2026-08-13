import { Lead } from "./leadSchema";

export function cleanCompanyName(companyName: string): string {
  return companyName
    .trim()
    .replace(/,\s*(Inc\.?|LLC|Ltd\.?|Corporation|Corp\.?)$/i, "")
    .replace(/\s+/g, " ");
}

export function deduplicateByDomain(leads: Lead[]): Lead[] {
  const seenDomains = new Set<string>();

  return leads.filter((lead) => {
    const domain = lead.domain.toLowerCase().trim();

    if (seenDomains.has(domain)) {
      return false;
    }

    seenDomains.add(domain);
    return true;
  });
}

export function cleanLeads(leads: Lead[]): Lead[] {
  return leads.map((lead) => ({
    ...lead,
    email: lead.email.trim().toLowerCase(),
    domain: lead.domain.trim().toLowerCase(),
    companyName: cleanCompanyName(lead.companyName)
  }));
}