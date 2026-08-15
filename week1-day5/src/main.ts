import { LeadProfile } from "./leadSchema";
import { generateEmailVariants } from "./emailGenerator";
import { buildPersonalizationPrompt } from "./promptTemplate";

const lead: LeadProfile = {
  firstName: "John",
  lastName: "Smith",
  jobTitle: "VP Sales",
  companyName: "Acme AI",
  industry: "B2B SaaS",
  companySize: 250,
  recentNews: "expanding its sales team",
  painPoint: "manual lead qualification",
  productValue: "AI-powered lead qualification and routing"
};

console.log("\n========================================");
console.log("AI GTM — COLD EMAIL GENERATOR");
console.log("========================================\n");

console.log("LEAD PROFILE");
console.log("----------------------------------------");
console.log(`Name:        ${lead.firstName} ${lead.lastName}`);
console.log(`Title:       ${lead.jobTitle}`);
console.log(`Company:     ${lead.companyName}`);
console.log(`Industry:    ${lead.industry}`);
console.log(`Company Size:${lead.companySize}`);
console.log(`News:        ${lead.recentNews}`);
console.log(`Pain Point:  ${lead.painPoint}`);

console.log("\nPERSONALIZATION PROMPT");
console.log("----------------------------------------");
console.log(buildPersonalizationPrompt(lead));

const variants = generateEmailVariants(lead);

console.log("\n\nEMAIL VARIANTS");
console.log("========================================");

for (const email of variants) {
  console.log(`\nVARIANT ${email.variant}`);
  console.log("----------------------------------------");
  console.log(`Subject:     ${email.subject}`);
  console.log(`Hook:        ${email.hook}`);
  console.log(`Value Prop:  ${email.valueProp}`);
  console.log(`CTA:         ${email.cta}`);
}