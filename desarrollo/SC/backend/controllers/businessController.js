const Business = require('mongoose').model('Business')

exports.getAll = (req, res) => {
  const { filter } = req.query;
  Business.find(filter, (err, businesses) => {
    if (err) throw err;
    if (!filter) {
      const orderedBusinesses = {};
      businesses.forEach(business => {
        if (orderedBusinesses[business.type] === undefined) {
          orderedBusinesses[business.type] = [business];
        } else {
          orderedBusinesses[business.type].push(business);
        }
      });
      return res.status(200).send(orderedBusinesses);
    }
    return res.status(200).send(businesses);
  });
}

exports.setup = (req, res) => {
  const photos = ['http://thednetworks.com/wp-content/uploads/2012/01/picture_not_available_400-300.png'];
  businesses = [{
    photos,
    type: 'restaurant',
    name: 'Habla Causa'
  }, {
    photos,
    type: 'hotel',
    name: 'The Hipson'
  }, {
    photos,
    type: 'travel_agency',
    name: 'Tu Ruta'
  }, {
    photos,
    type: 'hotel',
    name: 'KhaKheKi'
  }];

  Business.create(businesses, (err, data) => {
    res.send(data);
  })
}
