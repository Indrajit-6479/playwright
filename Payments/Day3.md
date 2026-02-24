## Day 3: The Star of the Show – ISO 20022

Welcome to **Day 3**! Today we are looking at the "Star of the Show." If you understand this lesson, you will understand the heart of modern banking.

Yesterday, we learned that **ISO** is the "Rule Maker." Today, we look at their masterpiece: **ISO 20022**.

---

## 🗣️ 2.2: What is ISO 20022? (The Global Financial Language)

Many people think ISO 20022 is just a new type of digital file. That is a **mistake**!

ISO 20022 is a **"Dictionary."** Imagine if every bank in the world sat down and agreed on the definition of a "Customer."

- Bank A calls them "Client."  
- Bank B calls them "Account Holder."  
- Bank C calls them "Debtor."  

**ISO 20022 says:**  
*"From now on, we all agree on a single definition and a single way to describe this person."*  

This is why we call it a **Common Language**.

---

## The 3 Layers of ISO 20022

To understand ISO 20022, you have to look at it like a **house**. It’s built in three layers:

| Layer              | What it represents                       | Simple Analogy                               |
| ------------------ | ---------------------------------------- | -------------------------------------------- |
| **Business Layer** | The actual real-world action             | "I want to buy a coffee from you."           |
| **Logical Layer**  | The specific info needed for that action | "I need your name, the price, and the date." |
| **Physical Layer** | The "code" or "envelope" used to send it | Writing that info in an XML format           |

---

## Why is it "Rich Data"?

In an interview, you’ll hear the term **"Rich Data."** This is the biggest selling point of ISO 20022.

### The Old Way: MT Messages
- The data was **flat**.  
- If you wanted to include an address, you had a tiny space.  
- Banks often had to cram the Street, City, and Postal Code into **one line**.  
- It looked messy and was prone to errors.

### The ISO 20022 Way: MX Messages
- The data is **structured**.  
- Every piece of info has its own little box called a **Tag**.
```
<StrtNm> (Street Name)

<TwnNm> (Town Name)

<PstCd> (Post Code)
```
> Example: If the bank is looking for a "Sanctioned City," it doesn't have to guess where the city name is in a long string of text. It just looks at the `<TwnNm>` box.

![Image comparing MT and ISO 20022 data fields showing structured vs unstructured data](#)

---

## 💼 The "Interview Answer"

**Question:** *"What makes ISO 20022 different from previous standards?"*  

**Answer:**  
*"ISO 20022 is a recipe-based standard rather than just a fixed format. It separates the business logic from the physical syntax (XML). Its main advantage is Rich, Structured Data, which allows for better compliance screening, fewer manual repairs, and higher Straight-Through Processing (STP) rates."*

---

## 🎯 Day 3 Key Takeaways

- **It's a Dictionary:** Defines financial terms so everyone speaks the same language.  
- **Layers:** Separates what we are doing (**Business**) from how we code it (**Physical**).  
- **Structure:** Uses **Tags** to keep data organized, which makes it "Rich Data."  

---

You're making great progress! You now know **what the language is**.

Ready for **Day 4**? We’re going to look at the **Timeline (2004–2025)**. This is important because you need to know where the industry is right now in this big migration.