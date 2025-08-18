import api from './axiosConfig';  // axios instance with withCredentials:true

export async function loginUser(username, password) {
  // Step 1: get CSRF cookie
  await api.get('/csrf-cookie/');

  // Step 2: get CSRF token from cookies (using js-cookie for example)
  const csrfToken = Cookies.get('csrftoken');

  // Step 3: POST login with CSRF token header
  const response = await api.post('/login/', {
    username,
    password
  }, {
    headers: {
      'X-CSRFToken': csrfToken,
    }
  });

  return response.data;
}
