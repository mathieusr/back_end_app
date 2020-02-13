const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4')
const { validationResult, body } = require('express-validator');

const element = [
]

const a;

a.test();

router.route('/products')
  .get((req, res) => {

    // const a = null;

    // a.test()

    // eval("this." + spec).toString()


    // akkk()

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

      element.push({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
      })

      return res.status(201).send({
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