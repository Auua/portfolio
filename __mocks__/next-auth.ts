export const checkUser = jest.fn();

const userMock = { id: 1, username: 'testuser' };

checkUser.mockImplementation(async (username, password) => {
  // Mock your user authentication logic here
  if (username === 'testuser' && password === 'testpassword') {
    return userMock;
  } else {
    return null;
  }
});

type Credentials = {
  username: string;
  password: string;
};

export default {
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text', placeholder: 'username' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async (credentials: Credentials) => {
    if (!credentials) throw new Error('Credentials are needed for login');
    const user = await checkUser(credentials?.username, credentials?.password);
    if (user) {
      return user;
    }
    return null;
  },
};
