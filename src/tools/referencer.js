const Elementary = require('../types/elementary');
const ArrayType = require('../types/array');
const Submodel = require('../types/submodel');

function referencer(baseSchema) {
    const schema = {};
    const keys = Object.keys(baseSchema);
    for (key of keys) {
        const val = baseSchema[key];
        const type = typeof val;

        if (['string', 'number', 'boolean', 'undefined'].includes(type)) {
            schema[key] = Elementary(val);
        } else if ( type === 'object' ) {
            if (Array.isArray(val)) {
                schema[key] = ArrayType(val[0]);
            } else {
                schema[key] = val;
            }
        } else if ( type === 'function') {
            schema[key] = Submodel(type);
        }
    }
    return schema;
}

module.exports = referencer;
