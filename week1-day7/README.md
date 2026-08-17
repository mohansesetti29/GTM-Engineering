 **`README.md`** for Day 7. It matches what you actually built and the assignment requirements.

````markdown
# Week 1 Day 7 — Mini Lead Management System

A TypeScript and Node.js CLI application that processes raw email leads, validates them, enriches them with dummy company data, scores them using ICP rules, qualifies them, and formats the results into CRM-ready records.

---

## 🎯 Objective

The goal of Day 7 is to combine the GTM engineering concepts developed throughout Week 1 into one end-to-end lead management pipeline.

The application demonstrates:

- Raw lead ingestion
- Email validation
- Lead enrichment
- ICP-based lead scoring
- Lead qualification
- Error handling
- Status logging
- CRM-ready data formatting
- JSON output generation

---

# 🏗️ System Architecture

```text
                RAW EMAIL LEADS
                       │
                       ▼
              ┌─────────────────┐
              │ Email Validation│
              └────────┬────────┘
                       │
                 Valid Email
                       │
                       ▼
              ┌─────────────────┐
              │ Dummy Enrichment│
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   ICP Scoring   │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  Qualification  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  CRM Formatting │
              └────────┬────────┘
                       │
                       ▼
             crm_leads.json
````

---

# 📁 Project Structure

```text
week1-day7/
│
├── src/
│   └── lead-manager.ts
│
├── data/
│   └── leads.json
│
├── output/
│   └── crm_leads.json
│
├── README.md
├── sample-output.txt
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

# ⚙️ Technology Stack

| Technology | Purpose                           |
| ---------- | --------------------------------- |
| TypeScript | Application logic and type safety |
| Node.js    | Runtime environment               |
| npm        | Dependency management             |
| Git        | Version control                   |
| JSON       | Input and CRM output format       |

---

# 📥 Input

The application starts with raw email leads stored in:

```text
data/leads.json
```

Example:

```json
[
  {
    "email": "john@acme.ai"
  },
  {
    "email": "sarah@cloudflow.io"
  },
  {
    "email": "invalid-email"
  }
]
```

The initial lead data intentionally contains only email addresses.

The rest of the company and contact information is obtained during the enrichment stage.

---

# 🔍 Step 1 — Email Validation

Each email is checked using a basic syntax validation rule.

Example:

```text
john@acme.ai
```

is valid.

While:

```text
invalid-email
```

is rejected.

Invalid leads are logged and skipped instead of stopping the entire pipeline.

---

# 🔎 Step 2 — Lead Enrichment

After validation, the application extracts the domain from the email address.

Example:

```text
john@acme.ai
       ↓
    acme.ai
```

The domain is then matched against a local dummy enrichment dataset.

The enrichment process provides:

* First name
* Last name
* Company name
* Job title
* ARR
* Headcount
* Technology stack
* Location
* Email verification status

Example:

```text
john@acme.ai
       ↓
Acme AI
John Smith
VP Sales
ARR: $25M
Employees: 250
Tech: HubSpot, Slack
Location: United States
```

### Why dummy enrichment?

The assignment allows:

> dummy/API data

A mock enrichment layer allows the complete pipeline to be developed without requiring Apollo, Clay, or another external API.

---

# 📊 Step 3 — ICP Scoring

The application uses the ICP scoring logic developed during Day 2.

Maximum score: **100**

| Criterion                       | Points |
| ------------------------------- | -----: |
| Headcount between 50–500        |    +30 |
| ARR >= $5M                      |    +30 |
| HubSpot or Salesforce           |    +20 |
| VP Sales / Head of RevOps / CTO |    +20 |

### Example

Acme AI:

```text
Headcount: 250
        +30

ARR: $25M
        +30

Tech: HubSpot
        +20

Title: VP Sales
        +20

----------------
Total: 100
```

---

# 🎯 Step 4 — Lead Qualification

After scoring, leads are classified using the following rule:

```text
ICP Score >= 70
        ↓
QUALIFIED
```

```text
ICP Score < 70
        ↓
UNQUALIFIED
```

Example:

```text
John Smith
ICP Score: 100
Status: QUALIFIED
```

and:

```text
Mike Brown
ICP Score: 30
Status: UNQUALIFIED
```

---

# 🧾 Step 5 — CRM Formatting

The processed lead is converted into a structured CRM-ready record.

Example:

```json
{
  "email": "john@acme.ai",
  "domain": "acme.ai",
  "firstName": "John",
  "lastName": "Smith",
  "companyName": "Acme AI",
  "jobTitle": "VP Sales",
  "arr": 25000000,
  "headcount": 250,
  "techStack": [
    "HubSpot",
    "Slack"
  ],
  "location": "United States",
  "emailVerified": true,
  "fitScore": 100,
  "status": "QUALIFIED"
}
```

This format can later be mapped to a CRM API such as HubSpot.

---

# 📤 Output

The final records are written to:

```text
output/crm_leads.json
```

The output contains only successfully processed leads.

For example:

```text
Raw Leads: 5
Successfully Processed: 4
Rejected: 1
```

---

# 🖥️ CLI Execution

## Install dependencies

```bash
npm install
```

## Build the TypeScript application

```bash
npm run build
```

## Run the application

```bash
npm start
```

---

# 💻 Sample Run

```text
========================================
AI GTM — LEAD MANAGEMENT SYSTEM
========================================

Loaded 5 raw leads.

Processing: john@acme.ai
✓ Enriched: Acme AI
✓ ICP Score: 100
✓ Status: QUALIFIED

Processing: sarah@cloudflow.io
✓ Enriched: CloudFlow
✓ ICP Score: 80
✓ Status: QUALIFIED

Processing: mike@startupx.com
✓ Enriched: StartupX
✓ ICP Score: 30
✓ Status: UNQUALIFIED

Processing: invalid-email
❌ Invalid email format

Processing: emma@enterpriseflow.com
✓ Enriched: EnterpriseFlow
✓ ICP Score: 70
✓ Status: QUALIFIED

========================================
PIPELINE COMPLETE
========================================

Successfully processed: 4
CRM output: output/crm_leads.json
```

The same output is saved in:

```text
sample-output.txt
```

---

# 🛡️ Error Handling

The application is designed to continue processing even when individual leads fail.

### Invalid email

```text
invalid-email
      ↓
Invalid email format
      ↓
Lead skipped
```

### Missing enrichment data

If a valid email belongs to a domain that does not exist in the dummy enrichment database:

```text
No enrichment data found
        ↓
Error logged
        ↓
Lead skipped
        ↓
Remaining leads continue
```

This prevents one bad record from crashing the entire batch.

---

# 🔄 End-to-End Example

A complete lead goes through:

```text
john@acme.ai
      │
      ▼
Email Validation
      │
      ▼
acme.ai
      │
      ▼
Enrichment
      │
      ├── John Smith
      ├── VP Sales
      ├── Acme AI
      ├── $25M ARR
      └── 250 Employees
      │
      ▼
ICP Scoring
      │
      ▼
100 / 100
      │
      ▼
QUALIFIED
      │
      ▼
CRM-ready JSON
```

---

# 🔗 Connection to Week 1

This project combines the previous GTM engineering tasks.

```text
Day 2
ICP Scoring
    ↓
Day 3
Lead Enrichment
    ↓
Day 4
HubSpot CRM
    ↓
Day 5
Cold Email Generation
    ↓
Day 6
CRM Workflow Logic
    ↓
Day 7
Lead Management System
```

Day 7 acts as the integration point for the core concepts learned throughout Week 1.

---

# 🧠 GTM Engineering Architecture

The resulting conceptual workflow is:

```text
Lead Source
(Apollo / Clay / CSV / Form)
        │
        ▼
Lead Ingestion
        │
        ▼
Validation
        │
        ▼
Enrichment
        │
        ▼
ICP Scoring
        │
        ▼
Qualification
        │
        ├───────────────┐
        │               │
        ▼               ▼
  QUALIFIED       UNQUALIFIED
        │
        ▼
CRM Record
        │
        ▼
Sales Workflow
```

---

# 🚧 Current Limitations

This is a learning project and does not currently connect to external services.

It does **not** currently:

* Call Apollo APIs
* Call Clay APIs
* Verify emails using MX/SMTP
* Push records directly to HubSpot
* Send emails
* Use an external database
* Use an AI model
* Implement real API rate limiting

The enrichment layer is intentionally mocked.

---

# 🚀 Future Improvements

A production version could add:

### Real enrichment

```text
Raw Email
    ↓
Apollo / Clay API
    ↓
Company + Contact Data
```

### Real CRM integration

```text
Qualified Lead
      ↓
HubSpot API
      ↓
Contact + Company + Deal
```

### Real email verification

```text
Email
 ↓
Syntax
 ↓
MX
 ↓
SMTP
 ↓
Catch-all Detection
```

### Batch processing

Add:

* Rate limiting
* Retry logic
* API timeout handling
* Exponential backoff
* Batch size control

### AI qualification

```text
Lead Data
    ↓
AI Analysis
    ↓
Intent / Fit Signal
    ↓
ICP Score
    ↓
CRM
```

---

# 📋 Requirements

Before running the project:

* Node.js
* npm
* TypeScript
* Git
* VS Code or another code editor

No external API key or CRM account is required.

---

# ✅ Day 7 Completion Checklist

* [x] Raw email ingestion
* [x] Email validation
* [x] Dummy enrichment
* [x] ICP scoring
* [x] Lead qualification
* [x] Error handling
* [x] Status logging
* [x] CRM-ready formatting
* [x] JSON output
* [x] CLI application
* [x] README documentation
* [x] Sample run output

---

# 📌 GitHub

Project location:

```text
GTM-Engineering/
└── week1-day7/
```

Commit:

```bash
git add .
git commit -m "week1-day7: Mini deliverable"
git push
```

---

# 🎓 Key Learning Outcome

The main lesson from Day 7 is that GTM engineering is not just about generating leads.

A complete GTM system needs to:

```text
INGEST
   ↓
VALIDATE
   ↓
ENRICH
   ↓
SCORE
   ↓
QUALIFY
   ↓
FORMAT
   ↓
ROUTE TO CRM
```

This project demonstrates that entire flow as a working TypeScript CLI application.

```

**One correction:** your assignment shows both `Day 7: Mini implementation` and `week1-day7: Mini deliverable`. Use **`week1-day7: Mini deliverable`** because that is the explicit GitHub folder/commit convention.
```
