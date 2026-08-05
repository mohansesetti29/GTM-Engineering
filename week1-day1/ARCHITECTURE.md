# GTM AI Architecture

```mermaid
graph TD
A[Website Form]
--> B[Webhook]
B --> C[Clay Enrichment]
C --> D[Gemini AI]
D --> E[Lead Score]
E --> F[HubSpot CRM]
F --> G[Assign SDR]
G --> H[Slack Notification]
H --> I[Sales Follow-up]
```
