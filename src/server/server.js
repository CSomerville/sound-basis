const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.load({ path: '.env' });
const session = require('express-session');
const passport = require('passport');
const sessionConfig = require('./session-config');
const passportConfig = require('./passport-config');
const apiRouter = require('./api/routes');
const siteRouter = require('./site/routes');
const returnsAdminRouter = require('./admin/routes');

const app = express();
const production = process.env.NODE_ENV === 'production';

app.use(morgan((production) ? 'combined' : 'dev'));
app.use(helmet());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static('./bundle'));
app.use('/api', apiRouter);
app.use('/admin', returnsAdminRouter(passport));
app.use('/', siteRouter);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`server is listening on port ${app.get('port')}`);
});



