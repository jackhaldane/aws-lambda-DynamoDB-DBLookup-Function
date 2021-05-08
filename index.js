const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();
// define table name
const setTableName = "twilio_allowed_phone_numbers";

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "GET /items/{id}": // if get request is /items fetch data from dynamo and wait for response, then return to user
        body = await dynamo
          .get({
            TableName: setTableName,
            Key: {
              caller_phone_number: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /newitem/{id}": // if get request is /newitem create new object in dynamo and wait for response, then return to user
        await dynamo
          .put({
            TableName: setTableName,
            Item: {
              caller_phone_number: event.pathParameters.id,
              isAllowed: true
            }
          })
          .promise();
        body = `Put item ${event.pathParameters.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
