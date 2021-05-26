const { sequelizeClient } = require('../DB_connection/connection');
const { userModule } = require('../src/user/models/user');
const {groupModule} = require('../src/group/models/group');

(async () => {
    console.log('\ncreating DB\n')
    await sequelizeClient.sync({ force: true });
    console.log('\nDB was created\nadding blanc users to DB\n');
    const blancUsers = [
        {
            id: 111,
            login: "userLogin1",
            password: "userPassword1",
            age: 50,
            deleted: false,
        },
        {
            id: 222,
            login: "userLogin2",
            password: "userPassword2",
            age: 50,
            deleted: false,
        },
        {
            id: 333,
            login: "IvanMakarov",
            password: "userPassword3",
            age: 50,
            deleted: false,
        },
        {
            id: 444,
            login: "DmitriiMakarov",
            password: "userPassword3",
            age: 50,
            deleted: false,
        },
        {
            id: 555,
            login: "DmitriiBorisov",
            password: "userPassword3",
            age: 50,
            deleted: false,
        }
    ];
    const blancGroups=[
        {
            id: 1,
            name: 'firstGrop',
            permission:'1st'
        },
        {
            id: 2,
            name: 'secondGrop',
            permission:'2st'
        }
    ]
    blancUsers.forEach(async (blancUser) => { await userModule.create(blancUser) });
    blancGroups.forEach(async (blancGroup) => {await groupModule.create(blancGroup)})
})();