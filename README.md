# aws-lambda-DynamoDB-DBLookup-Function
AWS Lambda function to lookup a incoming Twilio phone number against a DynamoDB table using API Gateway.

# Usage
Every request must include the GET variable `<ID>` containing the Twilio phone number to lookup.

GET `/newitem/<ID>` creates a new DynamoDB object in the specified table with the provided ID. \n
GET `/items/<ID>` returns all DynamoDB objects in the specified table matching the ID provided.

