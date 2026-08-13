export type EmailVerificationStatus =
  | "valid"
  | "invalid"
  | "catch_all"
  | "unknown";

export interface Lead {
  fullName: string;
  jobTitle: string;
  email: string;
  emailVerificationStatus: EmailVerificationStatus;
  linkedinUrl: string;
  companyName: string;
  domain: string;
  companySize: number;
  industry: string;
}