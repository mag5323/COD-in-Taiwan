window.onload = function() {
  d3.csv('data/dead102.txt')
    .get(function(error, data) {
      var mailiao = _.filter(data, { 'county': '3913' });
      var cause = _.groupBy(mailiao, 'cause');

      d3.csv('data/after97cause.txt')
        .get(function(error, data) {
          var mapping = data;
          var data = {
            sortOrder: "value-asc",
            content: []
          };

          for (key in cause) {
            data.content.push({label: mapping[key - 1].cause, value: cause[key].length});
          }

          var output = {
            header: {
              title: {
                text: '雲林縣麥寮鄉102年死因統計'
              }
            },
            labels: {
              inner: {
                format: 'percentage'
              }
            },
            tooltips: {
              enabled: true,
              type: 'placeholder',
              string: '{value} 人'
            },
            size: {
              'canvasHeight': 700,
              'canvasWidth': 900
            },
            data: data
          };

          var pie = new d3pie('pie1', output);
        });
    });

  var years = _.range(80, 103);
  var options = [];
  for (key in years) {
    options.push('<option value=' + years[key] + '>民國 ' + years[key] + ' 年</option>');
  }
  document.getElementById('pie1-select').innerHTML = options.join('');
}
}
