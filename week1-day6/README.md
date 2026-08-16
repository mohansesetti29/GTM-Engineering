

````markdown
# Week 1 Day 6 — CRM Workflows & Sales Process Automation

A TypeScript-based Lead Qualification State Machine that simulates CRM workflow automation using lead status transitions, incoming sales signals, event logging, and SLA alerts.

---

## 🎯 Objective

The goal of Day 6 is to understand how CRM workflows can be represented and automated using software logic.

This project implements a state machine that:

- Tracks the current status of a lead
- Accepts incoming CRM/user signals
- Determines valid status transitions
- Emits workflow events
- Detects high-intent leads
- Generates SLA alerts for uncontacted high-intent leads
- Provides automated transition tests

---

# 🧠 What Problem Are We Solving?

In a real sales organization, leads move through different stages.

For example:

```text
NEW
 ↓
CONTACTED
 ↓
QUALIFIED
 ↓
OPPORTUNITY
 ↓
CLOSED WON
````

However, these transitions should not happen randomly.

They should be triggered by events.

For example:

```text
Lead = NEW

Event:
OUTREACH_SENT

Result:
NEW → CONTACTED
```

Another example:

```text
Lead = CONTACTED

Event:
QUALIFICATION_PASSED

Result:
CONTACTED → QUALIFIED
```

This project models those rules programmatically.

---

# 🏗️ Architecture

```text
                  LEAD
                   │
                   ▼
                 NEW
              /        \
             /          \
            ▼            ▼
   OUTREACH_SENT    HIGH_INTENT
          │              │
          ▼              ▼
      CONTACTED      SLA ALERT
       /      \
      /        \
     ▼          ▼
QUALIFIED   UNQUALIFIED
```

The core automation pattern is:

```text
EVENT
  ↓
CONDITION
  ↓
ACTION
  ↓
NEW STATE
```

---

# 📁 Project Structure

```text
week1-day6/
│
├── src/
│   ├── types.ts
│   ├── leadStateMachine.ts
│   └── main.ts
│
├── tests/
│   └── stateMachine.test.ts
│
├── jest.config.js
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

# 📌 File Responsibilities

## `src/types.ts`

Contains the core TypeScript definitions.

It defines:

### Lead statuses

```text
NEW
CONTACTED
QUALIFIED
UNQUALIFIED
```

### Events

```text
OUTREACH_SENT
QUALIFICATION_PASSED
QUALIFICATION_FAILED
HIGH_INTENT_DETECTED
SLA_BREACHED
```

It also defines the structure of a lead and the result returned from each transition.

---

## `src/leadStateMachine.ts`

Contains the main workflow logic.

The `LeadStateMachine` class receives:

```text
Lead
+
Event
```

and determines the resulting state.

Example:

```text
NEW
 +
OUTREACH_SENT
 ↓
CONTACTED
```

Another:

```text
CONTACTED
 +
QUALIFICATION_PASSED
 ↓
QUALIFIED
```

---

## `src/main.ts`

Runs the state-machine simulation.

It creates sample leads and sends different signals to the state machine.

The CLI displays:

* Lead
* ICP score
* Current status
* Incoming signal
* Resulting action
* Transition/event message

---

## `tests/stateMachine.test.ts`

Contains automated unit tests that verify the state transitions.

The tests verify:

* NEW → CONTACTED
* CONTACTED → QUALIFIED
* CONTACTED → UNQUALIFIED
* High-intent lead → SLA alert

---

## `jest.config.js`

Configures Jest to execute the TypeScript tests located inside the `tests` directory.

---

# 👤 Lead Data Model

Each lead contains:

```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  icpScore: number;
  status: LeadStatus;
  lastContactedAt?: Date;
}
```

Example:

```json
{
  "id": "L001",
  "name": "John Smith",
  "email": "john@acme.ai",
  "icpScore": 92,
  "status": "NEW"
}
```

---

# 🔄 Lead State Machine

The state machine controls which transitions are allowed.

## NEW → CONTACTED

Triggered when outreach is sent.

```text
NEW
 ↓
OUTREACH_SENT
 ↓
CONTACTED
```

---

## CONTACTED → QUALIFIED

Triggered when the lead passes qualification.

```text
CONTACTED
 ↓
QUALIFICATION_PASSED
 ↓
QUALIFIED
```

---

## CONTACTED → UNQUALIFIED

Triggered when qualification fails.

```text
CONTACTED
 ↓
QUALIFICATION_FAILED
 ↓
UNQUALIFIED
```

---

# 🔥 High-Intent Signal & SLA Automation

One of the key requirements of Day 6 is handling high-intent leads that have not been contacted.

Example:

```text
Lead:
Mike Brown

ICP Score:
88

Status:
NEW

Signal:
HIGH_INTENT_DETECTED
```

The system checks:

```text
Is lead NEW?
        ↓
      YES
        ↓
Is ICP Score >= 80?
        ↓
      YES
        ↓
SLA_BREACHED
        ↓
Alert Sales Team
```

The system produces:

```text
Incoming Signal: HIGH_INTENT_DETECTED
Action: SLA_BREACHED

SLA alert:
High-intent lead Mike Brown requires immediate contact.
```

The purpose is to prevent valuable leads from sitting untouched.

---

# ⚙️ Event-Driven CRM Automation

The project demonstrates the basic architecture used by CRM workflow systems:

```text
EVENT
  ↓
TRIGGER
  ↓
CONDITION
  ↓
ACTION
  ↓
STATE CHANGE
```

Example:

```text
OUTREACH_SENT
      ↓
Lead is NEW
      ↓
Update status
      ↓
CONTACTED
```

Another:

```text
HIGH_INTENT_DETECTED
      ↓
ICP Score >= 80
      ↓
Check contact status
      ↓
Lead still NEW
      ↓
Generate SLA alert
```

---

# 🚀 Installation

## Prerequisites

* Node.js
* npm
* TypeScript
* VS Code or another code editor

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

# 📦 Install Dependencies

From the `week1-day6` directory:

```bash
npm install
```

---

# 🔨 Build

Compile the TypeScript project:

```bash
npm run build
```

The compiled files are generated inside:

```text
dist/
```

---

# ▶️ Run the Simulator

Run:

```bash
npm run simulate
```

The simulator processes the sample leads and displays their state transitions and workflow events.

---

# 🧪 Run Tests

Run:

```bash
npm test
```

Expected result:

```text
PASS tests/stateMachine.test.ts

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

---

# 💻 Example Output

```text
========================================
CRM LEAD QUALIFICATION STATE MACHINE
========================================

--- Lead 1 ---

John Smith: NEW → CONTACTED

John Smith: CONTACTED → QUALIFIED


--- Lead 2 ---

Sarah Johnson: NEW → CONTACTED

Sarah Johnson: CONTACTED → UNQUALIFIED


--- Lead 3: HIGH-INTENT SIGNAL ---

Lead: Mike Brown
ICP Score: 88
Current Status: NEW
Incoming Signal: HIGH_INTENT_DETECTED
Action: SLA_BREACHED

Message:
SLA alert: High-intent lead Mike Brown requires immediate contact.
```

---

# 🔗 Connection to Previous GTM Engineering Days

Day 6 builds directly on the previous days.

```text
DAY 2
ICP & Lead Scoring
        ↓
DAY 3
Lead Generation & Enrichment
        ↓
DAY 4
HubSpot CRM Integration
        ↓
DAY 5
Cold Email Personalization
        ↓
DAY 6
CRM Workflow Automation
```

The complete conceptual system is:

```text
                 LEAD
                   ↓
              ENRICHMENT
                   ↓
              ICP SCORING
                   ↓
              HUBSPOT CRM
                   ↓
          EMAIL / OUTREACH
                   ↓
            CRM SIGNAL
                   ↓
          STATE MACHINE
                   ↓
       ┌───────────┼───────────┐
       ↓           ↓           ↓
    Routing      Tasks       Alerts
       ↓           ↓           ↓
   Sales Rep    Follow-up   SLA Alert
```

---

# 🧩 Real-World GTM Use Case

Imagine a company receives a lead from Apollo.

The lead is enriched and receives an ICP score:

```text
Company: Acme AI
Contact: John Smith
Role: VP Sales
ICP Score: 94
```

The lead enters the CRM:

```text
Status = NEW
```

The workflow engine sees:

```text
ICP Score >= 80
```

The lead is classified as high intent.

If no salesperson contacts the lead within the required SLA:

```text
HIGH_INTENT
     ↓
SLA TIMER
     ↓
TIME EXCEEDED
     ↓
ALERT SALES REP
```

After outreach:

```text
NEW
 ↓
CONTACTED
```

After qualification:

```text
CONTACTED
 ↓
QUALIFIED
```

This is the basic foundation of automated sales operations.

---

# 🎯 Why Use a State Machine?

A state machine provides predictable and controlled workflow behavior.

Without a state machine, application logic can become a collection of unrelated `if/else` statements.

With a state machine:

```text
Current State
      +
Incoming Event
      ↓
Valid Transition
      ↓
New State
```

This makes CRM automation:

* Easier to understand
* Easier to test
* Easier to extend
* Easier to debug
* More predictable

---

# 🛠️ Technology Stack

| Technology | Purpose                     |
| ---------- | --------------------------- |
| TypeScript | Workflow logic              |
| Node.js    | Runtime                     |
| Jest       | Unit testing                |
| ts-jest    | TypeScript Jest integration |
| npm        | Dependency management       |
| VS Code    | Development                 |

---

# 🔐 No External Services Required

This project is a local simulation.

It does not require:

* HubSpot API
* HubSpot credentials
* CRM account
* Webhooks
* Email provider
* Domain
* LLM API

The goal is to first implement and test the workflow logic independently.

---

# 🚀 Future Improvements

A production implementation could connect this state machine to real systems.

## HubSpot Integration

```text
HubSpot Event
      ↓
Webhook
      ↓
State Machine
      ↓
Workflow Action
```

## Automated Lead Routing

```text
Qualified Lead
      ↓
Territory / Score / Capacity
      ↓
Sales Rep Assignment
```

## SLA Monitoring

```text
High Intent Lead
      ↓
Start SLA Timer
      ↓
No Contact
      ↓
SLA Breach
      ↓
Slack / Email Alert
```

## AI-Based Qualification

```text
Lead
 ↓
Company Data
 ↓
AI Analysis
 ↓
Intent Signal
 ↓
State Machine
 ↓
CRM Action
```

---

# 📊 Day 6 Completion Checklist

* [x] CRM workflow requirements analyzed
* [x] Lead state model created
* [x] State machine implemented
* [x] NEW → CONTACTED transition
* [x] CONTACTED → QUALIFIED transition
* [x] CONTACTED → UNQUALIFIED transition
* [x] High-intent signal implemented
* [x] SLA alert implemented
* [x] Event logging implemented
* [x] Unit tests implemented
* [x] Build verified
* [x] Simulator verified

---

# 📌 Git Commit

Required Day 6 commit:

```bash
git add .
git commit -m "week1-day6: CRM deliverable"
git push
```

The project should be stored inside:

```text
GTM-Engineering/
└── week1-day6/
```

---

# 🎓 Day 6 Learning Outcome

The key concept learned in Day 6 is:

> CRM automation can be modeled as an event-driven state machine where incoming signals trigger validated state transitions and automated actions.

The core engineering pattern is:

```text
EVENT
  ↓
CONDITION
  ↓
ACTION
  ↓
STATE CHANGE
  ↓
EVENT LOG
```

This pattern can later be connected to real CRM APIs, webhooks, lead-routing systems, SLA monitoring, and AI-powered GTM workflows.

```

### One important thing

Your README now accurately reflects what you **actually built**. Don't claim that you built real-time HubSpot workflow automation or real SLA timers—you built a **simulator of those concepts**.

That's actually the right scope for this assignment. Later, you can connect this state machine to the HubSpot integration you built on Day 4.
```
