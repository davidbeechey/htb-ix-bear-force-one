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
const tableName = "goalData";

export const handler = async (event, context) => {
  let body, responseBody, eventBody;
  let responseCode = 200;
  console.log("request: " + JSON.stringify(event));
  if (event.resource.startsWith("/goals")) {
    switch (event.httpMethod) {
      case 'POST':
        eventBody = JSON.parse(event.body)
        body = await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              university: eventBody.university,
              co2_concentration: eventBody.co2_concentration,
              voc_index: eventBody.voc_index,
              energy_consumption: eventBody.energy_consumption,
              tds_solids: eventBody.tds_solids
            },
          })
        );
        responseBody = {
          msg: 'Goal Added'
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
            UpdateExpression: 'set co2_concentration = :co2_concentration, voc_index = :voc_index, energy_consumption = :energy_consumption, tds_solids = :tds_solids',
            ExpressionAttributeValues: {
              ':co2_concentration': eventBody.co2_concentration,
              ':voc_index': eventBody.voc_index,
              ':energy_consumption': eventBody.energy_consumption,
              ':tds_solids': eventBody.tds_solids
            },
            ReturnValues: 'ALL_NEW'
          })
        );
        responseBody = {
          msg: 'Goals Updated'
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
          msg: 'Goals Deleted'
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