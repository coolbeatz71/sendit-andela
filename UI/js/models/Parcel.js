let endPoint = `${apiUrl.domain}:${apiUrl.port}${apiUrl.resource}`;
class Parcel {
  getAllParcel(){
    const apiKey = localStorage.getItem('apiKey');

    return HttpRequest.getWithHeader(`${endPoint}/parcels/`, `Bearer ${apiKey}`)
    .then((result) => {
      return result;
    });
  }

  getUserId(){
    const userData = JSON.parse(localStorage.getItem('data'));
    const userId = userData.id;
    return userId;
  }

  getAllParcelByUser(){
    const userId = this.getUserId();
    const apiKey = localStorage.getItem('apiKey');

    return HttpRequest.getWithHeader(`${endPoint}/user/${userId}/parcels/`, `Bearer ${apiKey}`)
    .then((result) => {
      return result;
    });
  }

  countParcelByUser(){
    const apiKey = localStorage.getItem('apiKey');

    return HttpRequest.getWithHeader(`${endPoint}/user/parcels/count`, `Bearer ${apiKey}`)
    .then((result) => {
      return result;
    });
  }
}