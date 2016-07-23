const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRouter = require('./api/routes');
const siteRouter = require('./site/routes');

const app = express();
const production = process.env.NODE_ENV === 'production';

app.use(morgan((production) ? 'combined' : 'dev'));
app.use(helmet());
app.use('/static', express.static('./bundle'));
app.use('/api', apiRouter);
app.use('/', siteRouter);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`server is listening on port ${app.get('port')}`);
});



