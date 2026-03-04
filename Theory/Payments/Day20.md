# Welcome to Day 20! 🌉
## Payment School — Day 20 | The Mutual Friend: The Intermediary Bank

You've learned how two banks that **know each other** talk. But what happens when Bank A in India needs to send money to Bank B in Peru, and they have **never met, have no accounts with each other, and no RMA?**

> They need a **"Mutual Friend."** In banking, we call this the **Intermediary Bank.**

---

## 🌉 5.6: The Intermediary Bank (The Bridge)

In the global financial web, it is **impossible** for every bank to be connected to every other bank. There are over **11,000 banks on SWIFT!**

> An **Intermediary Bank** is a **third-party bank** that sits in the middle to pass the **"message"** and the **"money"** from the sender's bank to the receiver's bank.

---

### Why Do We Need Them?

1. **No Direct Relationship** — The two banks don't have Nostro/Vostro accounts with each other.
2. **Currency Matching** — If a bank in India wants to send **US Dollars** to Peru, they usually need a large US-based bank *(like JP Morgan or Citibank)* to act as the **"Bridge"** to handle the USD settlement.

---

## 🏷️ The Intermediary in ISO 20022

> Remember our **"Party Mapping"** from Day 9? This is where it gets real.

When a third bank enters the mix, a new tag appears in the XML message: **`<IntrmyAgt>`** *(Intermediary Agent).*

---

### The 5 Players

Before looking at the flow, let's know who everyone is:

| #   | Player                 | Real-World Example                                  |
| --- | ---------------------- | --------------------------------------------------- |
| 1   | **Debtor**             | A customer sitting in India who wants to send money |
| 2   | **Debtor Agent**       | The customer's bank in India                        |
| 3   | **Intermediary Agent** | JP Morgan in New York — the "mutual friend"         |
| 4   | **Creditor Agent**     | The receiving bank in Peru                          |
| 5   | **Creditor**           | The final person in Peru who gets the money         |

---

### The Step-by-Step Flow (Simple Version)

Think of it like passing a baton in a relay race — **4 hand-offs, each with its own message.**

---

**Step 1 — Customer talks to their bank**

```
👤 Debtor (India)  ──── pain.001 ────►  🏦 Debtor Agent (India)
"Please send $100 to someone in Peru"
```

---

**Step 2 — Indian bank talks to the Mutual Friend (JP Morgan)**

```
🏦 Debtor Agent (India)  ──── pacs.008 ────►  🏦 Intermediary Agent (JP Morgan, NY)
"Here is $100, please forward it to the bank in Peru"
The message includes the tag: <IntrmyAgt> to identify JP Morgan's role
```

---

**Step 3 — JP Morgan talks to the Peruvian bank**

```
🏦 Intermediary Agent (JP Morgan, NY)  ──── pacs.008 ────►  🏦 Creditor Agent (Peru)
"Here are the funds. Please credit your customer."
```

---

**Step 4 — Peruvian bank notifies their customer**

```
🏦 Creditor Agent (Peru)  ──── camt.054 ────►  👤 Creditor (Peru)
"Good news! $100 has arrived in your account."
```

---

### The Full Picture in One View

```
STEP 1        STEP 2              STEP 3            STEP 4

👤 Debtor  →  🏦 India Bank  →  🏦 JP Morgan  →  🏦 Peru Bank  →  👤 Creditor
            pain.001          pacs.008          pacs.008          camt.054
          (Customer asks)  (India → Bridge)  (Bridge → Peru)   (Peru notifies
                                                                  customer)
```

---

### The Three Bank Roles Explained

| Role                   | ISO 20022 Tag | Who They Are                       | What They Do                                                                                    |
| ---------------------- | ------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Debtor Agent**       | `<DbtrAgt>`   | Sender's Bank *(India)*            | Receives the customer's request and forwards it to the mutual friend                            |
| **Intermediary Agent** | `<IntrmyAgt>` | The Bridge *(JP Morgan, New York)* | Knows both banks. Moves the money from the Indian bank's account to the Peruvian bank's account |
| **Creditor Agent**     | `<CdtrAgt>`   | Receiver's Bank *(Peru)*           | Receives the funds from JP Morgan and credits the final customer                                |

---

## ⚠️ The "Intermediary Pain" — Interview Gold

> If an interviewer asks: **"What are the downsides of using Intermediary Banks?"** — give them these three points:

1. **Fees** — Every **"hop"** in the chain usually takes a small cut *(a "lifting fee").* This is why **$100 sent sometimes becomes $90 received.**

2. **Lack of Transparency (Old World)** — In the old MT world, it was hard to see who took the fee. In ISO 20022, we have **specific tags** to show exactly **how much was deducted and by whom.**

3. **Speed Risk** — Every stop requires the intermediary bank to do their own **"Sanctions Screening"** (checking for criminals). If the middle bank gets suspicious, the **payment stops right there.**

---

## 💼 The "Interview Answer"

**Q: "What is the role of an Intermediary Agent in a `pacs.008` message?"**

> **A:** *"An **Intermediary Agent** acts as a vital bridge when the Debtor Agent and Creditor Agent do not have a **direct settlement relationship** or a common currency account. Their role is to facilitate the **transfer of funds and information** between the two banks. In ISO 20022, the use of structured data allows these intermediaries to perform **automated compliance checks** more efficiently, though they remain a common point where **'lifting fees'** or processing delays can occur."*

---

## 🎯 Day 20 Key Takeaways

- **Intermediary = Bridge** — They connect banks that don't have a direct link
- **Settlement** — They are usually chosen because they hold the **Nostro accounts** for both ends
- **`<IntrmyAgt>`** — The specific ISO 20022 tag used to identify the intermediary in a message
- **Cost & Time** — More intermediaries usually means **more fees** and **more time**

---

> ✅ **You now understand the "Global Map" of how money hops across the world!**
>
> Ready for **Day 21?** We are going to look at **6.1: Introduction to Message Flows.** We will put everything together — PAIN, PACS, and CAMT — into one big **"Story"** from start to finish. Would you like to proceed?