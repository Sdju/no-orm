const Model = require('../model');
const NoOrm = require('../no-orm');

class Link {
    constructor(model, id = null) {
        this.id = id;
        this.model = model;
    }

    async load() {
        if (!this.exist) {
            return null;
        }
        const obj = await NoOrm.create(this.model);
        obj._id = this.id;
        await obj.actualize();
        return obj;
    }

    change(obj) {
        if (obj instanceof Model) {
            this.id = obj._id;
        } else {
            this.id = obj;
        }
    }

    get getHex() {
        return (this.exist)? this.id.toHexString() : '';
    }

    get exist() {
        return this.id !== null;
    }

    unlink() {
        this.id = null;
    }
}

function LinkType(model) {
    return {
        name: 'link',

        async toDefault() {
            return new Link(model);
        },
        async fromModel(data) {
            return new Link(model, data);
        },
        async toModel(data) {
            return data.id;
        }
    }
}

module.exports = LinkType;
