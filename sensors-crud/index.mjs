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
        if (event.queryStringParameters) {
          let location = decodeURIComponent(event.queryStringParameters.location) || 'none'
          let campus = decodeURIComponent(event.queryStringParameters.campus) || 'none'
          let type = decodeURIComponent(event.queryStringParameters.type) || 'none'
          if(type == 'none' && location == 'none' && campus == 'none') {
            responseCode = 400;
            responseBody = {
              msg: 'Bad request'
            }
            break;
          }
          const params = {
            TableName: tableName,
            FilterExpression: '#ID = :ID and #campus = :campusval and #location = :locationval',
            ExpressionAttributeNames: {
                '#ID': 'ID',
                '#campus': 'campus',
                '#location': 'location',
            },
            ExpressionAttributeValues: {
                ':ID': type,
                ':campusval': campus,
                ':locationval': location,
            },
        };
          const result = await dynamo.send(new ScanCommand(params));
          responseBody = {
            sensors: result
          }
          break;
        }
        body = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        responseBody = {
          sensors: body
        }
        break;
      case 'POST':
        let eventBody = JSON.parse(event.body)
        body = await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              ID: eventBody.key,
              uniqueID: `${eventBody.key}-${context.awsRequestId}`,
              campus: eventBody.campus,
              location: eventBody.location,
              data: eventBody.data
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
    body: JSON.stringify({ response: responseBody, event: event })
  };
  console.log("response: " + JSON.stringify(response))
  return response;
};