d3.csv('data/dead102.txt')
  .get(function(error, data) {
    var mailiao = _.filter(data, { 'county': '3913' });
    var cause = _.groupBy(mailiao, 'cause');

    d3.csv('data/after97cause.txt')
      .get(function(error, data) {
        var mapping = data;
      });
  });
