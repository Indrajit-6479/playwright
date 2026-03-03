## Welcome to Day 6! 🎉
### Payment School — Week 1, Day 6

You've survived the first week of **"Payment School."** Today, we're looking at the chaos of the old world and the formal process used to fix it.

> **Key Analogy:** If you think of ISO 20022 as a **"Law,"** today we are learning *why* that law was needed and *how* a "Bill" becomes a "Law."

---

### 🧩 2.6: The Challenge of Different Message Standards

Before ISO 20022, the financial world was like a giant party where **everyone was speaking a different language at the same time.**

---

### The Problem: Fragmentation

Different regions and systems used different **"standards"**:

- **SWIFT MT** — Used for international transfers *(The old "King")*
- **FIX** — Used for stock trading
- **FpML** — Used for complex derivatives
- **National Standards** — Many countries had their own "local" language for domestic wires *(like Fedwire in the US or CHIPS)*

---

### Why This Was a Nightmare for Banks

1. **Translation Errors**
   When a message moved from a local system to an international one, information got lost.

2. **Data Truncation** ⚠️ *(Big Interview Word!)*
   This means **"cutting off data."** If the local system allowed 100 characters for a name but the international system only allowed 35, the name got chopped.
   - **Example:** `"International Business Machines"` becomes `"Internat. Bus. Mach."`
   - *(This makes the fraud department very angry because they can't verify the name properly.)*

3. **High Costs**
   Banks had to build "translators" for every single connection. It was like buying a different charging cable for every single app on your phone.

---

### 📝 2.7: ISO 20022 Message Registration Process

Since ISO 20022 is a **"Living Language,"** we need a way to add new words or messages. It's not a free-for-all; there is a strict **4-step process.**

### The 4-Step Process

1. **Submission**
   An organization (like a group of banks) submits a **Business Case.** They have to prove that the world actually needs this new message.

2. **Review (The SEGs)**
   Remember the **Standards Evaluation Groups** from Day 5? They look at the request. They check: *"Does this follow the rules? Does it overlap with an existing message?"*

3. **Development**
   If approved, experts build the technical **"schema"** (the XML blueprint).

4. **Registration & Publication**
   The **Registration Authority (SWIFT)** gives it a final check and publishes it on the official website *(iso20022.org)* for the whole world to use.

---

### 💼 The "Interview Answer"

**Q: "What is the biggest challenge when moving from legacy standards to ISO 20022?"**

> **A:** *"The biggest challenge is **Interoperability** and **Data Truncation.** Legacy standards like SWIFT MT are much more restrictive in size. When you try to map a 'rich' ISO 20022 message back into an older format, critical information required for **AML (Anti-Money Laundering)** and **KYC (Know Your Customer)** checks can be lost. This is why a global move to a single, unified standard is so vital."*

---

### 🎯 Day 6 Key Takeaways

- **Fragmentation = Friction** — Different standards make payments slow, expensive, and risky.
- **Data Truncation** — The enemy of compliance. It happens when "rich" data is forced into "poor" (small) message fields.
- **The Process** — New messages are born through a formal cycle:

```
Business Case  ➡️  Review  ➡️  Development  ➡️  Publication
```

---

> 🎉 **Congratulations! You've finished the core theory of Phase 1.**
>
> Ready for **Day 7?** Since it's the end of your first week, we'll do a **Review and Mock Quiz.** A few "Interview Style" questions based on everything covered so far to see how much has stuck. Would you like to start the Week 1 Review?