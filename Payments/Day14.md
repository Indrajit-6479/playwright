# Welcome to Day 14! 🌍
## Payment School — Day 14 | The Rulebook & The Alphabet: CBPR+ and Character Sets

Yesterday, we learned about the bank's IDs (BIC and IBAN). Today, we focus on **how those banks have to behave** when they send money across oceans and **what letters they are allowed to use.**

---

## 🌎 4.5: CBPR+ (Cross-Border Payments and Reporting Plus)

> **First, let's define a Cross-Border Payment:** It is simply a payment where the **Payer (Debtor)** is in one country and the **Receiver (Creditor)** is in another.

---

### What is CBPR+?

> Imagine ISO 20022 is a **giant dictionary** containing every word in the English language. If two people try to talk using the entire dictionary, it might get confusing.
>
> **CBPR+ is the "Business English" version of that dictionary.** It is a set of **"Usage Guidelines"** created by SWIFT.

- **The Goal:** To make sure that when a bank in Japan sends a message to a bank in Germany, they both interpret the "tags" in the **exact same way.**
- **The Benefit:** It ensures **Interoperability** — different bank systems can "talk" to each other without errors because they are all following the same CBPR+ rulebook.

### The Simple Hierarchy

```
ISO 20022
(The full dictionary — thousands of elements)
        │
        ▼
CBPR+ Usage Guidelines
(The "Business English" subset — what SWIFT banks must use)
        │
        ▼
Cross-Border Payment Message
(The actual message sent from Japan to Germany)
```

---

## 🔤 4.6: Character Sets in ISO 20022

> This sounds boring, but it is actually a **huge deal** for global banks.

---

### 1. The Old Way (MT — Latin-1)

In the old MT system, you could only use **basic English letters.** If a person's name was `François` or `Müller`, the bank had to change it to `"Francois"` or `"Mueller"`. This is called **Transliteration.**

- **The Problem:** It makes it very hard for the **"Fraud and Sanctions"** team to verify if the person is a criminal, if their name is spelled differently in the system than on their passport.

---

### 2. The New Way (MX — UTF-8)

ISO 20022 uses **UTF-8.** This is a **"Global Alphabet"** that supports almost every language in the world.

| Supported Language | Example Characters   |
| ------------------ | -------------------- |
| French             | `François`, `élève`  |
| German             | `Müller`, `Schröder` |
| Arabic             | `محمد`               |
| Chinese            | `王伟`               |
| Hindi              | `राहुल`                |

> **Why it matters:** Banks can now send the **Actual Name** of the person. No more guessing. No more Transliteration errors.

---

### 3. The "Restricted" Characters (Technical Tip) ⚠️

Even though XML can handle almost everything, there are a few **"Forbidden" symbols** because they are used in the **XML code itself.**

| Forbidden Symbol   | Why It's Forbidden                  | What to Use Instead |
| ------------------ | ----------------------------------- | ------------------- |
| `&` (Ampersand)    | XML uses `&` to start special codes | Use `&amp;`         |
| `<` (Less-than)    | XML uses `<` to **open** tags       | Use `&lt;`          |
| `>` (Greater-than) | XML uses `>` to **close** tags      | Use `&gt;`          |

```xml
<!-- ❌ WRONG — will break the XML parser -->
<Nm>Johnson & Sons</Nm>

<!-- ✅ CORRECT — escaped characters -->
<Nm>Johnson &amp; Sons</Nm>
```

---

## 💼 The "Interview Answer"

**Q: "What is CBPR+ and why is it important for the SWIFT migration?"**

> **A:** *"**CBPR+** stands for **Cross-Border Payments and Reporting Plus.** It is the specific set of **usage guidelines** that defines how ISO 20022 messages should be used on the SWIFT network. It's vital because ISO 20022 is a very broad standard; CBPR+ ensures that all global banks use a **harmonized subset** of the data. This prevents **'Data Truncation'** and ensures that payments can move across different countries without manual intervention."*

---

## 🎯 Day 14 Key Takeaways

1. **Cross-Border** — Money moving between two different countries
2. **CBPR+** — The **"Rulebook"** for how banks use ISO 20022 on SWIFT
3. **UTF-8** — The new **"Global Alphabet"** that allows for special characters and non-English names
4. **Validation** — CBPR+ helps banks **"validate"** (check) if a message is correct before it is sent
5. **Restricted Characters** — `&`, `<`, and `>` must be **escaped** in XML

---

> ✅ **You have now completed the "Rules of the Road"!**
>
> Ready for **Day 15?** We are going to look at **4.7 and 4.8: Internal and External Codes.** This is where we learn how banks use **"short codes"** to explain why money is being sent (like "Salary" or "Tax"). Would you like to proceed?