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
          console.log("params", location, campus, type)
          if (type == 'none' && campus == 'none' && location == 'none') {
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
          console.log("result", result)
          responseBody = {
            "campus": campus,
            "location": location,
            "uniqueID": result.Items[0].identifier,
            "timestamps": result.Items.map((item) => item.time),
            "data": result.Items.map((item) => item.data)
          }
          break;
        }
        let result = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        let unique_identifiers = new Set(result.Items.map((item) => item.identifier))
        responseBody = {
          "sensors": [...unique_identifiers].map((identifier) => {
            let filtered = result.Items.filter((item) => item.identifier == identifier)
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