const { NoOrm } = require('../src/index');

test('test connection', async ()=> {
    const dbConfigs = {
        dbName: process.env.DB_NAME || 'testDb',
        name: process.env.DB_USERNAME,
        pwd: process.env.DB_PWD,
        ip: process.env.DB_IP || '127.0.0.1',
        authSource: process.env.DB_AUTHSOURCE,
    };
    await NoOrm.connect(dbConfigs);

    expect(NoOrm.db).not.toBe(null);
});
