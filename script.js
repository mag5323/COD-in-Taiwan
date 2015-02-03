var pie = {pie1: 'pie1', pie2: 'pie2'}

function renderPie(year, target) {
  var dead  = 'dead' + year + '.txt';
  var mapping = year > 96 ? 'after97cause.txt' : 'before97cause.txt';

  d3.csv('data/' + dead)
    .get(function(error, data) {
      var mailiao = _.filter(data, { 'county': '3913' });
      var cause = _.groupBy(mailiao, 'cause');

      d3.csv('data/' + mapping)
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
                text: '雲林縣麥寮鄉 ' + year + ' 年死因統計'
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

          pie[target] = new d3pie(target, output);
        });
    });
}

function changeFile(e) {
  var target = e.id.split('-')[0];
  pie[target].destroy();
  renderPie(e.value, target);
}

window.onload = function() {
  var years = _.range(80, 103);
  var options = [];
  for (key in years) {
    options.push('<option value=' + years[key] + '>民國 ' + years[key] + ' 年</option>');
  }
  document.getElementById('pie1-select').innerHTML = options.join('');
  document.getElementById('pie2-select').innerHTML = options.join('');
  renderPie(80, 'pie1');
  renderPie(102, 'pie2');
}
