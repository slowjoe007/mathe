var express = require('express');
var app = express();
const CXT_ROOT = 'mathe/';
const TYPES = ['addition', 'multiplication', 'subtraction', 'division'];
const RANGES = {
  'addition': [10, 75],
  'multiplication': [1, 10]
};
const OPERATION_MAPPING = {
  'addition': ['addition', true],
  'multiplication': ['multiplication', true],
  'subtraction': ['addition', false],
  'division': ['multiplication', false],
}
var GAP_POSITIONS = [2];

app.get('/' + CXT_ROOT, function (req, res) {
  var body =
  '<html>\n' +
    '<head>\n' +
      '<title>Mathe-Training</title>\n' +
      '<style type="text/css">\n' +
      '</style>\n' + 
    '</head>\n' +
    '<body>\n' +
      '<form method="get" action="/' + CXT_ROOT + 'blatt">\n' +
        '<table>\n' +
          '<tr>\n' +
          '<td valign="top">Rechenarten:</td>\n' +
            '<td>' + 
              '<label><input type="checkbox" name="t" value="addition" checked>+ Addition</label><br/>\n' +
              '<label><input type="checkbox" name="t" value="multiplication" checked>* Multiplikation</label><br/>\n' +
              '<label><input type="checkbox" name="t" value="subtraction">- Subtraktion</label><br/>\n' +
              '<label><input type="checkbox" name="t" value="division">: Division</label><br/>\n' +
            '</td>\n' +
          '</tr>\n' +
          '<tr>\n' +
            '<td>Zu berechnende Position:</td>\n' +
            '<td><input type="checkbox" name="g" value="0"/> + <input type="checkbox" name="g" value="1"/> = <input type="checkbox" name="g" value="2" checked/></td>\n' +
          '</tr>\n' +
          '<tr>\n' +
            '<td colspan="2">Summanden von <input type="text" name="s1" value="10" size="2"/> bis <input type="text" name="s2" value="75" size="2"/></td>\n' +
          '</tr>\n' +
          '<tr>\n' +
            '<td colspan="2">Faktoren von <input type="text" name="f1" value="2" size="2"/> bis <input type="text" name="f2" value="10" size="2"/></td>\n' +
          '</tr>\n' +
          '<tr>\n' +
            '<td>Aufgaben je Türmchen:</td>\n' +
            '<td><input type="text" name="ss" value="7" size="2"></input></td>\n' +
          '</tr>\n' +
          '<tr>\n' +
            '<td>Reihen:</td>\n' +
            '<td><input type="text" name="r" value="3" size="2"></input></td>\n' +
          '</tr>\n' +
          '<tr>\n' +
            '<td>Spalten:</td>\n' +
            '<td><input type="text" name="c" value="3" size="2"></input></td>\n' +
          '</tr>\n' +
          '<tr>\n' +
            '<td></td>\n' +
            '<td><input type="submit" value="Generieren"></input></td>\n' +
          '</tr>\n' +
        '</table>\n'
      '</form>\n'
    '</body>\n' +
  '</html>\n';
  res.send(body);
});

app.get('/' + CXT_ROOT + 'blatt', function (req, res) {
  var body =
  '<html>' +
    '<head>' +
      '<title>Arbeitsblatt</title>' +
      '<style type="text/css">' +
        'table {\n' +
          'font-family: Arial, sans-serif;\n' +
          // 'font-size: large;\n' +
        '}\n' +
        'table.sheet {\n' +
          'width: 100%;\n' +
        '}\n' +
        'table.set {\n' +
          'width: 33%;\n' +
          'margin: 30px;\n' +
        '}\n' +
        'table.set tr td {\n' +
          'padding: 5px;\n' +
          // 'padding-top: 10px;\n' +
          // 'padding-bottom: 10px;\n' +
          // 'padding-left: 5px;\n' +
          // 'padding-right: 5px;\n' +
          'vertical-align: middle;\n' +
          'height: 100%;\n' +
        '}\n' +
        'td.gap {\n' +
          'border: solid 1px black;\n' +
        '}\n' +
      '</style>' + 
    '</head>' +
    '<body>';
  var setSize = 7;
  if ('ss' in req.query) {
    setSize = validateParams(parseInt(req.query.ss), 0, 50);
  }
  var columns = 3;
  if ('c' in req.query) {
    columns = validateParams(parseInt(req.query.c), 0, 10);
  }
  var rows = 3;
  if ('r' in req.query) {
    rows = validateParams(parseInt(req.query.r), 0, 50);
  }
  var type = [TYPES[0], TYPES[1]];
  if ('t' in req.query) {
    if (Array.isArray(req.query.t)) {
      type = req.query.t;
    }
    else {
      type = [req.query.t];
    }
  }
  var factorRangeLow = 1;
  if ('f1' in req.query) {
    factorRangeLow = validateParams(parseInt(req.query.f1), 0, 100);
  }
  var factorRangeHigh = 10;
  if ('f2' in req.query) {
    factorRangeHigh = validateParams(parseInt(req.query.f2), factorRangeLow, 1000);
  }
  RANGES[TYPES[1]] = [factorRangeLow, factorRangeHigh];

  var summandRangeLow = 10;
  if ('s1' in req.query) {
    summandRangeLow = validateParams(parseInt(req.query.s1), 0, 100);
  }
  var summandRangeHigh = 75;
  if ('s2' in req.query) {
    summandRangeHigh = validateParams(parseInt(req.query.s2), summandRangeLow, 1000);
  }
  RANGES[TYPES[0]] = [summandRangeLow, summandRangeHigh];

  if ('g' in req.query) {
    if (Array.isArray(req.query.g)) {
      GAP_POSITIONS = req.query.g.map(x => parseInt(x));
    }
    else {
      GAP_POSITIONS = [validateParams(parseInt(req.query.g), 0, 2)]
    }
  }

  body += getMathExercises(setSize, columns, rows, type);
  body += '</body></html>';
  res.send(body);
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});

function getMathExercises(setSize =   5, columns = 3, rows = 5, type) {
  var out = '<table class="sheet">';
  for (r = 0; r < rows; r++) {
    out += '<tr>';
    for (c = 0; c < columns; c++) {
      out += '<td>' + getExerciseSet(setSize, type) + '</td>';
    }
    out += '</tr>';
  }
  out += '</table>'
  return out;
}

function getExerciseSet(size = 5, type) {
  currentType = type[Math.floor(Math.random() * type.length)];
  // console.log(currentType, forward);
  var exercises = '<table class="set">';
  for (i = 0; i < size; i++) {
    exercises += getExerciseRow(OPERATION_MAPPING[currentType][0], OPERATION_MAPPING[currentType][1]);
  }
  exercises += '</table>';
  return exercises;
}

function getExerciseRow(type, forward = true) {
  var range = RANGES[type];
  // console.log(JSON.stringify(range));
  const exercise = getExercise(range, type, forward);
  var gap = GAP_POSITIONS[Math.floor(Math.random() * GAP_POSITIONS.length)];
  var row = '<tr>';
  for (j = 0; j < exercise.length; j++) {
    row += '<td' + (2*gap === j ? ' class="gap">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' : ('>' + exercise[j])) + '</td>';
  }
  row += '</tr>';
  return row;
}

function getExercise(range, type = 'addition', forward = true) {
  var operator = '';
  var number1 = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  var number2 = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  var result = 0;
  switch(type) {
    case TYPES[1]:
      if (forward) {
        operator = '*';
      }
      else {
        operator = ':';
      }
      result = number1 * number2;
      break;
    case TYPES[0]:
      if (forward) {
        operator = '+';
      }
      else {
        operator = '-';
      }
      result = number1 + number2;
      break;
  }

  var exercise;
  if (forward) {
    exercise = [number1, operator, number2, '=', result];
  }
  else {
    exercise = [result, operator, number1, '=', number2];
  }
  return exercise;
}

function validateParams(param, low, high) {
  if (param < low) {
    param = low;
  }
  else if (param > high) {
    param = high;
  }
  return param;
}