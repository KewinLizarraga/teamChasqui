const express = require('express');
const router = express.Router();
const Business = require('mongoose').model('Business');
// const businessC = require('../controllers/businessC');

router.get('/', (req, res) => {
  const { filter } = req.query;
  Business.find(filter, (err, businesses) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(businesses);
  })
});

// router.get('/setup', (req, res) => {
//   businesses = [{
//     type: 'restaurant',
//     name: 'Rico Rico'
//   },{
//     type: 'hotel',
//     name: 'El Cielo'
//   }];

//   Business.create(businesses, (err, data) => {
//     res.send(data);s
//   })
// });


module.exports = router;
