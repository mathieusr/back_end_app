const {Consumer} = require('sqs-consumer');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: "eu-west-3", credentials: AWS.config.credentials});

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
                            Quantity: {
                                Action: 'PUT',
                                Value: parseInt(message.MessageAttributes.quantity.StringValue)
                            }
                        }
                    }, (err, data) => {

                        console.log('PUT');
                        console.log(err);
                    })

                console.log('GET');
                console.log(err);
            })
        }
    },
    messageAttributeNames: ['id', 'quantity', 'ttt']
});

sqsProcess.on('error', (err) => {
    console.error(err.message);
});

sqsProcess.on('processing_error', (err) => {
    console.error(err.message);
});

sqsProcess.start();

module.exports = sqsProcess