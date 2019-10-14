'use strict';

(function () {
  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapFilters = filtersContainer.querySelector('.map__filters');
  var housingType = filtersContainer.querySelector('#housing-type');
  var housingPrice = filtersContainer.querySelector('#housing-price');
  var housingRooms = filtersContainer.querySelector('#housing-rooms');
  var housingGuests = filtersContainer.querySelector('#housing-guests');
  var housingFeatures = filtersContainer.querySelector('#housing-features');

  var filterType = function (object) {
    return (housingType.value === 'any') ? true : object.offer.type === housingType.value;
  };

  var filterRooms = function (object) {
    return (housingRooms.value === 'any') ? true : object.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var filterGuests = function (object) {
    return (housingGuests.value === 'any') ? true : object.offer.guests === parseInt(housingGuests.value, 10);
  };

  var filterPrice = function (object) {
    switch (housingPrice.value) {
      case 'low':
        return (object.offer.price < MIN_PRICE);
      case 'middle':
        return ((object.offer.price >= MIN_PRICE) && (object.offer.price <= MAX_PRICE));
      case 'high':
        return (object.offer.price > MAX_PRICE);
      default:
        return true;
    }
  };

  var filterCheckedFeatures = function () {
    var checkedFeatures = [];
    Array.from(housingFeatures.elements).forEach(function (checkbox) {
      if (checkbox.checked) {
        checkedFeatures.push(checkbox.value);
      }
    });
    return checkedFeatures;
  };

  var contains = function (where, what) {
    for (var i = 0; i < what.length; i++) {
      if (where.indexOf(what[i]) < 0) {
        return false;
      }
    }
    return true;
  };

  var filterCheckbox = function (object) {
    var checkedFeatures = filterCheckedFeatures();
    return contains(object.offer.features, checkedFeatures);
  };

  var allFilters = function () {
    return window.map.receivedData
    .filter(filterType)
    .filter(filterRooms)
    .filter(filterGuests)
    .filter(filterPrice)
    .filter(filterCheckbox);
  };

  var getFilters = function () {
    window.form.removePins();
    window.form.removePopupCards();
    window.debounce(window.map.showPins(allFilters()));
  };

  mapFilters.addEventListener('change', getFilters);

})();
