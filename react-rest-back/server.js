let express = require('express');
let app = express();


app.listen(8000, () => {
  console.log('Server Started on http://localhost:8000');
  console.log('Press CTRL + C to stop server');
});

