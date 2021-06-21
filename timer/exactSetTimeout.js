function setTime() {
  var duration = 500
  var start = Date.now()


  function instance() {
    var now = Date.now()
    var diff = now - start - duration
    start = Date.now()
    console.log(diff)
    setTimeout(instance, duration - diff);
  }

  setTimeout(instance, duration);
}

