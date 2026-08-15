import { LeadProfile } from "./leadSchema";

export interface EmailVariant {
  variant: number;
  subject: string;
  hook: string;
  valueProp: string;
  cta: string;
}

export function generateEmailVariants(
  lead: LeadProfile
): EmailVariant[] {
  return [
    {
      variant: 1,
      subject: `${lead.companyName}'s sales growth`,
      hook: `Saw that ${lead.companyName} has been ${lead.recentNews.toLowerCase()}.`,
      valueProp: `We help ${lead.jobTitle} teams reduce ${lead.painPoint} with ${lead.productValue}.`,
      cta: `Worth a 15-minute conversation next week?`
    },

    {
      variant: 2,
      subject: `Idea for ${lead.companyName}`,
      hook: `Given ${lead.companyName}'s recent growth, I imagine keeping ${lead.painPoint} under control becomes increasingly important.`,
      valueProp: `${lead.productValue} can help teams like yours make that process more efficient without adding unnecessary manual work.`,
      cta: `Open to taking a quick look?`
    },

    {
      variant: 3,
      subject: `${lead.firstName}, quick idea`,
      hook: `Your role as ${lead.jobTitle} caught my attention, especially with ${lead.companyName} currently ${lead.recentNews.toLowerCase()}.`,
      valueProp: `We help companies improve ${lead.painPoint} through ${lead.productValue}.`,
      cta: `Would a short intro be useful?`
    }
  ];
}