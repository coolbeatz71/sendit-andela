const endPoint = `${apiUrl.domain}${apiUrl.resource}`;
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

  createParcel(parcelName, description, pickupLocation, destination, weight) {
    const parcelInfo = {
      parcelName,
      description,
      pickupLocation,
      destination,
      weight,
    };

    const apiKey = localStorage.getItem('apiKey');

    return HttpRequest.postWithHeader(`${endPoint}/parcels`, parcelInfo, apiKey)
      .then(result => result);
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

  countParcelByAdmin() {
    const apiKey = localStorage.getItem('apiKey');

    return HttpRequest.getWithHeader(`${endPoint}/admin/parcels/count`, apiKey)
      .then(result => result);
  }
}
