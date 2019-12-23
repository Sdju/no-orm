function genConnectionString(params) {
    let query = 'mongodb://';
    if ((params.name !== void 0) && (params.pwd !== void 0)) {
        query += `${params.name}:${params.pwd}@`;
    }
    query += `${params.ip}:${params.port || '27017'}/${params.dbName}?`;
    if (params.authMode !== void 0)
        query += `authMode=${params.authMode}`;
    if (params.authSource !== void 0)
        query += `authSource=${params.authSource}`;
    return query;
}

module.exports = {
  genConnectionString,
};
