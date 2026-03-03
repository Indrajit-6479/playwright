# Day 13: The IDs of Global Banking 🆔
## Payment School — Day 13 | BIC, IBAN, Routing & Distinguished Names

Before a bank can move money, it needs to know **Who is involved** and **Where they are.**

---

## 1. The BIC (Bank Identifier Code)

Think of a **BIC** (also called a **SWIFT Code**) as the **Passport of a bank.** Every bank in the world that belongs to the SWIFT network has one.

- **Format:** Always **8 or 11 characters** long.

### How a BIC is Built

```
C H A S  U S  3 3  X X X
│────│  │──│  │──│  │───│
Bank    Country  City   Branch
Name    Code     Code   (Optional)
```

| Part        | Example | What It Means                     |
| ----------- | ------- | --------------------------------- |
| **First 4** | `CHAS`  | Bank Name *(e.g., Chase)*         |
| **Next 2**  | `US`    | Country Code *(e.g., USA)*        |
| **Next 2**  | `33`    | Location/City *(e.g., New York)*  |
| **Last 3**  | `XXX`   | Optional — Specific Branch office |

---

## 2. The IBAN (International Bank Account Number)

If the BIC is the **"Bank's Passport,"** the IBAN is the **Home Address of your specific bank account.**

- **Purpose:** Helps banks in different countries identify a specific account without making mistakes.
- **How it's built:** Starts with a **Country Code** (like `GB` for UK, `FR` for France, `IN` for India) followed by **check digits** and then the long account number.

> ⚠️ **Note:** Not every country uses IBANs. The USA uses **"Routing Numbers"** instead. But in the world of ISO 20022 and International Payments, **IBAN is the king.**

---

## 3. Retail vs. High-Value Payments

> Imagine a highway. You have **small cars (Retail)** and **giant delivery trucks (High-Value).** They both use the road, but they have different rules.

### Retail Payments

- **What they are:** Small money amounts — buying a coffee, paying rent, or sending money to a friend.
- **Volume:** Millions of these every day.
- **Speed:** Don't always happen instantly *(may take a day to settle).*
- **Cost:** Low cost to send.

### High-Value Payments (HVP)

- **What they are:** Huge money amounts *(millions or billions of dollars).* Usually bank-to-bank transfers or giant corporations buying another company.
- **Volume:** Fewer transactions, but each one is critical.
- **Speed:** Must happen **"Right Now"** *(called Real-Time).*
- **Risk:** Much higher security required — if one goes missing, it's a disaster.

### Side-by-Side Comparison

| Feature    | Retail Payments        | High-Value Payments (HVP) |
| ---------- | ---------------------- | ------------------------- |
| **Amount** | Small (coffee to rent) | Millions / Billions       |
| **Volume** | Very High              | Low                       |
| **Speed**  | Can take a day         | Real-Time / Instant       |
| **Cost**   | Low                    | Higher                    |
| **Risk**   | Low                    | Critical                  |

---

## 4. The Structure: The Envelope (BAH) and the Letter (Document)

In ISO 20022, all this info is wrapped into **two parts:**

| Part       | Technical Name                                 | Analogy               | What It Contains                                                                    |
| ---------- | ---------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------- |
| **Part 1** | Business Application Header *(BAH)* `head.001` | The **Envelope**      | The **BICs** of the banks involved — so the system knows where to route the message |
| **Part 2** | Document                                       | The **Letter inside** | The **IBANs** of sender & receiver, the amount, and the reason for payment          |

---

## 5. The DN (Distinguished Name)

Finally — how does the message reach the exact **"computer desk"** inside the bank? We use the **DN.**

> **If the BIC gets the message to the Bank's Building, the DN gets the message to the specific floor.**

### Example DN

```
cn=hvp-ops, ou=payments, o=bankus33, o=swift
```

| Part          | Value      | What It Means                                                     |
| ------------- | ---------- | ----------------------------------------------------------------- |
| `o=bankus33`  | `bankus33` | The **BIC** — identifies the Bank Building                        |
| `ou=payments` | `payments` | The **Department** — the Payments division                        |
| `cn=hvp-ops`  | `hvp-ops`  | The **Specific Desk** — the High-Value Payments processing engine |

---

## 💼 The "Interview Answer"

**Q: "What is the difference between a BIC and a Distinguished Name (DN)?"**

> **A:** *"A **BIC** is the global identifier for a financial institution — like a bank's passport. However, a **Distinguished Name (DN)** is more granular; it is the **technical address** used by the SWIFT network to route a message to a **specific service or department** within that bank. For example, while the BIC identifies 'Bank A,' the DN ensures a high-value payment goes to 'Bank A's' **high-value processing engine** and not their retail folder."*

---

## 🎯 Day 13 Key Takeaways

1. **BIC** — Bank ID *(The "Who")*
2. **IBAN** — Account ID *(The "Exact Account")*
3. **Retail / HVP** — Small & Slow vs. Big & Urgent
4. **BAH / Document** — The Envelope vs. The Letter
5. **DN** — The technical path to the specific computer *inside* the bank

---

> ✅ **You now have the foundation of how banks identify each other!**
>
> Ready for **Day 14?** We will look at **4.5: CBPR+** *(the specific rules for Cross-Border payments)* and **4.6: Character Sets** *(why you can't use certain symbols in a payment message).* Shall we proceed?