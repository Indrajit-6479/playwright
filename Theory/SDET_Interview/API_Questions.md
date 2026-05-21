### Rest Assured Interview Questions:
#### Q1. How do you validate API response body and schema using Rest Assured ?
#### Q1. How do you validate JSON response and assert values using Rest Assured / Java? 
#### Q1. How do you validate JSON schema in your project? Write the code for it.
#### Q1. Explain REST API architecture in your project and how you validate responses.
- In Rest Assured, I validate API response body and schema in two levels.
- First, I validate the response data using status code, response body values, headers, and JSON paths.
- Second, I validate the response schema to make sure API structure is correct and fields are not changed unexpectedly.
- For response body validation, I generally use then().body() with Hamcrest matchers.
```java
given()
.when()
    .get("https://reqres.in/api/users/2")
.then()
    .statusCode(200)
    .body("data.id", equalTo(2))
    .body("data.first_name", equalTo("Janet"))
    .body("data.email", containsString("@reqres.in"));
```
- Here I am validating actual response values using JSON path.
- For schema validation, I use JSON Schema Validator in Rest Assured.
- It helps verify response structure, mandatory fields, data types, and overall contract.    
```java
given()
.when()
    .get("https://reqres.in/api/users/2")
.then()
    .statusCode(200)
    .body(matchesJsonSchemaInClasspath("userSchema.json"));
```
- Here userSchema.json is stored inside the resources folder.
- `.body(matchesJsonSchemaInClasspath("userSchema.json"))`: Grabs the JSON file (userSchema.json) from your project folders and compares its rules against the actual API response to ensure they match perfectly.  
- In real projects, schema validation is very useful in regression testing because if developers accidentally change response structure, our tests immediately fail and we can identify contract-breaking changes quickly.
- Need to add `json-schema-validator` in pom.xml

#### Q2. Difference between POST and PUT methods in REST API
- In REST API, both POST and PUT methods are used to send data to the server, but their purpose is different.
- POST is mainly used to create a new resource, whereas PUT is used to update an existing resource completely.
- In automation testing, for POST APIs I usually validate resource creation, response body, generated ID, and database entry.  
- PUT APIs, I validate whether existing data is updated correctly and no duplicate resource is created after repeated execution.

#### Q3. Difference between PUT and PATCH in REST API
- Both PUT and PATCH are used to update existing resources in REST APIs, but the main difference is how much data they update.
- PUT is used for replaces the complete resource, whereas PATCH is used for updates only specific fields.
- In real projects, PATCH is preferred when only small changes are required because it reduces payload size and improves performance.
- PUT is mostly used when complete object replacement is needed.

| PUT                          | PATCH                                            |
| ---------------------------- | ------------------------------------------------ |
| Full update                  | Partial update                                   |
| Sends complete object        | Sends only modified fields                       |
| Can overwrite missing fields | Keeps existing fields unchanged                  |
| Idempotent                   | Usually idempotent but depends on implementation |

- For PUT APIs, I validate complete object update and verify old data replacement.
- For PATCH APIs, I validate only modified fields are updated and remaining data is unchanged.”

#### Q4. HTTP Methods with Simple Explanation + Rest Assured Template
**1. GET → Retrieve data from server.**
```java
Response response =
given()
.when()
    .get("/users/1")
.then()
    .statusCode(200)
    .extract().response();
```

**2. POST → Create new resource**
```java
String payload = "{ \"name\": \"Rahul\" }";

given()
    .header("Content-Type", "application/json")
    .body(payload)
.when()
    .post("/users")
.then()
    .statusCode(201);
```

**3. PUT → Update complete existing resource.**
```java
String payload = "{ \"name\": \"Rahul Sharma\" }";

given()
    .header("Content-Type", "application/json")
    .body(payload)
.when()
    .put("/users/1")
.then()
    .statusCode(200);
```

**4. PATCH → Update only specific fields.**
```java
String payload = "{ \"email\": \"new@test.com\" }";

given()
    .header("Content-Type", "application/json")
    .body(payload)
.when()
    .patch("/users/1")
.then()
    .statusCode(200);
```

**5. DELETE → Delete existing resource.**
```java
given()
.when()
    .delete("/users/1")
.then()
    .statusCode(204);
```

#### Q5. Important HTTP Status Codes Used in API Testing
- In API testing, HTTP status codes are very important because they tell us whether request is successful, client made mistake, or server failed
- During testing, I mostly work with 2xx, 4xx, and 5xx status codes.
**2xx → Success Responses**

| Status Code    | Meaning                         | Real-Time Usage         |
| -------------- | ------------------------------- | ----------------------- |
| 200 OK         | Request successful              | GET, PUT, PATCH success |
| 201 Created    | Resource created successfully   | POST API                |
| 202 Accepted   | Request accepted for processing | Async processing        |
| 204 No Content | Success but no response body    | DELETE API              |

**4xx → Client Side Errors**

| Status Code                | Meaning                    | Real-Time Scenario        |
| -------------------------- | -------------------------- | ------------------------- |
| 400 Bad Request            | Invalid request or payload | Missing mandatory fields  |
| 401 Unauthorized           | Authentication failed      | Invalid token             |
| 403 Forbidden              | Access denied              | User lacks permission     |
| 404 Not Found              | Resource/API not found     | Invalid endpoint or ID    |
| 405 Method Not Allowed     | Wrong HTTP method used     | Using POST instead of GET |
| 409 Conflict               | Duplicate/conflicting data | Duplicate user creation   |
| 415 Unsupported Media Type | Wrong content type         | Missing application/json  |
| 422 Unprocessable Entity   | Validation failed          | Invalid business data     |

**5xx → Server Side Errors**

| Status Code               | Meaning                        | Real-Time Scenario               |
| ------------------------- | ------------------------------ | -------------------------------- |
| 500 Internal Server Error | Generic server failure         | Null pointer, DB issue           |
| 502 Bad Gateway           | Invalid upstream response      | Microservice communication issue |
| 503 Service Unavailable   | Server temporarily unavailable | Maintenance or overload          |
| 504 Gateway Timeout       | Server timeout                 | Dependency service delay         |

#### Q6. What is the difference between 401 and 403?
- `401 Unauthorized` → You are NOT authenticated. Send credentials first.
- `403 Forbidden` → You ARE authenticated but NOT authorized. 
- You don't have permission even with valid login.
- Real example: Normal user trying to access admin dashboard → 403 (they are logged in but don't have admin rights)

#### Q7. What is difference between 400 and 422?
- `400` → Request is malformed. JSON syntax error, missing required header
- `422` → Request structure is fine but data fails validation. Email format wrong, age is negative

#### Q8. Different authentication types — Bearer, OAuth, Basic Auth.
**1) Basic Authentication:**
- Basic Authentication is the simplest authentication mechanism where username and password are encoded in Base64 and sent in the Authorization header. 
- Since it is not encrypted, we usually use it only with HTTPS. 
- It is commonly used in internal or low-security APIs.

**2) Bearer Token Authentication:**
- Bearer Authentication works using access tokens. 
- After successful login, server generates a token and client sends that token in Authorization header for further requests. 
- It is widely used in REST APIs and JWT authentication because credentials are not exposed in every request.

**3) OAuth Authentication:**
- OAuth is an authorization framework used for secure third-party access. 
- Instead of sharing username and password, user grants permission through tokens. 
- Common examples are Login with Google or Facebook. 
- OAuth is widely used in enterprise and cloud applications.

#### Q9. API Chaining Strategies — How Do You Chain API Calls?
- API chaining is the process of linking multiple APIs together in a sequence. 
- It means taking the output data from one API response and apply it as the input or parameter for the next API request.
- In real projects, APIs are usually connected. So instead of testing APIs individually, we validate the complete business flow.
- Real-Time Example:
```
E-commerce Flow
1) Login API → get token
2) (use token)Create Order API → get orderId
3) (use orderId)Payment API → get paymentId
4) (use paymentId)Order Status API → verify order completed
```
- Here each API depends on previous API response. This is called API chaining.

#### Q10. What are Query Params and Path Params?
**Path Params:**
- Path parameters are used to identify a specific resource.
- Path parameters are passed directly in the API URL path. 
- They are generally mandatory and commonly used for fetching, updating, or deleting specific records.
- e.g. `/users/101`

**Query Params:**
- Query parameters are optional key-value pairs added after the question mark in URL. 
- They are commonly used for filtering, searching, sorting, and pagination of API data.
- e.g. `/users?status=active`

#### Q11. Difference between REST and SOAP. Explain REST web service architecture.

| REST                                                                                      | SOAP                                                                                             |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| REST stands for Representational State Transfer.                                          | SOAP stands for Simple Object Access Protocol.                                                   |
| REST is an architectural style.                                                           | SOAP is a protocol.                                                                              |
| REST is lightweight and faster.                                                           | SOAP is heavyweight and slower.                                                                  |
| REST mainly uses JSON data format, but it can also support XML, Text, and HTML.           | SOAP supports only XML format.                                                                   |
| REST is simple and easy to implement.                                                     | SOAP is more complex to implement.                                                               |
| REST is highly flexible and scalable.                                                     | SOAP is less flexible compared to REST.                                                          |
| REST follows stateless communication.                                                     | SOAP can support both stateful and stateless communication.                                      |
| REST mainly uses standard HTTP methods like GET, POST, PUT, DELETE.                       | SOAP works using strict XML-based messaging protocol.                                            |
| REST is widely used in modern web, mobile, and microservices applications.                | SOAP is mostly used in enterprise, banking, and financial systems.                               |
| REST security is generally implemented using HTTPS, OAuth, JWT, and Bearer tokens.        | SOAP provides advanced security using WS-Security standards.                                     |
| REST APIs are easier for API testing and automation.                                      | SOAP APIs are comparatively harder to test and maintain.                                         |
| REST is preferred where performance and scalability are important.                        | SOAP is preferred where high security and transaction reliability are critical.                  |
| REST is more commonly used in modern applications because it is faster and easier to use. | SOAP is still preferred in enterprise systems where strict standards and security are important. |


#### Q12. How do you handle dynamic fields in API responses (timestamps, IDs)?
- Dynamic fields like timestamps, tokens, IDs, and session values change for every API execution, so I avoid hardcoded validations. 
- I usually extract such values using JsonPath or response parsing and store them in variables for API chaining. 
- For validation, I verify datatype, format, regex patterns, nullability, or schema instead of exact values. 
- For timestamps, I validate the date format and acceptable time range. 
- This approach makes API automation stable and reusable.

#### Q13. How do you handle SSL certificates in API automation ?
- In API automation, sometimes APIs are secured with SSL certificates.
- If the certificate is invalid, expired, self-signed, or not trusted, then API requests may fail with SSL handshake exceptions.
In Rest Assured, we can handle this by relaxing HTTPS validation.
```java
given()
    .relaxedHTTPSValidation()
.when()
    .get("https://example.com")
.then()
    .statusCode(200);
```
- This tells Rest Assured to ignore SSL certificate validation during execution.
- In lower environments like QA, UAT, or staging, teams often use self-signed certificates.
So during automation, we commonly use relaxed HTTPS validation to avoid SSL certificate issues.
- We can also configure keystore or truststore certificates if project requires strict security validation instead of bypassing SSL
```java
RestAssured.config = RestAssured.config()
    .sslConfig(new SSLConfig()
    .trustStore("truststore.jks", "password"));
```
- This approach is more secure and mostly used in production-like environments.

#### Q14. How do you debug a failed API test / API returning 500 Internal Server Error ?
- If API returns 500 Internal Server Error, it means issue is happening at server side.
- As an SDET, my approach is to systematically verify whether problem is from request data, environment, backend logic, or dependency failure.    
- First, I check whether request is correct:Endpoint URL, Request method, Headers, Authentication token, Request payload, Query parameters
- Sometimes invalid payload or missing mandatory field can indirectly trigger server-side failure.
- Then I check response message, reproduce issue in Postman/curl, verify logs, database data.
- collaborate with dev and check dependent services to identify root cause.”

#### Q15. What important checks do you perform while testing an API?
- While testing APIs, I first validate request components like endpoint, HTTP method, headers, authentication, payload, and parameters. 
- Then I validate response status code, body, headers, response time, and JSON schema. 
- I also perform negative testing, authorization validation, and business logic checks. 
- In case of failures, I verify logs, database data, and dependent services to identify root cause.


#### Q16. Given a JSON, write code to create a POST request and fetch all cities where temp > 40.
```java
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;

import java.util.List;

import static io.restassured.RestAssured.*;

public class WeatherAPI {

    public static void main(String[] args) {

        String requestBody = "{ \"country\": \"India\" }";

        Response response = given()
                .header("Content-Type", "application/json")
                .body(requestBody)
        .when()
                .post("https://api.example.com/weather")
        .then()
                .statusCode(200)
                .extract().response();

        JsonPath jsonPath = response.jsonPath();

        List<String> hotCities = jsonPath.getList(
                "cities.findAll { it.temp > 40 }.name"
        );

        System.out.println("Cities with temp > 40:");
        
        for(String city : hotCities) {
            System.out.println(city);
        }
    }
}
```
- I use JsonPath filtering in Rest Assured to dynamically parse JSON arrays and fetch only matching records. 
- In this example, findAll { it.temp > 40 } filters cities based on temperature condition and returns only required city names.

```java
Map<String, String> payload = new HashMap<>();
payload.put("country", "India");
```
```java
Response response = given()
        .spec(requestSpecification)
        .body(payload)
.when()
        .post(EndPoints.GET_WEATHER_DATA)
.then()
        .statusCode(200)
        .extract()
        .response();
```
```java
JsonPath js = response.jsonPath();
```
```java
List<String> cities = js.getList(
    "cities.findAll { it.temp > 40 }.name"
);
```
```java
Assert.assertFalse(cities.isEmpty());

for(String city : cities) {
    System.out.println(city);
}
```
- In real projects, I usually implement this using Rest Assured framework with reusable request specifications and utility methods. 
- After sending the POST request, I extract response using JsonPath and apply dynamic filtering like findAll { it.temp > 40 } to fetch matching cities. 
- Then I validate the results using assertions instead of hardcoded values. 
- I also maintain logging, reporting, and schema validations as part of the framework for better maintainability and debugging.

#### Q17. Different assert methods 

| Type        | Keyword/Class Used | Behavior                                  | Execution After Failure               |
| ----------- | ------------------ | ----------------------------------------- | ------------------------------------- |
| Hard Assert | Assert             | Test stops immediately if assertion fails | Stops execution                       |
| Soft Assert | SoftAssert object  | Test continues even if assertion fails    | Continues execution until assertAll() |


| Assert Method     | Purpose                         | Example                                     |
| ----------------- | ------------------------------- | ------------------------------------------- |
| assertEquals()    | Validate actual equals expected | assertEquals(statusCode, 200)               |
| assertNotEquals() | Validate values are not equal   | assertNotEquals(statusCode, 500)            |
| assertTrue()      | Validate condition is true      | assertTrue(responseTime < 3000)             |
| assertFalse()     | Validate condition is false     | assertFalse(list.isEmpty())                 |
| assertNull()      | Validate value is null          | assertNull(errorMessage)                    |
| assertNotNull()   | Validate value is not null      | assertNotNull(token)                        |
| fail()            | Manually fail test              | fail("API Failed")                          |
| equalTo()         | Exact match validation          | body("id", equalTo(2))                      |
| containsString()  | Partial text validation         | body("email", containsString("@gmail.com")) |
| greaterThan()     | Numeric comparison              | body("temp", greaterThan(40))               |
| hasItems()        | Validate list values            | body("cities", hasItems("Delhi"))           |
| notNullValue()    | Validate field exists           | body("token", notNullValue())               |




