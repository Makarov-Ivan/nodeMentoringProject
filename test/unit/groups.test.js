/* eslint-disable */
const userValidationService = require('../../src/group/services/validation');

describe('users', () => {
  describe('validation service', () => {
    describe('group object', () => {
      it('should return error, if invalid object is passed', async () => {
        const invaliGroup = {
          id: 'unknown',
          name: 10,
          permissions: 0,
        };
        const validationResult = await userValidationService.group(invaliGroup);
        expect(validationResult).toMatchSnapshot();
      });
      it('should return undefined, if valid object is passed', async () => {
        const validUser = {
          id: 20,
          name: 'test group',
          permissions: ['read'],
        };
        const validationResult = await userValidationService.group(validUser);
        expect(validationResult).toBe(undefined);
      });
    });
    describe('usersToGroup string', () => {
      it('should return error, if invalid object is passed', async () => {
        const invaliBody1 = {
          usersIds: [],
        };
        const invaliQuerry2 = {};
        const invaliQuerry3 = '150';
        const validationResult1 = await userValidationService.usersToGroup(invaliBody1);
        expect(validationResult1).toMatchSnapshot();
        const validationResult2 = await userValidationService.usersToGroup(invaliQuerry2);
        expect(validationResult2).toMatchSnapshot();
        const validationResult3 = await userValidationService.usersToGroup(invaliQuerry3);
        expect(validationResult3).toMatchSnapshot();
      });
      it('should return undefined, if valid object is passed', async () => {
        const validBody = {
          usersIds: ['150'],
        };
        const validationResult = await userValidationService.usersToGroup(validBody);
        expect(validationResult).toBe(undefined);
      });
    });
  });
});
