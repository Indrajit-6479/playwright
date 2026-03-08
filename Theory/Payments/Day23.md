# Welcome to Day 23! 🏦
## Payment School — Day 23 | The Banker's Payment: pacs.009

Yesterday was all about the **customer's money** (`pacs.008`). Today, we look at the **"Banker's Payment": the `pacs.009`.**

> In an interview, they might try to trip you up by asking: *"If a bank needs to pay another bank for a currency trade, do they use a `pacs.008`?"*
> The answer is a **hard No.**

---

## 🏦 6.3: The pacs.009 – Financial Institution Credit Transfer

While the `pacs.008` is for **"People and Companies,"** the `pacs.009` is strictly for **Financial Institutions (FIs).**

---

### Why Would a Bank Send a pacs.009?

1. **Treasury Trades** — Bank A buys $10 million from Bank B.
2. **Fees** — Bank A owes Bank B for service charges.
3. **The "Cover"** *(The most important for you)* — Moving the money to support a customer's `pacs.008` *(as we discussed on Day 18).*

---

## 🍦 The Two "Flavors" of pacs.009

> This is a **high-level technical detail that separates the juniors from the seniors.**

---

### Flavor 1 — The "Core" pacs.009

- **Purpose:** A clean bank-to-bank transfer.
- **Scenario:** Bank A is simply sending its **own money** to Bank B.
- **Data:** Very simple — it just says *"Bank A pays Bank B."*

```
🏦 Bank A  ──── pacs.009 (CORE) ────►  🏦 Bank B
   "Here is our money. No customer involved."
```

---

### Flavor 2 — The pacs.009 COV (Cover)

- **Purpose:** Used in **Cover Settlement** *(from Day 18).*
- **Scenario:** When a `pacs.008` is sent directly to the final bank, the **"actual money"** moves through the intermediary banks using this COV version.
- **The "Secret" Ingredient:** A `pacs.009 COV` contains a **duplicate of the customer info** from the original `pacs.008`.

#### Why does the COV carry customer info?

So that every bank in the **middle** can see who the **ultimate sender and receiver** are for **Anti-Money Laundering (AML)** checks — even though they aren't the ones processing the final payment to the customer.

```
Bank A (Sender)
   │
   ├──── pacs.008 ─────────────────────────────────────────────► 🏦 Creditor Agent (Peru)
   │     "Hey Peru Bank, money is coming for John Doe"
   │
   └──── pacs.009 COV ──────► 🏦 JP Morgan ──── funds ─────────►┘
         "Move these funds to Peru Bank"
         (Also carries: who is John Doe, for AML screening)
```

---

## 🆚 pacs.008 vs. pacs.009

| Feature            | pacs.008                          | pacs.009                              |
|--------------------|-----------------------------------|---------------------------------------|
| **Who is it for?** | Customers *(People / Businesses)* | Banks *(Financial Institutions)*      |
| **Mandatory Info** | Detailed Debtor / Creditor info   | Mostly just Bank BICs                 |
| **Complexity**     | High *(lots of "Rich Data")*      | Lower *(unless it's the COV version)* |
| **MT Equivalent**  | MT103                             | MT202 or MT202 COV                    |

---

## 💼 The "Interview Answer"

**Q: "When would you use a `pacs.009 COV` instead of a core `pacs.009`?"**

> **A:** *"A **core `pacs.009`** is used for pure bank-to-bank transactions where no third-party customer is involved, such as treasury settlements. However, a **`pacs.009 COV`** is used specifically in **Cover Settlement.** It accompanies a `pacs.008` that has been sent directly to the Creditor Agent. The 'COV' version is essential because it carries the **'Underlying Customer Credit Transfer'** details, allowing intermediary banks to perform necessary **regulatory and sanctions screening** on the actual Payer and Receiver."*

---

## 🎯 Day 23 Key Takeaways

1. **`pacs.009`** — Bank-to-Bank money movement *(not for customers)*
2. **Financial Institution (FI)** — Just means a bank or a regulated money entity
3. **CORE** — Pure bank business, simple and clean
4. **COV** — The **"money"** part of a customer's cover payment, carries customer info for AML
5. **Transparency** — The COV version ensures middle-man banks aren't **"blind"** to who is actually sending the money

---

> ✅ **You now know the two most important "moving" messages in the system!**
>
> Ready for **Day 24?** We are going to look at the **"Oops" Messages**: `pacs.004` *(Payment Return)* and `pacs.002` *(Status Report).* What happens when a payment **fails?** Shall we proceed?