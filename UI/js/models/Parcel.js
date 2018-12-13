const endPoint = `${apiUrl.domain}${apiUrl.resource}`;
class Parcel {
  getApiKey() {
    const apiKey = localStorage.getItem('apiKey');
    return apiKey;
  }

  getUserId() {
    const userData = JSON.parse(localStorage.getItem('data'));
    const userId = userData.id;
    return userId;
  }

  getAllParcel() {
    const apiKey = this.getApiKey();

    return HttpRequest.getWithHeader(`${endPoint}/parcels/`, apiKey)
      .then(result => result);
  }

  createParcel(parcelName, description, pickupLocation, destination, weight) {
    const parcelInfo = {
      parcelName,
      description,
      pickupLocation,
      destination,
      weight,
    };

    const apiKey = this.getApiKey();

    return HttpRequest.postWithHeader(`${endPoint}/parcels`, parcelInfo, apiKey)
      .then(result => result);
  }

  getAllParcelByUser() {
    const userId = this.getUserId();
    const apiKey = this.getApiKey();

    return HttpRequest.getWithHeader(`${endPoint}/users/${userId}/parcels/`, apiKey)
      .then(result => result);
  }

  getParcelById(parcelId) {
    const userId = this.getUserId();
    const apiKey = this.getApiKey();

    return HttpRequest.getWithHeader(`${endPoint}/parcels/${parcelId}`, apiKey)
      .then(result => result);
  }

  countParcelByUser() {
    const apiKey = this.getApiKey();

    return HttpRequest.getWithHeader(`${endPoint}/users/parcels/count`, apiKey)
      .then(result => result);
  }

  countParcelByAdmin() {
    const apiKey = this.getApiKey();

    return HttpRequest.getWithHeader(`${endPoint}/admin/parcels/count`, apiKey)
      .then(result => result);
  }

  editDestination(parcelId, newDestination) {
    const apiKey = this.getApiKey();
    const parcelInfo = {
      destination: newDestination,
    };

    return HttpRequest.putWithHeader(`${endPoint}/parcels/${parcelId}/destination`, parcelInfo, apiKey)
      .then(result => result);
  }
}
