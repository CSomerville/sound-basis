const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRouter = require('./api/routes');

const app = express();
const production = process.env.NODE_ENV === 'production';

app.use(morgan((production) ? 'combined' : 'dev'));
app.use(helmet());
app.use('/api', apiRouter);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`server is listening on port ${app.get('port')}`);
});



