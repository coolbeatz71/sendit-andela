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

    return HttpRequest.post(`${endPoint}/user/signUp`, userInfo)
      .then((result) => {
        if (!result.body.error) {
          localStorage.setItem('apiKey', result.body.data.token);
          localStorage.setItem('data', JSON.stringify(result.body.data));
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

    return HttpRequest.post(`${endPoint}/user/signIn`, userInfo)
      .then((result) => {
        if (!result.body.error) {
          localStorage.setItem('apiKey', result.body.data.token);
          localStorage.setItem('data', JSON.stringify(result.body.data));
          return result;
        }
        return result;
      });
  }
}
