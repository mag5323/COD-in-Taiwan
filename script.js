var pie = {pie1: 'pie1', pie2: 'pie2'};

function renderPie(year, id, county, target) {
  var dead  = 'dead' + year + '.txt';
  var mapping = year > 96 ? 'after97cause.txt' : 'before97cause.txt';

  d3.csv('data/' + dead)
    .get(function(error, data) {
      var mailiao = _.filter(data, { 'county': id});
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

          var total = _.reduce(_.pluck(data.content, 'value'), function(memo, num){ return memo + num;});
          document.getElementById(target + '-sum').innerText = '共 ' + total.toLocaleString() + ' 人';

          var output = {
            header: {
              title: {
                text: county + ' ' + year + ' 年死因統計'
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

function changeYear(e) {
  var target = e.id.split('-')[0];
  renderRegion(e.value, target);
}

function changeRegion(e) {
  var target = e.id.split('-')[0];
  var year  = document.getElementById(target + '-select').value;
  var countySelect = document.getElementById(target + '-region');
  var id = countySelect.value;
  var county = countySelect.options[countySelect.selectedIndex].text;

  if (typeof pie[target] === 'object') {
    pie[target].destroy();
  }
  renderPie(year, id, county, target);
}

function renderRegion(year, target) {
  var region = 'region';

  if (year > 99) {
    region += '100.txt';
  } else if (year > 96 & year < 100) {
    region += '97.txt';
  } else if (year > 93 & year < 97) {
    region += '93.txt';
  } else if (year > 78 & year < 93) {
    region += '79.txt';
  }

  d3.csv('data/' + region)
    .get(function(error, data) {
      var options = [];
      for (key in data) {
        options.push('<option value=' + data[key].id + '> ' + data[key].county + '</option>');
      }
      document.getElementById(target + '-region').innerHTML = options.join('');
    });
}

window.onload = function() {
  var years = _.range(80, 103);
  var options = [];
  for (key in years) {
    options.push('<option value=' + years[key] + '>民國 ' + years[key] + ' 年</option>');
  }
  document.getElementById('pie1-select').innerHTML = options.join('');
  document.getElementById('pie2-select').innerHTML = options.join('');
  changeYear({id: 'pie1-select', value: 80});
  changeYear({id: 'pie2-select', value: 80});
}
