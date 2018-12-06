const endPoint = `${apiUrl.domain}:${apiUrl.port}${apiUrl.resource}`;
class Parcel {
  getAllParcel() {
    const apiKey = localStorage.getItem('apiKey');

    return HttpRequest.getWithHeader(`${endPoint}/parcels/`, apiKey)
      .then(result => result);
  }

  getUserId() {
    const userData = JSON.parse(localStorage.getItem('data'));
    const userId = userData.id;
    return userId;
  }

  getAllParcelByUser() {
    const userId = this.getUserId();
    const apiKey = localStorage.getItem('apiKey');
    console.log(apiKey);

    return HttpRequest.getWithHeader(`${endPoint}/users/${userId}/parcels/`, apiKey)
      .then(result => result);
  }

  countParcelByUser() {
    const apiKey = localStorage.getItem('apiKey');

    return HttpRequest.getWithHeader(`${endPoint}/users/parcels/count`, apiKey)
      .then(result => result);
  }
}
