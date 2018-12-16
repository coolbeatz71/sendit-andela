const endPoint = `${apiUrl.domain}${apiUrl.resource}`;
class Parcel {
  /**
   * get the api from localStorage
   * @return string
   */
  getApiKey() {
    const apiKey = localStorage.getItem('apiKey');
    return apiKey;
  }

  /**
   * get the user Id from localStorage
   * @return string
   */
  getUserId() {
    const userData = JSON.parse(localStorage.getItem('data'));
    const userId = userData.id;
    return userId;
  }

  /**
   * send HTTP request to get all parcels
   * @return Promise
   */
  getAllParcel() {
    const apiKey = this.getApiKey();

    return HttpRequest.getWithHeader(`${endPoint}/parcels/`, apiKey)
      .then(result => result);
  }

  /**
   * send HTTP request to create new parcel
   * @param  string parcelName
   * @param  string description
   * @param  string pickupLocation
   * @param  string destination
   * @param  string weight
   * @return Promise
   */
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

  /**
   * send HTTP request to get parcel for a user
   * @return Promise
   */
  getAllParcelByUser() {
    const userId = this.getUserId();
    const apiKey = this.getApiKey();

    return HttpRequest.getWithHeader(`${endPoint}/users/${userId}/parcels/`, apiKey)
      .then(result => result);
  }

  /**
   * get HTTP request to get parcel by ID
   * @param  int parcelId
   * @return Promise
   */
  getParcelById(parcelId) {
    const userId = this.getUserId();
    const apiKey = this.getApiKey();

    return HttpRequest.getWithHeader(`${endPoint}/parcels/${parcelId}`, apiKey)
      .then(result => result);
  }

  /**
   * send HTTP request to count parcels for a user
   * @return Promise
   */
  countParcelByUser() {
    const apiKey = this.getApiKey();

    return HttpRequest.getWithHeader(`${endPoint}/users/parcels/count`, apiKey)
      .then(result => result);
  }

  /**
   * send HTTP request to count parcels for all user
   * @return Promise
   */
  countParcelByAdmin() {
    const apiKey = this.getApiKey();

    return HttpRequest.getWithHeader(`${endPoint}/admin/parcels/count`, apiKey)
      .then(result => result);
  }

  /**
   * send HTTP request to edit parcel destination by user
   * @param  int parcelId
   * @param  string newDestination
   * @return Promise
   */
  editDestination(parcelId, newDestination) {
    const apiKey = this.getApiKey();
    const parcelInfo = {
      destination: newDestination,
    };

    return HttpRequest.putWithHeader(`${endPoint}/parcels/${parcelId}/destination`, parcelInfo, apiKey)
      .then(result => result);
  }

  /**
   * send HTTP request to edit parcel present location by admin
   * @param  int parcelId
   * @param  string presentLocation
   * @return Promise
   */
  editPresentLocation(parcelId, presentLocation) {
    const apiKey = this.getApiKey();
    const parcelInfo = {
      presentLocation,
    };

    return HttpRequest.putWithHeader(`${endPoint}/parcels/${parcelId}/presentLocation`, parcelInfo, apiKey)
      .then(result => result);
  }

  /**
   * send HTTP request to edit parcel status by admin
   * @param  int parcelId
   * @param  string status
   * @return Promise
   */
  editStatus(parcelId, status) {
    const apiKey = this.getApiKey();
    const parcelInfo = {
      status,
    };

    return HttpRequest.putWithHeader(`${endPoint}/parcels/${parcelId}/status`, parcelInfo, apiKey)
      .then(result => result);
  }

  /**
   * send HTTP request to cancel parcel delivery order
   * @param  int parcelId
   * @return promise
   */
  cancelParcel(parcelId) {
    const apiKey = this.getApiKey();

    console.log(apiKey);

    return HttpRequest.putWithHeader(`${endPoint}/parcels/${parcelId}/cancel`, {}, apiKey)
      .then(result => result);
  }
}
