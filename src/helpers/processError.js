export const processError = (errorCode) => {
  let error = '';

  switch (errorCode) {
      case 401:
        error = 'Incorrect password.';
        break;
      case 402:
        error = 'User already exists. Try with another name.';
        break;
      case 404:
        error = 'Sorry. We cannot find any user with this name.';
        break;
      case 421:
        error = 'Place Name is required.';
        break;   
      case 422:
        error = 'Place Location (urban-countryside) is required.';
        break;  
      case 423:
        error = 'Place Description is required.';
        break;   
      case 424:
        error = 'Place Location (indoors-outdoors) is required.';
        break;  
      case 425:
        error = 'Place Price (free-paid) is required.';
        break;
      case 426:
        error = 'At least 1 image is required';
        break;
      case 427:
        error = 'Select a point in the map to geolocate the place.';
        break;
      case 428:
        error = 'Place Name already exists. Please choose another Name.';
        break;
      default:
        error = 'Ups. There was somthing wrong. Try it again please.';
        break;
  }
  return error;  
}