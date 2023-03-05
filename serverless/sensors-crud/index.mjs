'use strict';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-west-1" });

const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "sensorsData";

export const handler = async (event, context) => {
  let body, responseBody;
  let responseCode = 200;
  console.log("request: " + JSON.stringify(event));
  console.log("query: " + JSON.stringify(event.queryStringParameters));

  if (event.resource.startsWith('/sensors')) {
    switch (event.httpMethod) {
      case 'GET':
        let result;
        if (event.queryStringParameters) {
          let location = decodeURIComponent(event.queryStringParameters.location)
          let campus = decodeURIComponent(event.queryStringParameters.campus)
          let type = decodeURIComponent(event.queryStringParameters.type)
          const params = {
            TableName: tableName,
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
          };

          let filterExpression = '';

          if (location !== 'undefined') {
            filterExpression += '#location = :locationval';
            params.ExpressionAttributeNames['#location'] = 'location';
            params.ExpressionAttributeValues[':locationval'] = location;
          }

          if (type !== 'undefined') {
            if (filterExpression) {
              filterExpression += ' and ';
            }
            filterExpression += '#ID = :ID';
            params.ExpressionAttributeNames['#ID'] = 'ID';
            params.ExpressionAttributeValues[':ID'] = type;
          }

          if (campus !== 'undefined') {
            if (filterExpression) {
              filterExpression += ' and ';
            }
            filterExpression += '#campus = :campusval';
            params.ExpressionAttributeNames['#campus'] = 'campus';
            params.ExpressionAttributeValues[':campusval'] = campus;
          }

          if (filterExpression) {
            params.FilterExpression = filterExpression;
          }

          console.log("params", params)
          result = await dynamo.send(new ScanCommand(params));
        } else {
          result = await dynamo.send(
            new ScanCommand({ TableName: tableName })
          );
        }
        let unique_identifiers = new Set(result.Items.map((item) => item.identifier))
        responseBody = {
          "sensors": [...unique_identifiers].map((identifier) => {
            let filtered = result.Items.filter((item) => item.identifier == identifier).sort((a, b) => new Date(a.time) - new Date(b.time));
            return {
              "campus": filtered[0].campus,
              "location": filtered[0].location,
              "uniqueID": filtered[0].identifier,
              "timestamps": filtered.map((item) => item.time),
              "data": filtered.map((item) => item.data)
            }
          })
        }
        break;
      case 'POST':
        let eventBody = JSON.parse(event.body)
        if (eventBody.data < 0) {
          responseCode = 400;
          responseBody = {
            msg: 'Bad Request: Invalid data'
          }
          break;
        }
        body = await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              ID: eventBody.key,
              uniqueID: `${eventBody.key}-${context.awsRequestId}`,
              identifier: `${eventBody.key}-${eventBody.campus}-${eventBody.location}`,
              campus: eventBody.campus,
              location: eventBody.location,
              data: eventBody.data,
              time: new Date().toISOString()
            },
          })
        );
        responseBody = {
          msg: 'Sensor created'
        }
        break;
    }
  } else {
    responseCode = 404;
    responseBody = {
      msg: 'Not found'
    }
  }

  let response = {
    statusCode: responseCode,
    body: JSON.stringify(responseBody)
  };
  console.log("response: " + JSON.stringify(response))
  return response;
};