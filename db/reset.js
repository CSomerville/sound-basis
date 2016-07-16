const schema = require('./schema');
const seed = require('./seed');

schema().then(() => seed());
