const schema = require('./schema');
const seed = require('./seed/seed');

schema().then(() => seed());
