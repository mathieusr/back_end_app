const {Consumer} = require('sqs-consumer');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: "eu-west-3",
    maxRetries: 2,
    httpOptions: {
        timeout: 4000,
    }
  });

const sqsProcess = Consumer.create({
    queueUrl: process.env.EVENT_SERVICE_URL,
    handleMessage: async (message) => {

        if(message.MessageAttributes.id){

            dynamodb.get({
                TableName: 'Product',
                Key: {
                    Id: message.MessageAttributes.id.StringValue
                }
            }, (err, data) => {

                if(!err)
                    dynamodb.update({
                        TableName: 'Product',
                        Key: {
                            Id: data.Item.Id
                        },
                        AttributeUpdates: {
                            Name: {
                                Action: 'PUT',
                                Value: message.MessageAttributes.name
                            },
                            Description: {
                                Action: 'PUT',
                                Value: message.MessageAttributes.description
                            },
                            Price: {
                                Action: 'PUT',
                                Value: parseInt(message.MessageAttributes.price.StringValue)
                            },
                            Grade: {
                                Action: 'PUT',
                                Value: parseInt(message.MessageAttributes.grade.StringValue)
                            }
                        }
                    }, (err, data) => {

                        // console.log('PUT');
                        // console.log(err);
                    })

                // console.log('GET');
                // console.log(err);
            })
        }
    },
    messageAttributeNames: ['id', 'name', 'description', 'price', 'grade', 'ttt']
});

sqsProcess.on('error', (err) => {
    console.error(err.message);
});

sqsProcess.on('processing_error', (err) => {
    console.error(err.message);
});

sqsProcess.start();

module.exports = sqsProcess