const mysql = require('mysql');
const userDao = require('./userDao');

const mocks = {
  release: jest.fn(),
};

const mockUser = {
  id: 'testUser1',
  firstName: 'First',
  lastName: 'Last',
  password: 'ItsASecret',
  email: 'email@domain.com',
  registerDate: '2019-01-01'
};

// mock the mysql objects being used by userDao
jest.mock('mysql');
mysql.createPool = () => ({
  getConnection: cb => {
    const connection = {
      query: (sql, err, cb) => {
        // we could check the contents of the sql argument and call the callback function with
        // different mock values if we wanted to
        cb(null, [mockUser]);
      },
      release: mocks.release,
    };
    cb(null, connection);
  },
});

describe('userDao', () => {
  it('Retrieves a list of users', () => {
    return userDao.getUsers()
      .then(results => {
        expect(results.length).toBe(1);
        expect(results[0]).toEqual(mockUser);
        expect(mocks.release).toHaveBeenCalledTimes(1);
      });
  });

  it('Retrieves a single user', () => {
    return userDao.getUser('testUser')
      .then(results => {
        expect(results.length).toBe(1);
        expect(results[0]).toEqual(mockUser);
        expect(mocks.release).toHaveBeenCalledTimes(1);
      });
  });
});

afterEach(() => {
  Object.values(mocks).forEach(mock => mock.mockReset());
});
