# Welcome to Day 15! 🎉
## Payment School — Day 15 | The Secret Codes: External Code Sets

> **Milestone: You have officially completed one-third of your journey!**

Yesterday, we learned about the "Alphabet" (UTF-8). Today, we look at the **"Shorthand"** or **"Secret Codes"** that banks use to talk to each other. Instead of writing long sentences like *"I am sending this money to pay my employee's monthly salary,"* banks use a 4-letter code: **`SALA`.**

---

## 🔢 4.7: External Code Sets (The Global List)

In an ISO 20022 message, there are many "lists" of codes. Some are built into the message **(Internal)**, but the most important ones are **External.**

---

### What is an "External" Code?

> Imagine you have a smartphone. Some apps come **built-in (Internal)**, but you can download new ones from the **App Store (External).**

- **External Codes** are lists maintained by **ISO on their website** — not inside the message's technical blueprint (XSD).
- **Why?** Because the world changes fast! If a new type of payment is invented (like a *"Carbon Tax Payment"*), ISO can just add a new code to the website list. Banks can start using it **immediately** without having to rebuild their entire software system.

---

## 🏷️ 4.8: The "Big Three" Codes You Must Know

> ⭐ In a technical interview, they will likely ask you about these specific code fields. If you know these, **you look like a pro.**

---

### 1. Service Level (`SvcLvl`)

This tells the bank **how the payment should be handled.**

| Code   | Meaning                                     |
| ------ | ------------------------------------------- |
| `SEPA` | Process this as a Euro payment              |
| `URGP` | Urgent — process as a high-priority payment |
| `NURG` | Non-Urgent — standard speed                 |

---

### 2. Category Purpose (`CtgyPurp`)

This tells the bank **why the money is being moved** at a high level. Helps the receiving bank **"sort" the money** into the right pile.

| Code   | Meaning          |
| ------ | ---------------- |
| `SALA` | Salary / Payroll |
| `TAXS` | Tax Payment      |
| `PENS` | Pension Payment  |

---

### 3. Local Instrument (`LclInstrm`)

Every country has its own **"Local" rules.** This code tells the bank which local **"tool"** to use.

| Code   | Country / Use Case   |
| ------ | -------------------- |
| `BACS` | UK domestic payments |
| `ACH`  | US domestic payments |

---

## 🏦 Why Does the Bank Care About These Codes?

1. **Automation (STP)**
   If a bank receives a message with the code `SALA`, their computer instantly knows: *"This is a salary. Don't charge the employee a fee, and move it to the 'Payroll' folder."* No human has to read it.

2. **Regulatory Reporting**
   Governments want to know how much **"Tax"** or **"Pension"** money is moving. These codes make it easy to generate a report with one click.

3. **Priority**
   If the code is `URGP` (Urgent), the bank's system puts that payment **at the front of the line.**

---

## 💼 The "Interview Answer"

**Q: "What is the advantage of using External Code Sets in ISO 20022?"**

> **A:** *"External Code Sets provide **flexibility** and **scalability.** Because these codes are maintained externally by ISO, the industry can add new business codes (like new tax types or payment services) without needing to update the underlying technical XML schemas. This allows banks to adapt to market changes quickly while maintaining **Straight-Through Processing (STP)**, as computers can instantly categorize payments based on these 4-character codes like `SALA` for salary or `TAXS` for tax."*

---

## 🎯 Day 15 Key Takeaways

1. **External Codes** — Lists kept on the ISO website so they can be updated easily without rebuilding systems
2. **`SALA`, `TAXS`, `PENS`** — Common **"Purpose"** codes every payments professional should know
3. **STP** — Codes allow computers to process payments **without human help**
4. **Service Level** — Tells the bank the **"Priority"** *(Urgent `URGP` vs. Normal `NURG`)*

---

> ✅ **You have finished the Technical Logic of Phase 3!**
>
> Ready for **Day 16?** We are going to do a **Section Review.** Since we are at the 1/3rd mark, the goal is to make sure you haven't forgotten the **"BIC/IBAN"** or **"PAIN/PACS"** concepts before we move into **Phase 4: Correspondent Banking.**
>
> Would you like a **"Mid-Term" summary** of everything we've learned so far?