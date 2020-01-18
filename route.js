const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid/v4')
const { check, validationResult, body } = require('express-validator');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: "eu-west-3"});

console.log(AWS.config);

router.route('/products')
  .get((req, res) => {

    dynamodb.scan({
      TableName: 'Product'
    }, (err, data) => {

      if(err)

        return res.status(400).json({
          success: false,
          message: "An error occured"
        });

        return res.json({
          success: true,
          data: data.Items
        })
    })
  })
  .post(
    body('name').isString().trim().notEmpty(),
    body('quantity').isInt(),
    ((req, res) => {

      const errors = validationResult(req);
      
      if(!errors.isEmpty())

        return res.status(422).send({
          success: false,
          message: "Missing field",
          error: errors.array()
        });

      dynamodb.put({
        TableName: 'Product',
        Item: {
          Id: uuid(),
          Name: req.body.name,
          Quantity: req.body.quantity
        }
      }, (err, data) => {

        if(err)

          return res.status(400).json({
            success: false,
            message: "An error occured",
            error: err
          });

        return res.json({
          success: true,
          data: {
            Name: req.body.name,
            Quantity: req.body.quantity
          }
        })
      })
    })
  );

module.exports = router;