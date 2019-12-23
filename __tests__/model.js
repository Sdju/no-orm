const connect = require('./__helpers__/connection');
const { NoOrm, Model, Types } = require('../src/index');

beforeAll(async ()=> {
    await connect();
});

class User extends Model {

}
NoOrm.newModel(User, 'users', {
    name: Types.Elementary('noname'),
    authKey: Types.Elementary(''),
    roles: Types.Array(Types.Elementary('')),
    contacts: Types.Object({
        card: Types.Elementary(''),
        phone: Types.Elementary(''),
    }),
});

test('base usage', async ()=> {
    const user = await NoOrm.create(User);
    user.name = 'Zede';
    user.authKey = 'boss';
    user.contacts.phone = '000000000';
    await user.save();

    const userDonloaded = await NoOrm.find(User, {_id: user._id});
    expect(userDonloaded).toEqual(user);
});

test('save', async ()=> {
    const user = await NoOrm.create(User);
    user.name = 'Zede';
    user.authKey = 'boss';
    user.contacts.phone = '000000000';
    await user.save();

    const userDonloaded = await NoOrm.find(User, {_id: user._id});
    expect(userDonloaded).toEqual(user);
});
