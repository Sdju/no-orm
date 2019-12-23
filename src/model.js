class Model {
    constructor(id = null) {
        this._id = id;
    }

    async save() {
        if (this._id === null) {
            await this.saveAsNew();
        } else {
            await this.modelInfo.collection.replaceOne({_id: this._id}, await this.toModel());
        }
        return this;
    }

    async saveAsNew() {
        const model = await this.toModel();
        const data = (await this.modelInfo.collection.insertOne(model)).ops[0];
        this._id = data._id;
        return this;
    }

    async toModel() {
        return this.modelInfo.schema.toModel(this);
    }

    async fromModel(data) {
        await this.modelInfo.schema.fromModel(this, data);
        return this;
    }

    async toDefault() {
        await this.modelInfo.schema.toDefault(this);
        return this;
    }

    async actualize() {
        if (this._id === null) {
            return this;
        }
        const data = await this.modelInfo.collection.findOne({_id: this._id});
        await this.fromModel(data);
        return this;
    }

    get modelInfo() {
        return Model.Models.get(this.constructor);
    }
}
Model.Models = new Map();

module.exports = Model;
