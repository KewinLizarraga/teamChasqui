const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

router.get('/', businessController.getAll);
router.post('/', businessController.create)

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
