### Can You Please Introduce Yourself ?

- Hi, Good Afternoon,  my name is Indrajit Rananavare. I completed my Bachelor’s degree in Electronics and Telecommunication from Shivaji University. I have total 4.6 years of experience in Software Development and Test Automation, mainly in Banking, FinTech, and Payment domains. 
  
- Currently, I am working as an SDET Engineer at TCS

- During my journey, I have worked on API automation, UI automation, project migration, payment validation systems and end-to-end automation frameworks. 

- I have experience working with Java, Selenium, Rest Assured, Cucumber BDD, TestNG, Maven, and Git/GitHub along with spring/springboot for building scalable automation solutions.

- I have developed robust automation frameworks for API testing, database validation, regression testing, and integrated them with CI/CD pipelines using Harness, Docker, OpenShift, and lightspeed/Jenkins for continuous testing and faster deployment validation.

- As part of Agile methodology, I regularly work with Jira for defect tracking and sprint activities. I have also used AI tools like GitHub Copilot, Friday AI, and Stylus to improve productivity, scripting speed, and debugging processes.

### Current Project Introduction / Roles and Responsibilities:

- Currently, my client is one of the largest financial institutions. I work in the Data Quality Engineering team, which operates under the Payments domain in `Institutional Clients Group Treasury and Trade Solutions`.

What is DQE?
- Our team ensures that whenever a payment message moves through different systems, no data is lost, truncated, or changed. We call this Data Quality Validation.

- Here we validating payment messages throughout the entire processing flow and ensuring that original payment data remains unchanged.

What payment messages do we handle?
- We mainly work on ISO 20022 payment messages such as pain.001 (Customer Credit Transfer) and pain.008 (Direct Debit). These are XML-based payment files containing debtor, creditor, bank details, payment amount, and other financial information.

Countries and Regions Supported
- Our application processes payments across multiple regions, including APAC, EMEA, and NAM. We have onboarded countries such as Australia, Tanzania, the UK, Belgium, and many others. Since each country has different processing rules, we execute separate regression testing for each country.

End-to-End Flow Explanation:

Step 1: Test Data Preparation
- We store payment XML files outside the codebase. During execution, we read those XML files and dynamically replace values like UETR (Unique End-to-End Transaction Reference) using placeholders generated at runtime.

Step 2: Header Configuration
- Based on the country, we dynamically configure headers such as CITI_GCN, JMS Correlation ID, and country-specific values. All mappings are maintained in YAML configuration files.

Step 3: API Injection
- After configuration, we trigger payment APIs using Rest Assured. Payments move through multiple processing stages:

`Payment → Pre-Sanction → Sanction Screening → Volpay → GlueBack → Final Processing`

Step 4: API Response Validation
- After API execution, we validate HTTP response codes to confirm successful processing.

Step 5: Database Validation (Most Critical Part)
- Database validation is one of the most important responsibilities in my project.
- We validate payment persistence in MongoDB.
- Here we have extracted required message from DB and perform tag level validations.
- presanctiondb: sourceMsg, bdJsonEnrichedMsg
- sanctiondb: Sanction request, Sanction response
- gftts-glueback-db: rcvdMsg, translatedMsg, sentMsg, enrichedTags
- AuditLog: complete audit trail

Step 6: Tag-Level Validation
- We don't just verify data existence. We validate actual business tags by comparing source and destination values.
Key tags include Dbtr (Debtor), Cdtr (Creditor), UltmtDbtr, UltmtCdtr, and InitgPty.

Step 7: Reporting
- After execution, we generate consolidated reports:
Using:
- Apache POI → Excel reports
- Extent Reports → HTML reports


