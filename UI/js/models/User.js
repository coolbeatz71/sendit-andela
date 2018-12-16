const endPoint = `${apiUrl.domain}${apiUrl.resource}`;
class User {
  /**
   * sign Up the user
   * @param  string firstName
   * @param  string lastName
   * @param  string email
   * @param  string password
   * @return object
   */
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

  /**
   * signIn the user to his account
   * @param  string email
   * @param  string password
   * @return object
   */
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
