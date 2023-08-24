import api from './api'

async function getUser() {
  let user
  try {
    user = await api.get('user/me')
  } catch (error: any) {
    throw new Error('Error fetching user')
  }
  return user
}

async function login(email: string, password: string) {
  let data
  try {
    data = await api.post('user/login', { email, password })
  } catch (error: any) {
    throw new Error('Invalid credentials')
  }
  localStorage.setItem('token', data.token)
  const user = await api.get('user/me')
  return user
}

async function signup(username: string, email: string, password: string) {
  let data
  try {
    data = await api.post('user/signup', { username, email, password })
  } catch (error: any) {
    throw new Error('Invalid credentials')
  }
  localStorage.setItem('token', data.token)
  const user = await api.get('user/me')
  return user
}

function logout() {
  localStorage.clear()
}

const auth = {
  getUser,
  login,
  signup,
  logout
};

export default auth;

