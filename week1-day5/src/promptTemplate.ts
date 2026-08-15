import { LeadProfile } from "./leadSchema";

export function buildPersonalizationPrompt(
  lead: LeadProfile
): string {
  return `
You are an expert B2B outbound sales copywriter.

Create a concise personalized cold outreach opener.

Lead:
Name: ${lead.firstName} ${lead.lastName}
Job Title: ${lead.jobTitle}
Company: ${lead.companyName}
Industry: ${lead.industry}
Company Size: ${lead.companySize}
Recent News: ${lead.recentNews}
Pain Point: ${lead.painPoint}
Product Value: ${lead.productValue}

Rules:
- Write exactly 2 sentences.
- Use only the information provided.
- Do not invent facts.
- Do not use generic praise.
- Do not start with "I hope you're doing well."
- Keep the tone professional and conversational.
- Connect the recent company signal to the likely business problem.

Return only the opener.
`.trim();
}