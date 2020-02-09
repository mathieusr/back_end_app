const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid/v4')
const { validationResult, body } = require('express-validator');
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "eu-west-3",
  maxRetries: 2,
  httpOptions: {
    timeout: 4000,
  }
});

router.route('/products')
  .get((req, res) => {

    dynamodb.scan({
      TableName: 'Product'
    }, (err, data) => {

      if(err)

        return res.status(400).json({
          success: false,
          message: "An error occured",
          err
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
    body('description').isString().trim().notEmpty(),
    body('price').isFloat(),
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
          Quantity: req.body.quantity,
          Description: req.body.description,
          Price: req.body.price,
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