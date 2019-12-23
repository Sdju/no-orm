function Submodel(submodel) {
    return {
        name: 'submodel',

        async toDefault() {
            return await submodel.schema.toDefault(new submodel());
        },
        async fromModel(data) {
            return await submodel.schema.fromModel(new submodel(), data);
        },
        async toModel(object) {
            return await submodel.schema.toModel(object);
        }
    }
}

module.exports = Submodel;
