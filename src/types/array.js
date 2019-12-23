function ArrayType(type) {
    return {
        name: 'array',

        async toDefault() {
            return [];
        },
        async fromModel(data) {
            const res = Array(data.length);
            for (const key in data) {
                res[key] = await type.fromModel(data[key]);
            }
            return res;
        },
        async toModel(data) {
            const res = Array(data.length);
            for (const key in data) {
                res[key] = await type.toModel(data[key]);
            }
            return res;
        },
    };
}

module.exports = ArrayType;
