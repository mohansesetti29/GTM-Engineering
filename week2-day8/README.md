# Day 8 — n8n Lead Filter Workflow

A simple n8n workflow that receives lead data through a webhook, filters leads based on company size, and formats qualified leads into a standardized JSON structure.

---

## 📌 Project Overview

This project demonstrates the fundamentals of **n8n workflow automation** for GTM engineering.

The workflow accepts a lead through an HTTP webhook, evaluates the lead's company size, and only allows companies meeting the defined ICP threshold to continue through the workflow.

### Workflow

```text
                    ┌─────────────────┐
                    │  Webhook Trigger│
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Lead Input    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   IF Condition  │
                    │ companySize >=  │
                    │      100        │
                    └───────┬─────────┘
                       TRUE │ FALSE
                            │
                  ┌─────────┘
                  │
                  ▼
        ┌──────────────────────┐
        │ Format Qualified Lead│
        └──────────┬───────────┘
                   │
                   ▼
          ┌─────────────────┐
          │   JSON Output   │
          └─────────────────┘
```

---

# 🎯 Objectives

The project was built to demonstrate:

* Webhook-based workflow triggers
* Receiving JSON data in n8n
* n8n expression syntax
* Conditional lead filtering
* Data transformation
* Standardized GTM lead output
* Workflow testing
* Exporting/importing n8n workflows

---

# 🛠 Tech Stack

| Technology             | Purpose                     |
| ---------------------- | --------------------------- |
| n8n                    | Workflow automation         |
| Webhooks               | Lead ingestion              |
| JSON                   | Data exchange               |
| n8n IF Node            | Lead qualification          |
| Edit Fields / Set Node | Data transformation         |
| VS Code                | Workflow/project management |
| Git/GitHub             | Version control             |

No external API or paid service is required.

---

# 📁 Project Structure

```text
week2-day8/
│
├── n8n-lead-filter-workflow.json
├── README.md
└── .gitignore
```

### `n8n-lead-filter-workflow.json`

Exported n8n workflow containing the complete automation.

### `README.md`

Project documentation and setup instructions.

### `.gitignore`

Prevents unnecessary or sensitive files from being committed.

Example:

```gitignore
node_modules/
.env
.env.*
!.env.example
```

---

# 🔄 Workflow Components

## 1. Webhook Trigger

The workflow begins with an n8n **Webhook** node.

Configuration:

```text
Method: POST
Path: lead-filter
```

The webhook accepts lead information as JSON.

Example:

```json
{
  "name": "John Smith",
  "email": "john@acme.ai",
  "company": "Acme AI",
  "companySize": 250,
  "jobTitle": "VP Sales"
}
```

---

# 2. Lead Data

The workflow receives the following fields:

```json
{
  "name": "John Smith",
  "email": "john@acme.ai",
  "company": "Acme AI",
  "companySize": 250,
  "jobTitle": "VP Sales"
}
```

The important field for this workflow is:

```text
companySize
```

---

# 3. Lead Qualification

The **IF node** evaluates:

```text
companySize >= 100
```

### Qualified

```text
companySize = 250
```

Result:

```text
TRUE
```

The lead continues through the workflow.

### Not Qualified

```text
companySize = 50
```

Result:

```text
FALSE
```

The lead is filtered out.

---

# 4. n8n Expressions

n8n allows values from incoming JSON to be referenced using expressions.

For example:

```text
{{$json.name}}
```

returns:

```text
John Smith
```

Similarly:

```text
{{$json.email}}
```

returns:

```text
john@acme.ai
```

And:

```text
{{$json.companySize}}
```

returns:

```text
250
```

This is the foundation of dynamic data processing in n8n.

---

# 5. Lead Formatting

Qualified leads are passed to an **Edit Fields / Set** node.

The workflow creates a standardized output:

```json
{
  "name": "John Smith",
  "email": "john@acme.ai",
  "company": "Acme AI",
  "companySize": 250,
  "jobTitle": "VP Sales",
  "status": "qualified"
}
```

This standardized structure can later be sent to:

```text
HubSpot
Salesforce
Apollo
Google Sheets
Slack
Another API
```

---

# 🧪 Testing

## Test Case 1 — Qualified Lead

Input:

```json
{
  "name": "John Smith",
  "email": "john@acme.ai",
  "company": "Acme AI",
  "companySize": 250,
  "jobTitle": "VP Sales"
}
```

Expected:

```text
TRUE
```

Output:

```json
{
  "name": "John Smith",
  "email": "john@acme.ai",
  "company": "Acme AI",
  "companySize": 250,
  "jobTitle": "VP Sales",
  "status": "qualified"
}
```

---

## Test Case 2 — Unqualified Lead

Input:

```json
{
  "name": "Mike Brown",
  "email": "mike@example.com",
  "company": "SmallCo",
  "companySize": 25,
  "jobTitle": "Sales Manager"
}
```

Expected:

```text
FALSE
```

The lead should not continue through the qualified-lead processing path.

---

# 🚀 How to Import the Workflow

1. Open your n8n instance.
2. Create/open a workflow.
3. Select **Import from File**.
4. Select:

```text
n8n-lead-filter-workflow.json
```

5. The workflow nodes should appear.
6. Review the Webhook, IF, and formatting nodes.
7. Save the workflow.

---

# ▶️ How to Test the Workflow

After importing the workflow:

1. Open the **Webhook** node.
2. Use the **Test URL**.
3. Start the webhook listener.
4. Send a POST request containing lead JSON.

Example using `curl`:

```bash
curl -X POST "YOUR_N8N_WEBHOOK_URL" ^
-H "Content-Type: application/json" ^
-d "{\"name\":\"John Smith\",\"email\":\"john@acme.ai\",\"company\":\"Acme AI\",\"companySize\":250,\"jobTitle\":\"VP Sales\"}"
```

The workflow should execute:

```text
Webhook
   ↓
IF
   ↓
TRUE
   ↓
Format Lead
```

---

# 🧠 What I Learned

### 1. Node-Based Automation

Instead of implementing the entire process in TypeScript:

```text
function receiveLead()
function validateLead()
function filterLead()
function formatLead()
```

n8n allows these operations to be represented as connected nodes.

---

### 2. Data Items

n8n passes data between nodes as items.

Example:

```json
{
  "name": "John Smith",
  "companySize": 250
}
```

The next node can access these values dynamically.

---

### 3. Expressions

Dynamic values can be accessed using:

```text
{{$json.fieldName}}
```

For example:

```text
{{$json.companySize}}
```

---

### 4. Conditional Logic

The IF node allows workflow decisions without writing a complete `if` statement in code.

Conceptually:

```typescript
if (lead.companySize >= 100) {
    qualifyLead();
}
```

becomes:

```text
IF
companySize >= 100
     │
 ┌───┴───┐
TRUE    FALSE
```

---

### 5. Workflow Automation

The biggest lesson is that n8n can connect multiple systems into an automated pipeline.

The Day 8 workflow is intentionally small, but it can eventually become:

```text
Lead Source
     ↓
Webhook
     ↓
Validate
     ↓
Enrich
     ↓
ICP Score
     ↓
Filter
     ↓
HubSpot
     ↓
Sales Rep
     ↓
Email Sequence
```

That is where n8n becomes useful for **GTM engineering**.

---

# 🔮 Future Improvements

This project can later be extended with:

* Apollo enrichment
* Email verification
* ICP scoring
* HubSpot CRM creation
* Slack notifications
* AI lead classification
* Duplicate detection
* Rate-limit handling
* Retry logic
* Lead routing
* Database storage

These are **not required for Day 8**.

---

# 🔐 Security

Never commit API keys, passwords, access tokens, or webhook secrets.

Use environment variables or n8n credentials for sensitive information.

Do not put secrets directly into:

```text
n8n-lead-filter-workflow.json
```

---

# 📊 GTM Use Case

Imagine your company receives 10,000 leads from different sources.

Instead of manually reviewing them:

```text
10,000 Leads
      ↓
n8n
      ↓
Company Size Filter
      ↓
5,000 Qualified
      ↓
ICP Scoring
      ↓
2,000 High-Intent
      ↓
HubSpot
      ↓
Sales Team
```

The same basic architecture demonstrated in this project can be expanded into a real GTM automation system.

---

# 📌 Day 8 Deliverables

```text
✅ n8n workflow created
✅ Webhook trigger configured
✅ JSON lead ingestion
✅ Company-size filtering
✅ Conditional workflow branch
✅ Qualified lead formatting
✅ Workflow tested
✅ Workflow exported as JSON
✅ README documentation
✅ GitHub commit
```

---

# Git Commit

From the `week2-day8` directory:

```bash
git add .
git commit -m "week2-day8: Introduction deliverable"
git push origin main
```

---

## Final Architecture

```text
                 INBOUND LEAD
                      │
                      ▼
              ┌──────────────┐
              │    Webhook   │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │   Lead JSON  │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │      IF      │
              │ Size >= 100  │
              └──────┬───────┘
                     │
              ┌──────┴──────┐
              │             │
            TRUE          FALSE
              │             │
              ▼             ▼
       ┌─────────────┐   FILTERED
       │ Format Lead │     OUT
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │ JSON Output │
       └─────────────┘
```

**Day 8 is complete when you can import the JSON into n8n, send a lead to the webhook, watch it pass through the IF condition, and see the standardized JSON output.**
