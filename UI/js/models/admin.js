const endPoint = `${apiUrl.domain}${apiUrl.resource}`;
class Admin {
  /**
   * sign In the admin
   * @param  string email
   * @param  string password
   * @return object
   */
  signIn(email, password) {
    if (!email || !password) {
      return false;
    }
    const adminInfo = {
      email,
      password,
    };

    return HttpRequest.post(`${endPoint}/admin/login`, adminInfo)
      .then((result) => {
        console.log(result);
        if (result.status === 'success') {
          localStorage.setItem('apiKey', result.user.token);
          localStorage.setItem('data', JSON.stringify(result.user));
          return result;
        }
        return result;
      });
  }
}
