const NoOrm = require('./no-orm');
const Model = require('./model');
const Schema = require('./schema');
const Types = {
    Elementary: require('./types/elementary'),
    Object: require('./types/object'),
    Submodel: require('./types/submodel'),
    Array: require('./types/array'),
    Link: require('./types/link'),
    Custom: require('./types/custom'),
};

module.exports = {
    NoOrm,
    Model,
    Schema,
    Types,
};
