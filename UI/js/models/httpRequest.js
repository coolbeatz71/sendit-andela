class HttpRequest {
  /**
   * send a GET http request with Authorization header
   * @param  string url
   * @param  string headerValue
   * @return Promise
   */
  static getWithHeader(url, headerValue) {
    this.url = url;
    this.headerValue = headerValue;

    // return a promise
    return new Promise((resolve, reject) => {
      const request = new Request(this.url, {
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.headerValue}`,
        }),
      });

      fetch(request).then((response) => {
        response.json();
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
   * send a POST http request without Authorization header
   * @param  string url
   * @param  object data
   * @return Promise
   */
  static post(url, data) {
    this.url = url;
    this.data = data;

    // return a promise
    return new Promise((resolve, reject) => {
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      };

      fetch(this.url, options).then((response) => {
        response.json();
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
   * send a POST http request Authorization header
   * @param  string url
   * @param  object data
   * @param  string headerValue
   * @return Promise
   */
  static postWithHeader(url, data, headerValue) {
    this.url = url;
    this.data = data;
    this.headerValue = headerValue;

    // return a promise
    return new Promise((resolve, reject) => {
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.headerValue}`,
        },
        body: JSON.stringify(data),
      };

      fetch(this.url, options).then((response) => {
        response.json();
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
   * send a PUT http request with Authorization header
   * @param  {[type]} url  [description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  static putWithHeader(url, data, headerValue) {
    this.url = url;
    this.data = data;
    this.headerValue = headerValue;

    // return a promise
    return new Promise((resolve, reject) => {
      const options = {
        method: 'put',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.headerValue}`,
        },
        body: JSON.stringify(data),
      };

      fetch(this.url, options).then((response) => {
        response.json();
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
