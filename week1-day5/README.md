 **what you built, why you built it, architecture, setup, usage, output, limitations, and future improvements**.

Replace your `README.md` with this:

````markdown
# Week 1 Day 5 — Automated Cold Email Generator

An AI-GTM engineering project that generates personalized cold email variants from structured B2B lead data.

The system takes a lead profile containing company information, job role, recent company signals, pain points, and product value, then generates a personalization prompt and three cold email variants.

---

## 🎯 Objective

The objective of Day 5 is to understand and implement the engineering foundations behind automated B2B cold outreach:

- Email personalization
- Dynamic variable injection
- Cold email structure
- AI prompt design
- Email deliverability fundamentals
- SPF, DKIM, and DMARC
- CLI-based email generation

This implementation focuses on the **email generation layer**.

It does not send real emails.

---

# 🏗️ System Architecture

```text
                    LEAD PROFILE
                         │
                         ▼
              ┌─────────────────────┐
              │  Structured Lead    │
              │       Data          │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Personalization     │
              │ Prompt Generator    │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Email Generator     │
              │                     │
              │ Subject             │
              │ Hook                │
              │ Value Proposition   │
              │ CTA                 │
              └──────────┬──────────┘
                         │
                         ▼
                 3 EMAIL VARIANTS
````

---

# 📁 Project Structure

```text
week1-day5/
│
├── src/
│   ├── leadSchema.ts
│   ├── promptTemplate.ts
│   ├── emailGenerator.ts
│   └── main.ts
│
├── dns_setup.txt
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

# 📌 File Responsibilities

## `src/leadSchema.ts`

Defines the structure of a B2B lead.

Example:

```typescript
export interface LeadProfile {
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  industry: string;
  companySize: number;
  recentNews: string;
  painPoint: string;
  productValue: string;
}
```

This ensures that the email generator receives structured and predictable data.

---

## `src/promptTemplate.ts`

Creates the personalization prompt.

The prompt provides the model or personalization engine with:

* Lead name
* Job title
* Company
* Industry
* Company size
* Recent company signal
* Pain point
* Product value

It also contains rules designed to prevent generic or fabricated personalization.

---

## `src/emailGenerator.ts`

Generates three cold email variants.

Each variant contains:

```text
Subject
Hook
Value Proposition
CTA
```

The three variants use different approaches to personalization so they can later be compared in an outbound workflow.

---

## `src/main.ts`

Acts as the CLI entry point.

It:

1. Creates/loads a lead profile
2. Displays the lead information
3. Generates the personalization prompt
4. Generates three email variants
5. Prints the results to the terminal

---

## `dns_setup.txt`

Documents the fundamentals of email domain authentication:

* SPF
* DKIM
* DMARC

These are provided as configuration examples for learning purposes.

The project does **not** modify DNS records or send real emails.

---

# 🧠 Example Lead

The current implementation uses:

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "jobTitle": "VP Sales",
  "companyName": "Acme AI",
  "industry": "B2B SaaS",
  "companySize": 250,
  "recentNews": "expanding its sales team",
  "painPoint": "manual lead qualification",
  "productValue": "AI-powered lead qualification and routing"
}
```

---

# ✉️ Email Generation

The system generates three variants.

Example:

### Variant 1

**Subject**

```text
Acme AI's sales growth
```

**Hook**

```text
Saw that Acme AI has been expanding its sales team.
```

**Value Proposition**

```text
We help VP Sales teams reduce manual lead qualification
with AI-powered lead qualification and routing.
```

**CTA**

```text
Worth a 15-minute conversation next week?
```

---

### Variant 2

**Subject**

```text
Idea for Acme AI
```

**Hook**

```text
Given Acme AI's recent growth, I imagine keeping manual
lead qualification under control becomes increasingly important.
```

**Value Proposition**

```text
AI-powered lead qualification and routing can help teams
like yours make that process more efficient without adding
unnecessary manual work.
```

**CTA**

```text
Open to taking a quick look?
```

---

### Variant 3

**Subject**

```text
John, quick idea
```

**Hook**

```text
Your role as VP Sales caught my attention, especially with
Acme AI currently expanding its sales team.
```

**Value Proposition**

```text
We help companies improve manual lead qualification
through AI-powered lead qualification and routing.
```

**CTA**

```text
Would a short intro be useful?
```

---

# ⚙️ Technology Stack

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| TypeScript          | Application logic       |
| Node.js             | Runtime                 |
| npm                 | Package management      |
| TypeScript Compiler | Build process           |
| VS Code             | Development environment |

---

# 🚀 Installation

## Prerequisites

Make sure you have:

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

From the project directory:

```bash
npm install
```

---

# 🔨 Build the Project

Compile the TypeScript source:

```bash
npm run build
```

The compiled JavaScript files will be generated inside:

```text
dist/
```

---

# ▶️ Run the Generator

Run:

```bash
npm run generate
```

This performs:

```text
npm run build
        ↓
TypeScript compilation
        ↓
Node.js execution
        ↓
Lead profile processing
        ↓
Prompt generation
        ↓
3 email variants
```

---

# 💻 Example CLI Output

```text
========================================
AI GTM — COLD EMAIL GENERATOR
========================================

LEAD PROFILE
----------------------------------------
Name:        John Smith
Title:       VP Sales
Company:     Acme AI
Industry:    B2B SaaS
Company Size:250
News:        expanding its sales team
Pain Point:  manual lead qualification

EMAIL VARIANTS
========================================

VARIANT 1
----------------------------------------
Subject:     Acme AI's sales growth
Hook:        Saw that Acme AI has been expanding its sales team.
Value Prop:  We help VP Sales teams reduce manual lead qualification...
CTA:         Worth a 15-minute conversation next week?

VARIANT 2
----------------------------------------
Subject:     Idea for Acme AI
Hook:        Given Acme AI's recent growth...
Value Prop:  AI-powered lead qualification and routing...
CTA:         Open to taking a quick look?

VARIANT 3
----------------------------------------
Subject:     John, quick idea
Hook:        Your role as VP Sales caught my attention...
Value Prop:  We help companies improve manual lead qualification...
CTA:         Would a short intro be useful?
```

---

# 🔐 Email Deliverability Fundamentals

Cold outreach requires proper email infrastructure.

The project documents three major authentication mechanisms.

## SPF

SPF identifies which mail servers are authorized to send email on behalf of a domain.

Example:

```text
v=spf1 include:spf.protection.outlook.com ~all
```

This is only an example. Real SPF records must be generated according to the actual email providers used by the domain.

---

## DKIM

DKIM uses cryptographic signatures to allow receiving mail systems to verify that an email was authorized by the sending domain and was not altered in transit.

A typical DKIM record uses:

```text
<selector>._domainkey
```

with a provider-generated public key.

---

## DMARC

DMARC defines how receiving systems should handle messages that fail authentication/alignment checks.

Example:

```text
v=DMARC1; p=quarantine; pct=100;
```

The actual policy should be selected based on the organization's email infrastructure and rollout strategy.

---

# ⚠️ Scope of This Project

This project **does not**:

* Send real emails
* Modify DNS
* Configure SPF
* Configure DKIM
* Configure DMARC
* Warm up an email domain
* Connect to an email sending provider
* Automatically contact prospects

The focus is the **cold email generation and personalization layer**.

---

# 🔗 Relationship With Previous GTM Engineering Days

Day 5 builds on the previous days.

```text
DAY 2
ICP Definition & Lead Scoring
        ↓
DAY 3
Lead Generation & Enrichment
        ↓
DAY 4
HubSpot CRM Automation
        ↓
DAY 5
Cold Email Personalization
```

The larger GTM system becomes:

```text
Apollo / Clay / Sales Navigator
              ↓
        Lead Generation
              ↓
          Enrichment
              ↓
         ICP Scoring
              ↓
        Qualified Lead
              ↓
         HubSpot CRM
              ↓
      Cold Email Generator
              ↓
      Personalized Outreach
```

---

# 🤖 Future AI Integration

The current version uses deterministic TypeScript logic to establish a reliable baseline.

The next version can replace the deterministic personalization layer with an LLM.

Future architecture:

```text
Lead Profile
      ↓
Verified Company Signals
      ↓
Prompt Template
      ↓
LLM
      ↓
AI-Generated Hook
      ↓
3 Email Variants
      ↓
Human Review
      ↓
Outbound System
```

Potential LLM providers include:

* Groq
* OpenAI
* Google Gemini
* Anthropic

The LLM should only receive verified information and should be instructed not to fabricate company facts.

---

# 🛡️ Personalization Rules

The personalization engine follows these principles:

1. Do not invent company information.
2. Use only supplied lead/company data.
3. Avoid generic praise.
4. Avoid generic openings such as "I hope you're doing well."
5. Keep the messaging concise.
6. Connect a real company signal to a relevant business problem.
7. Keep the CTA simple.
8. Generate multiple variants for experimentation.

---

# 📈 Production Improvements

A production-grade version could add:

### Data Integration

```text
Apollo
Clay
Sales Navigator
      ↓
Lead Enrichment
```

### AI Personalization

```text
Verified Signals
      ↓
LLM
      ↓
Personalized Email
```

### Email Validation

```text
Email
 ↓
Syntax Validation
 ↓
Domain/MX Validation
 ↓
Suppression Check
```

### CRM Integration

```text
Generated Email
      ↓
HubSpot
      ↓
Contact / Deal
```

### Outreach Analytics

Track:

* Sent
* Delivered
* Bounced
* Replied
* Unsubscribed
* Qualified
* Converted

---

# 🎯 Day 5 Learning Outcomes

After completing this project, the engineer should understand:

* Email deliverability fundamentals
* SPF
* DKIM
* DMARC
* Cold email structure
* Dynamic personalization
* Variable injection
* Prompt engineering for outreach
* CLI automation
* Structured lead data
* Multiple email variants
* Separation between email generation and email sending

---

# ✅ Completion Checklist

* [x] Lead profile schema
* [x] Personalization prompt template
* [x] SPF documentation
* [x] DKIM documentation
* [x] DMARC documentation
* [x] Email generator
* [x] Three email variants
* [x] Subject lines
* [x] Personalized hooks
* [x] Value propositions
* [x] CTAs
* [x] TypeScript compilation
* [x] CLI execution

---

# 📌 Git Commit

Required Day 5 commit:

```bash
git add .
git commit -m "week1-day5: Automated deliverable"
git push
```

---

# 👨‍💻 Project Status

**Status:** Completed — Day 5 baseline implementation

**Project:** AI GTM Engineer Career OS

**Week:** 1

**Day:** 5

**Focus:** Automated Cold Email Outreach & Deliverability Engineering

```

### One thing I'd change from your current README

Don't claim **"AI-generated emails"** yet. Your current implementation generates a **personalization prompt** and uses deterministic TypeScript templates. The actual LLM integration is planned for Day 7.

That's actually better for your portfolio because you're being technically honest:

**Day 5:** deterministic outreach engine + prompt engineering foundation  
**Day 7:** LLM-powered personalization

That progression is defensible in an interview.
```
