let { MongoClient } = require('mongodb');

const { genConnectionString } = require('./tools/connection');
const Schema = require('./schema');
const Model = require('./model');

const Elementary = require('./types/elementary');
const Object = require('./types/object');
const Submodel = require('./types/submodel');
const Array = require('./types/array');
const Link = require('./types/link');
const Custom = require('./types/custom');
const path = require('path');

class NoOrm {
    static async connect(configs) {
        if (NoOrm.db === null) {
            NoOrm.db = (await MongoClient
                .connect(genConnectionString(configs), { useNewUrlParser: true }))
                .db(configs.dbName);
            for (const modelInfo of Model.Models.values()) {
                modelInfo.collection = await NoOrm.db.collection(modelInfo.collectionName);
            }
        }
    }

    static newModel(model, collectionName, schema) {
        Model.Models.set(model, {
            collectionName: collectionName,
            model: model,
            collection: null,
            schema: new Schema(schema),
        });
    }

    static newSubmodel(submodel, schema) {
        submodel.schema = new Schema(schema);
    }

    static async create(model) {
        const obj = new model();
        await obj.toDefault();
        return obj;
    }

    static async count(model, query = {}) {
        return Model.Models.get(model).collection.count(query);
    }

    static async findMany(model, query = {}, params = {}) {
        let cursor = await Model.Models.get(model).collection.find(query).sort({date: -1});
        if ('paging' in params) {
            cursor = cursor.limit(params.paging.size).skip(params.paging.page * params.paging.size);
        }
        const res = await cursor.toArray();
        const objs = [];
        for (const data of res) {
            const obj = new model(data._id);
            await obj.actualize();
            objs.push(obj);
        }
        return objs;
    }

    static async updateObj(obj, updation, params = {}) {
        const collection = obj.modelInfo.collection;
        await collection.updateOne({ _id: obj._id }, updation);
        return obj.actualize();
    }

    static async remove(model, query = {}) {
        if (model instanceof Model) {
            await model.modelInfo.collection.remove({_id: model._id});
        } else {
            await Model.Models.get(model).collection.remove(query);
        }
    }

    static async find(model, query = {}, params = {}) {
        const data = await Model.Models.get(model).collection.findOne(query);
        let obj = null;
        if (data === null) {
            if (params.orCreate) {
                obj = new model();
            }
        } else {
            obj = new model(data._id);
            await obj.actualize();
        }
        return obj;
    }

    static getCollection(model) {
        return Model.Models.get(model).collection;
    }

    static async clearAll(model) {
        await NoOrm.getCollection(model).deleteMany({});
    }
}
NoOrm.db = null;


NoOrm.Types = {
    Elementary,
    Object,
    Submodel,
    Array,
    Link,
    Custom,
};

module.exports = NoOrm;
