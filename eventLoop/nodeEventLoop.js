const fs = require('fs');

fs.readFile(__dirname, () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0);
  setImmediate(() => {
    console.log('immediate')
  })
})


