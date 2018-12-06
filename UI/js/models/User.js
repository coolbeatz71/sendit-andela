const endPoint = `${apiUrl.domain}:${apiUrl.port}${apiUrl.resource}`;
class User {
  signUp(firstName, lastName, email, password) {
    if (!firstName || !lastName || !email || !password) {
      return false;
    }
    const userInfo = {
      firstName,
      lastName,
      email,
      password,
    };

    return HttpRequest.post(`${endPoint}/auth/signUp`, userInfo)
      .then((result) => {
        if (result.status === 'success') {
          localStorage.setItem('apiKey', result.user.token);
          localStorage.setItem('data', JSON.stringify(result.user));
          return result;
        }
        return result;
      });
  }

  signIn(email, password) {
    if (!email || !password) {
      return false;
    }
    const userInfo = {
      email,
      password,
    };

    return HttpRequest.post(`${endPoint}/auth/login`, userInfo)
      .then((result) => {
        if (result.status === 'success') {
          localStorage.setItem('apiKey', result.user.token);
          localStorage.setItem('data', JSON.stringify(result.user));
          return result;
        }
        return result;
      });
  }
}
