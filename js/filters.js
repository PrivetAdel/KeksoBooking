'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var housingType = filtersContainer.querySelector('#housing-type');

  housingType.addEventListener('change', function () {
    window.form.removePins();
    window.form.removePopupCards();
    if (housingType.value !== 'any') {
      var filterType = window.map.receivedData.filter(function (object) {
        return object.offer.type === housingType.value;
      });
      window.map.showPins(filterType);
    } else {
      window.map.showPins(window.map.receivedData);
    }
  });

})();
