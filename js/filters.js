'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapFilters = filtersContainer.querySelector('.map__filters');
  var housingType = filtersContainer.querySelector('#housing-type');
  var housingPrice = filtersContainer.querySelector('#housing-price');
  var housingRooms = filtersContainer.querySelector('#housing-rooms');
  var housingGuests = filtersContainer.querySelector('#housing-guests');

  var housingFeatures = filtersContainer.querySelector('#housing-features');
  var filterWifi = filtersContainer.querySelector('#filter-wifi');
  var filterDishwasher = filtersContainer.querySelector('#filter-dishwasher');
  var filterParking = filtersContainer.querySelector('#filter-parking');
  var filterWasher = filtersContainer.querySelector('#filter-washer');
  var filterElevator = filtersContainer.querySelector('#filter-elevator');
  var filterConditioner = filtersContainer.querySelector('#filter-conditioner');
  var featuresCheckbox = filtersContainer.querySelectorAll('input[type="checkbox"]');

  var filterType = function (object) {
    return (housingType.value === 'any') ? true : object.offer.type === housingType.value;
  };

  var filterRooms = function (object) {
    return (housingRooms.value === 'any') ? true : object.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var filterGuests = function (object) {
    return (housingGuests.value === 'any') ? true : object.offer.guests === parseInt(housingGuests.value, 10);
  };


  var filterFeaturesChecked = function () {
    var featuresChecked = [];
    featuresCheckbox.forEach(function (checkbox) {
      if (checkbox.checked) {
        featuresChecked.push(checkbox.value)
      }
    });
    return featuresChecked;
  };

  var filterCheckbox = function (object) {
    if (featuresCheckbox.checked) {
      var featuresChecked = filterFeaturesChecked();
      featuresChecked.every(element => object.offer.features.indexOf(element) > 0);
    }
      return true;
  };

  var allFilters = function () {
    return window.map.receivedData.
    filter(filterType).
    filter(filterRooms).
    filter(filterGuests).
    filter(filterCheckbox);
  }

  var getFilters = function () {
    window.form.removePins();
    window.form.removePopupCards();
    window.map.showPins(allFilters());

    console.log(allFilters());
    console.log(filterFeaturesChecked());
  };

  mapFilters.addEventListener('change', getFilters);

})();
