export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  UNQUALIFIED = "UNQUALIFIED"
}

export enum LeadEvent {
  OUTREACH_SENT = "OUTREACH_SENT",
  QUALIFICATION_PASSED = "QUALIFICATION_PASSED",
  QUALIFICATION_FAILED = "QUALIFICATION_FAILED",
  HIGH_INTENT_DETECTED = "HIGH_INTENT_DETECTED",
  SLA_BREACHED = "SLA_BREACHED"
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  icpScore: number;
  status: LeadStatus;
  lastContactedAt?: Date;
}

export interface TransitionResult {
  leadId: string;
  previousStatus: LeadStatus;
  newStatus: LeadStatus;
  event: LeadEvent;
  timestamp: string;
  message: string;
}