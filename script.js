d3.csv('data/dead102.txt')
  .get(function(error, data) {
    var mailiao = _.filter(data, { 'county': '3913' });
  })
