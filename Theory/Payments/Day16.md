# Welcome to Day 16! 🏆
## Payment School — Day 16 | The Master Cheat Sheet: Days 1–15 Review

> **Milestone: You've officially completed the first "Trimester" of this journey.**
> You've moved from a **"Civilian"** understanding to a **"Technical"** one.

This is the **"Cheat Sheet"** you'd want in your pocket right before an interview.

---

## 🏆 The "Master Summary" (Days 1–15)

---

### 1. The Core Identities: Who & Where?

| Term                                         | What It Is                                | Simple Analogy                                   |
| -------------------------------------------- | ----------------------------------------- | ------------------------------------------------ |
| **BIC** (Bank Identifier Code)               | The bank's unique ID on the SWIFT network | The bank's **"Passport"** *(8 or 11 characters)* |
| **IBAN** (International Bank Account Number) | The unique ID for a specific account      | The account's **"Home Address"**                 |

**The Parties — Stop Saying "Customer" and "Sender":**

| ISO 20022 Term        | Who They Are                                   |
| --------------------- | ---------------------------------------------- |
| **Debtor**            | The Payer *(the one sending money)*            |
| **Creditor**          | The Receiver *(the one getting money)*         |
| **Agent**             | The Bank                                       |
| **Ultimate Debtor**   | The *real* person/company behind the payment   |
| **Ultimate Creditor** | The *final* person/company receiving the money |

---

### 2. The Message "Families": What's the Job?

| Family   | Full Name                      | Direction       | What It Says                       |
| -------- | ------------------------------ | --------------- | ---------------------------------- |
| **PAIN** | Payment Initiation             | Customer ➡️ Bank | *"Please pay this person for me."* |
| **PACS** | Payments Clearing & Settlement | Bank ➡️ Bank     | *"Here is the money."*             |
| **CAMT** | Cash Management                | Bank ➡️ Customer | *"Here is your update/statement."* |

**Decoding the Message Code:** `pacs.008.001.08`

```
  pacs   .  008   .  001    .   08
   │          │        │          │
Family    Function  Variant   Version
```

---

### 3. The Technical "Engine": XML

| Concept                     | What It Is                                                                       |
| --------------------------- | -------------------------------------------------------------------------------- |
| **Tags**                    | Data wrapped in labels: `<Amt>100.00</Amt>`                                      |
| **Attributes**              | Extra info inside a tag: `<Amt Ccy="USD">`                                       |
| **Hierarchy / Nesting**     | Data organized Parent > Child — this creates **"Rich Data"**                     |
| **XSD**                     | The **"Master Blueprint"** that validates the message                            |
| **Namespace**               | The **"Area Code"** — tells the computer which message family a tag belongs to   |
| **BAH** `head.001`          | The **"Envelope"** — used for routing *(contains BICs)*                          |
| **Document**                | The **"Letter"** inside — actual payment details *(contains IBANs)*              |
| **DN** (Distinguished Name) | The specific technical **"desk address"** inside the bank *(e.g., `cn=hvp-ops`)* |

---

### 4. The Rules of the Road

| Concept                       | What It Means                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| **CBPR+**                     | The SWIFT **"Rulebook"** — ensures all banks use the same subset of ISO 20022               |
| **External Codes**            | Shorthand 4-letter codes like `SALA` (Salary) or `TAXS` (Tax)                               |
| **STP**                       | Straight-Through Processing — computers handle payments **automatically**, no humans needed |
| **Retail Payments**           | Small amounts, high volume, can take a day to settle                                        |
| **High-Value Payments (HVP)** | Massive amounts, low volume, must settle **in real-time**                                   |
| **UTF-8**                     | The **"Global Alphabet"** — supports non-English names (Arabic, Chinese, Hindi, etc.)       |
| **Data Truncation**           | The enemy — cutting off data when moving from a rich format to a restrictive one            |

---

## 💡 The "Big Picture" Flow

> If you can explain this flow, you understand **80% of how a modern bank works.**

```
Step 1:  Debtor (Customer)
         sends PAIN.001
         ───────────────────────────────────────────────────► Debtor Agent (Their Bank)

Step 2:  Debtor Agent
         checks BIC + IBAN
         validates message against XSD

Step 3:  Debtor Agent
         wraps info in BAH (Envelope)
         sends PACS.008
         ───────────────────────────────────────────────────► Creditor Agent (Receiver's Bank)

Step 4:  Creditor Agent
         uses DN to route to the correct internal department

Step 5:  Creditor Agent
         sends CAMT.054 (Credit Notification)
         ───────────────────────────────────────────────────► Creditor (Receiver / Customer)
```

---

## 🚀 Moving Forward — What's Next?

In the **next phase (Days 17–25)**, we leave the **"Messages"** for a moment and look at the **"Money."**

- How do banks actually **settle** the debt?
- What is a **Nostro account?**
- What happens if a bank in India **doesn't have a direct connection** to a bank in Brazil?

---

> ✅ **Ready to start Day 17 and dive into Correspondent Banking?**