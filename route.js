const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid/v4')
const { validationResult, body } = require('express-validator');

const element = [
  {
    name: "Element 1",
    price: 2.0,
    quantity: 12
  }
]

router.route('/products')
  .get((req, res) => {

    return res.send({
      success: true,
      element: element
    })
  })
  .post(
    body('name').isString().trim().notEmpty(),
    body('quantity').isInt(),
    body('price').isFloat(),
    (req, res) => {

      const errors = validationResult(req);
      
      if(!errors.isEmpty())

        return res.status(422).send({
          success: false,
          message: "Missing field",
          error: errors.array()
        });

      return res.send({
        success: true,
        element: {
          name: req.body.name,
          quantity: req.body.quantity,
          price: req.body.price,
        }
      })
    }
  );

module.exports = router;