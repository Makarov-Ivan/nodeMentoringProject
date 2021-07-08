const randomFn = () => Math.round(Math.random() * 150);
const randomId = randomFn();
module.exports = {
  id: randomId,
  login: `login${randomId}`,
  password: 'vAlq2qwqwe',
  age: 10,
  isDeleted: false,
};
