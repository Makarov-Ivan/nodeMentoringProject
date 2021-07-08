/* eslint-disable */
const userValidationService = require('../../src/user/services/validation');

describe('users', () => {
  describe('validation service', () => {
    describe('user object', () => {
      it('should return error, if invalid object is passed', async () => {
        const invaliUser = {
          log: 'login',
          index: 10,
          pw: 'invalid',
          age: 0,
        };
        const validationResult = await userValidationService.user(invaliUser);
        expect(validationResult).toMatchSnapshot();
      });
      it('should return undefined, if valid object is passed', async () => {
        const validUser = {
          id: 989,
          login: 'Bormasuk10',
          password: 'vAlq2qwqwe',
          age: 10,
          isDeleted: true,
        };
        const validationResult = await userValidationService.user(validUser);
        expect(validationResult).toBe(undefined);
      });
    });
    describe('querry string', () => {
      it('should return error, if invalid object is passed', async () => {
        const invaliQuerry1 = {
          loginSubstring: 'abd',
        };
        const invaliQuerry2 = {
          limit: 10,
        };
        const invaliQuerry3 = {};
        const validationResult1 = await userValidationService.querry(invaliQuerry1);
        expect(validationResult1).toMatchSnapshot();
        const validationResult2 = await userValidationService.querry(invaliQuerry2);
        expect(validationResult2).toMatchSnapshot();
        const validationResult3 = await userValidationService.querry(invaliQuerry3);
        expect(validationResult3).toMatchSnapshot();
      });
      it('should return undefined, if valid object is passed', async () => {
        const validQuerry = {
          loginSubstring: 'abd',
          limit: 10,
        };
        const validationResult = await userValidationService.querry(validQuerry);
        expect(validationResult).toBe(undefined);
      });
    });
  });
});
