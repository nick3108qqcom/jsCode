var fetch = require('node-fetch');

function* get() {
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result)
}

var g = get()
var res = g.next()
res.value
  .then(data => {
    return data.json()
  })
  .then((data) => {
    g.next(data)
  })