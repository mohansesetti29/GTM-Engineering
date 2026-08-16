import { LeadStateMachine } from "./leadStateMachine";
import { LeadEvent, LeadStatus, Lead } from "./types";

const machine = new LeadStateMachine();

const leads: Lead[] = [
  {
    id: "L001",
    name: "John Smith",
    email: "john@acme.ai",
    icpScore: 92,
    status: LeadStatus.NEW
  },
  {
    id: "L002",
    name: "Sarah Johnson",
    email: "sarah@cloudflow.io",
    icpScore: 65,
    status: LeadStatus.NEW
  },
  {
    id: "L003",
    name: "Mike Brown",
    email: "mike@startupx.com",
    icpScore: 88,
    status: LeadStatus.NEW
  }
];

console.log("========================================");
console.log("CRM LEAD QUALIFICATION STATE MACHINE");
console.log("========================================");

console.log("\n--- Lead 1 ---");

console.log(
  machine.transition(
    leads[0],
    LeadEvent.OUTREACH_SENT
  )
);

console.log(
  machine.transition(
    leads[0],
    LeadEvent.QUALIFICATION_PASSED
  )
);

console.log("\n--- Lead 2 ---");

console.log(
  machine.transition(
    leads[1],
    LeadEvent.OUTREACH_SENT
  )
);

console.log(
  machine.transition(
    leads[1],
    LeadEvent.QUALIFICATION_FAILED
  )
);

console.log("\n--- Lead 3 ---");

console.log(
  machine.transition(
    leads[2],
    LeadEvent.HIGH_INTENT_DETECTED
  )
);