import { LeadStateMachine } from "../src/leadStateMachine";
import { LeadEvent, LeadStatus, Lead } from "../src/types";

describe("Lead Qualification State Machine", () => {

  const machine = new LeadStateMachine();

  test("NEW → CONTACTED when outreach is sent", () => {

    const lead: Lead = {
      id: "L001",
      name: "John Smith",
      email: "john@example.com",
      icpScore: 90,
      status: LeadStatus.NEW
    };

    const result = machine.transition(
      lead,
      LeadEvent.OUTREACH_SENT
    );

    expect(result.newStatus).toBe(LeadStatus.CONTACTED);
  });

  test("CONTACTED → QUALIFIED when qualification passes", () => {

    const lead: Lead = {
      id: "L002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      icpScore: 90,
      status: LeadStatus.CONTACTED
    };

    const result = machine.transition(
      lead,
      LeadEvent.QUALIFICATION_PASSED
    );

    expect(result.newStatus).toBe(LeadStatus.QUALIFIED);
  });

  test("CONTACTED → UNQUALIFIED when qualification fails", () => {

    const lead: Lead = {
      id: "L003",
      name: "Mike Brown",
      email: "mike@example.com",
      icpScore: 50,
      status: LeadStatus.CONTACTED
    };

    const result = machine.transition(
      lead,
      LeadEvent.QUALIFICATION_FAILED
    );

    expect(result.newStatus).toBe(LeadStatus.UNQUALIFIED);
  });

  test("High-intent NEW lead generates SLA alert", () => {

    const lead: Lead = {
      id: "L004",
      name: "Alex Wilson",
      email: "alex@example.com",
      icpScore: 95,
      status: LeadStatus.NEW
    };

    const result = machine.transition(
      lead,
      LeadEvent.HIGH_INTENT_DETECTED
    );

    expect(result.event).toBe(LeadEvent.SLA_BREACHED);

    expect(result.message).toContain("SLA alert");
  });

});