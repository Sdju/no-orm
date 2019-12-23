const { EMPTY_FIELD } = require('../consts');

function ObjectType(schemaData) {
    return {
        name: 'object',

        async toDefault() {
            const keys = Object.keys(schemaData);
            const res = {};
            for (const key of keys) {
                res[key] = await schemaData[key].toDefault();
            }
            return res;
        },
        async fromModel(data) {
            const keys = Object.keys(schemaData);
            const res = {};
            for (const key of keys) {
                if (key in data) {
                    res[key] = await schemaData[key].fromModel(data[key]);
                } else {
                    res[key] = EMPTY_FIELD;
                }
            }
            return res;
        },
        async toModel(data) {
            const keys = Object.keys(schemaData);
            const res = {};
            for (const key of keys) {
                if (data[key] !== EMPTY_FIELD) {
                    res[key] = await schemaData[key].toModel(data[key]);
                }
            }
            return res;
        },
    };
}

module.exports = ObjectType;
