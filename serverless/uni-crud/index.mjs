'use strict';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-west-1" });

const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "universityData";

export const handler = async (event, context) => {
  let body, responseBody, eventBody;
  let responseCode = 200;
  console.log("request: " + JSON.stringify(event));
  if (event.resource.startsWith("/university")) {
    switch (event.httpMethod) {
      case 'POST':
        eventBody = JSON.parse(event.body)
        body = await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              university: eventBody.university,
              campuses: eventBody.campuses,
              buildings: eventBody.buildings
            },
          })
        );
        responseBody = {
          msg: 'University Added'
        }
        break;
      case 'GET':
        if (event.queryStringParameters) {
          let university = decodeURIComponent(event.queryStringParameters.university) || 'none'
          if (university == 'none') {
            responseCode = 400;
            responseBody = {
              msg: 'Bad request'
            }
            break;
          }
          const params = {
            TableName: tableName,
            FilterExpression: 'university = :university',
            ExpressionAttributeValues: {
              ':university': university
            }
          };
          const result = await dynamo.send(new ScanCommand(params));
          responseBody = {
            university: result
          }
          break;
        }
        body = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        responseBody = {
          universities: body
        }
        break;
      case 'PATCH':
        eventBody = JSON.parse(event.body)
        if (!eventBody || !eventBody.university) {
          responseCode = 400;
          responseBody = {
            msg: 'Bad request'
          }
          break;
        }
        body = await dynamo.send(
          new UpdateCommand({
            TableName: tableName,
            Key: {
              university: eventBody.university,
            },
            UpdateExpression: 'set campuses = :campuses, buildings = :buildings',
            ExpressionAttributeValues: {
              ':campuses': eventBody.campuses,
              ':buildings': eventBody.buildings
            },
            ReturnValues: 'ALL_NEW'
          })
        );
        responseBody = {
          msg: 'University Updated'
        }
        break;
      case 'DELETE':
        eventBody = JSON.parse(event.body)
        if (!eventBody.university) {
          responseCode = 400;
          responseBody = {
            msg: 'Bad request'
          }
          break;
        }
        body = await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              university: eventBody.university,
            },
          })
        );
        responseBody = {
          msg: 'University Deleted'
        }
    }
  }
  else {
    responseCode = 404;
    responseBody =
    {
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