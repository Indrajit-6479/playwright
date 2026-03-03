# Welcome to Day 10! 🔑
## Payment School — Day 10 | Your Secret Decoder Ring: ISO 20022 Message Families

You've reached a milestone. Today is about getting your **"Secret Decoder Ring."**

> In an interview, they might throw a code at you like `pacs.008` or `camt.053`. If you look confused, they'll know you're a beginner. If you smile and say, *"Ah, the Customer Credit Transfer or the Bank Statement,"* **you've got the job.**

---

## 👨‍👩‍👧‍👦 3.6: Message Domains Overview – The Six Families

ISO 20022 is huge. It covers everything from credit cards to stock trading. To keep it organized, messages are grouped into **"Families"** based on *who is talking to whom.*

---

### ⭐ The "Big Three" — Memorize These for Payments

| Family   | Name                                       | Who is talking? | What are they doing?                             |
| -------- | ------------------------------------------ | --------------- | ------------------------------------------------ |
| **PAIN** | **PA**yment **IN**itiation                 | Customer ➡️ Bank | *"Please pay this person for me."*               |
| **PACS** | **PA**yments **C**learing & **S**ettlement | Bank ➡️ Bank     | *"Here is the money for my customer's payment."* |
| **CAMT** | **CA**sh **M**anagemen**T**                | Bank ➡️ Customer | *"Here is your statement/update on your money."* |

---

### Other Families You Might Hear About

- **ACMT** — Account Management *(Opening/closing bank accounts)*
- **ADMI** — Administration *(System reports, like "The system is down for maintenance")*
- **AUTH** — Authorities *(Reporting to the government for taxes or fraud)*

---

## 🔍 3.7: XML Message Identifier Structure – Decoding the Name

Every message has a very specific **"ID card"** that looks like this:

```
pacs.008.001.08
```

It looks like computer gibberish, but it's actually a **four-part code.** Let's break it down:

| Part                    | Example | What It Means                                                                                                              |
| ----------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| **1. Business Area**    | `pacs`  | Tells you the **family** (e.g., Bank-to-Bank)                                                                              |
| **2. Message Function** | `008`   | Tells you the **specific job.** `008` is always a Customer Credit Transfer.                                                |
| **3. Variant**          | `001`   | Usually `001` for standard messages. Shows if it's a specific flavour used by a certain group.                             |
| **4. Version**          | `08`    | The **"Update" number.** Just like your phone has "iOS 17," messages get updated to version 08, 09, or 10 as rules change. |

### Visual Breakdown

```
  pacs   .  008   .  001    .   08
   │          │        │          │
Family    Function  Variant   Version
(Who?)    (What?)  (Which?)  (Update #)
```

---

## 💼 The "Interview Answer"

**Q: "How are ISO 20022 messages identified, and which ones are most common in payments?"**

> **A:** *"ISO 20022 messages use a **four-part naming convention**: the business area, the message function, the variant, and the version — for example, `pacs.008.001.08`. In a standard payment flow, we primarily see three families: **PAIN** for customer-to-bank initiation, **PACS** for inter-bank clearing and settlement, and **CAMT** for cash management and reporting. Understanding this structure allows us to immediately identify the **purpose and technical requirements** of any given message."*

---

## 🎯 Day 10 Key Takeaways

- **PAIN = Initiation** — Customer starts the process.
- **PACS = Settlement** — Banks move the money.
- **CAMT = Reporting** — Banks tell customers what happened.
- **The Code is a Map** — `Family . Function . Variant . Version`

---

> ✅ **Week 2 is going great! You now know the names of the actors and the names of the scripts.**
>
> Ready for **Day 11?** We are moving into the **"Technical Deep Dive" (Phase 3).** We will look at **4.1: Introduction to XML Elements and Structure.** This is where we look *inside* the "envelope" to see how the data is actually written. Don't worry — the "simple English" promise stays! Shall we?