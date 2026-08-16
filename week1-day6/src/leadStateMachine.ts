import {
  Lead,
  LeadEvent,
  LeadStatus,
  TransitionResult
} from "./types";

export class LeadStateMachine {
  transition(
    lead: Lead,
    event: LeadEvent
  ): TransitionResult {

    const previousStatus = lead.status;

    switch (event) {

      case LeadEvent.OUTREACH_SENT:
        if (lead.status === LeadStatus.NEW) {
          lead.status = LeadStatus.CONTACTED;
        }
        break;

      case LeadEvent.QUALIFICATION_PASSED:
        if (lead.status === LeadStatus.CONTACTED) {
          lead.status = LeadStatus.QUALIFIED;
        }
        break;

      case LeadEvent.QUALIFICATION_FAILED:
        if (
          lead.status === LeadStatus.CONTACTED ||
          lead.status === LeadStatus.NEW
        ) {
          lead.status = LeadStatus.UNQUALIFIED;
        }
        break;

      case LeadEvent.HIGH_INTENT_DETECTED:
        if (
          lead.status === LeadStatus.NEW &&
          lead.icpScore >= 80
        ) {
          return {
            leadId: lead.id,
            previousStatus: lead.status,
            newStatus: lead.status,
            event: LeadEvent.SLA_BREACHED,
            timestamp: new Date().toISOString(),
            message: `SLA alert: High-intent lead ${lead.name} requires immediate contact.`
          };
        }
        break;

      default:
        throw new Error(`Unsupported event: ${event}`);
    }

    return {
      leadId: lead.id,
      previousStatus,
      newStatus: lead.status,
      event,
      timestamp: new Date().toISOString(),
      message:
        `${lead.name}: ${previousStatus} → ${lead.status}`
    };
  }
}