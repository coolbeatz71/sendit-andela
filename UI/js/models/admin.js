let endPoint = `${apiUrl.domain}:${apiUrl.port}${apiUrl.resource}`;
class User {
  signIn(email, password) {
    if (!email || !password) {
      return false;
    } else {
      const adminInfo = {
        email,
        password
      };

      return HttpRequest.post(`${endPoint}/admin/signIn`, adminInfo)
      .then((result) => {
        if(!result.body.error){
          localStorage.setItem('apiKey', result.body.data.token);
          localStorage.setItem('data', JSON.stringify(result.body.data));
          return result;
        }else{
          return result;
        }
      });
    }
  }
}