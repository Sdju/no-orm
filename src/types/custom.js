function Custom(fromModel, toModel, toDefault, _linked = false) {
    return {
        name: 'custom',

        fromModel,
        toModel,
        toDefault,
        _linked,
    }
}

module.exports = Custom;
