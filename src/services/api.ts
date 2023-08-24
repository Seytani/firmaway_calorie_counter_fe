let base_url = process.env.NEXT_PUBLIC_BASE_URL

async function get(path: string) {
  const res = await fetch(`${base_url}/${path}`, {
    method: 'GET',
    headers: getHeaders(),
  })
  return await res.json()
}

async function put(path: string, params: any) {
  const res = await fetch(`${base_url}/${path}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(params),
  })
  return await res.json()
}

async function post(path: string, params: any) {
  const res = await fetch(`${base_url}/${path}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(params),
  })
  return await res.json()
}

async function remove(path: string) {
  const res = await fetch(`${base_url}/${path}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  return await res.json()
}

function getHeaders() {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || ''}`,
  }
  return headers
}

const api = {
  get,
  put,
  post,
  remove
}

export default api
