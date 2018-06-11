const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

router.get('/', businessController.getAll);
router.post('/', businessController.create);
router.get('/:id', businessController.getOne);
router.get('/:id/reviews', businessController.getReviews);
router.get('/:id/questions', businessController.getQuestions);

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
