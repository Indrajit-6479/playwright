### Current Project Introduction/ Roles and Responsibilities :

Currently, I am working at TCS as an SDET Engineer with one of the largest financial institutions, in the Data Quality Engineering team, which operates under the Payments domain in `Institutional Clients Group Treasury and Trade Solutions`.

What is DQE?
In simple words, our team ensures that whenever a payment message moves through different systems, no data is lost, truncated, or changed. We call this Data Quality Validation."

Our main responsibility is validating payment messages throughout the complete processing flow and making sure original payment data remains unchanged.

What payment messages do we handle?
We mainly work on ISO 20022 payment messages such as pain.001 (Customer Credit Transfer) and pain.008 (Direct Debit), which are XML-based payment files containing debtor, creditor, bank details, payment amount, and other financial information.

Countries and Regions Supported
Our application processes payments across multiple regions including APAC, EMEA, and NAM. We have onboarded countries like Australia, Tanzania, UK, Belgium, and many others. Since each country has different processing rules, we execute separate regression testing for each country

End-to-End Flow Explanation:

Step 1: Test Data Preparation
"We store payment XML files outside the codebase. During execution, we read those XML files and dynamically replace values like UETR (Unique End-to-End Transaction Reference) using placeholders generated at runtime."

Step 2: Header Configuration
"Based on the country, we dynamically configure headers such as: CITI_GCN, JMS Correlation ID, Country-specific values
All mappings are maintained in YAML configuration files.

Step 3: API Injection
"After configuration, we trigger payment APIs using Rest Assured. Payments move through multiple processing stages:"

Payment → Pre-Sanction → Sanction Screening → GlueBack → Volpay → Final Processing

Step 4: API Response Validation
"After API execution, we validate HTTP response codes to confirm successful processing."

Step 5: Database Validation (Most Critical Part)
"Database validation is one of the most important responsibilities in my project."
We validate payment persistence in MongoDB:
presanctiondb:sourceMsg, bdJsonEnrichedMsg
sanctiondb:Sanction request, Sanction response
gftts-glueback-db:rcvdMsg, translatedMsg, sentMsg, enrichedTags
AuditLog: Complete audit trail

Step 6: Tag-Level Validation
"We don't just verify data existence. We validate actual business tags by comparing source and destination values."
Dbtr (Debtor), Cdtr (Creditor), UltmtDbtr, UltmtCdtr, InitgPty

Step 7: Reporting
"After execution, we generate consolidated reports:"
Using:
Apache POI → Excel Reports
Extent Reports → HTML Reports

