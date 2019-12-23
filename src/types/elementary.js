const f$id = val=>val;
function Elementary(def) {
    return {
        name: 'elementary',

        toDefault: ()=>def,
        fromModel: f$id,
        toModel: f$id,
    };
}

module.exports = Elementary;
