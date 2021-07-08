const randomFn = () => Math.round(Math.random() * 150);
const randomId = randomFn();
module.exports = {
  id: randomId,
  name: `groupd${randomId}`,
  permissions: ['read'],
};
