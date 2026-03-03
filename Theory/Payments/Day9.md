# Welcome to Day 9! 🎭
## Payment School — Day 9 | The Great Rename: ISO 20022 Party Names

Today is all about **"The Great Rename."**

> If you are going to work in a bank, you need to stop calling people **"Customers"** and **"Banks"** and start using the **official ISO 20022 names.** It's like learning that your friend "Dave" is actually **"Dr. David Smith, PhD"** on his legal documents.

---

## 🤝 3.4: SWIFT MX and ISO 20022 – The "Complex" Relationship

In an interview, someone might ask: **"Are SWIFT MX and ISO 20022 the same thing?"**

The answer is: **Yes, but with a twist.**

- **ISO 20022 is the Recipe Book** — It tells you all the possible ways to cook a "Payment."
- **SWIFT MX is the Specific Dish** — SWIFT took the ISO 20022 recipe and added specific **"Usage Rules"** called **CBPR+** *(Cross-Border Payments and Reporting Plus)* to make sure every bank on their network "cooks" the payment exactly the same way.

### Why the "Complex" Relationship?

Because **ISO 20022 is "too big."** It has thousands of elements. If every bank picked different elements, it would be chaos again. SWIFT **"restricts"** the standard so that it actually works for international banking.

---

## 🎭 3.5: MT to MX – Party Name Changes

> This is the **most common part of a technical interview.** You need to know the **"Translation"** from the old MT world to the new MX world.

In the old MT system, we used terms like **"Ordering Customer"** and **"Beneficiary."**
In MX, we use **"Debtor"** and **"Creditor."**

---

### The Party Mapping Table

| Old MT Term                          | New MX (ISO 20022) Term | Simple Role Description                   |
| ------------------------------------ | ----------------------- | ----------------------------------------- |
| Ordering Customer *(Field 50)*       | **Debtor**              | The person/company **sending** the money. |
| Ordering Institution *(Field 52)*    | **Debtor Agent**        | The **Sender's Bank.**                    |
| Intermediary *(Field 56)*            | **Intermediary Agent**  | The **"middle-man" bank.**                |
| Beneficiary Institution *(Field 57)* | **Creditor Agent**      | The **Receiver's Bank.**                  |
| Beneficiary *(Field 59)*             | **Creditor**            | The person/company **getting** the money. |

---

## 🆕 The "New" Parties — The Superstars of ISO 20022

One reason MT was bad was that it couldn't easily show the **"Ultimate" people** involved. ISO 20022 fixed this by adding:

1. **Ultimate Debtor** — The *real* person behind the payment.
   - **Example:** A parent company paying a bill on behalf of its small subsidiary. The subsidiary is the **Debtor**, but the parent company is the **Ultimate Debtor.**

2. **Ultimate Creditor** — The *final* person who gets the money.
   - **Example:** You pay a utility bill through a third-party app. The app is the **Creditor**, but the Electric Company is the **Ultimate Creditor.**

### Why Banks Love This

It makes catching money launderers **much easier.** Criminals can't easily hide behind **"shell companies"** anymore because the **Ultimate party fields** are now available.

---

## 💼 The "Interview Answer"

**Q: "Can you name the key parties in an ISO 20022 payment chain?"**

> **A:** *"Certainly. The chain starts with the **Debtor**, who initiates the payment through their bank, the **Debtor Agent.** The money may pass through one or more **Intermediary Agents** before reaching the **Creditor Agent** (the receiver's bank), and finally the **Creditor.** Importantly, ISO 20022 also allows for **Ultimate Debtor** and **Ultimate Creditor** fields, providing much-needed transparency into the actual originators and beneficiaries of the funds."*

---

## 🎯 Day 9 Key Takeaways

- **SWIFT MX is a specific "version" of ISO 20022** with extra rules **(CBPR+).**
- **"Agent" = Bank** — When you see the word "Agent" in ISO 20022, think **"Financial Institution."**
- **Transparency** — The **"Ultimate" party fields** are a massive upgrade for bank security and compliance.

---

> ✅ **You are now speaking the language!**
>
> Ready for **Day 10?** We are going to finish Phase 2 by looking at **3.6 and 3.7: The Message Families.** You'll learn how to look at a code like `pacs.008.001.08` and **decode exactly what it means in seconds.** Shall we move forward?