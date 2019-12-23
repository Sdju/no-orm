const { EMPTY_FIELD } = require('./consts');

class Schema {
    constructor(schema) {
        this.schema = schema;
        this.keys = Object.keys(schema);
    }

    async toModel(obj) {
        const res = {};
        for (const key of this.keys) {
            if (obj[key] !== EMPTY_FIELD) {
                const schemaField = this.schema[key];
                if (schemaField._linked) {
                    res[key] = await this.schema[key].toModel(obj[key]);
                } else {
                    res[key] = await this.schema[key].toModel(obj[key]);
                }
            }
        }
        if (obj._id !== null) {
            res._id = obj._id;
        }
        return res;
    }

    async fromModel(obj, data) {
        for (const key of this.keys) {
            if (key in data) {
                obj[key] = await this.schema[key].fromModel(data[key]);
            } else {
                obj[key] = EMPTY_FIELD;
            }
        }
        if ('_id' in data) {
            obj._id = data._id;
        }
        return obj;
    }

    async toDefault(obj) {
        for (const key of this.keys) {
            obj[key] = await this.schema[key].toDefault();
        }
        return obj;
    }
}
module.exports = Schema;
