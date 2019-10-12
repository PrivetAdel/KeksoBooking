'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container')
  var housingType = filtersContainer.querySelector('#housing-type');

  //  window.map.receivedData;
  console.log(window.map.receivedData);

  var housingTypeHan = window.map.receivedData.slice(0, 2)
  console.log(housingTypeHan);

  var housingTypeHandler = function () {
    window.map.receivedData.filter(function (object) {
      return object.offer.type === 'flat'
    });
  };
  console.log(housingTypeHandler());


  // var housingTypeHandler = function () {
  //   housingType.addEventListener('change', function () {
  //     window.form.removePins();
  //     if (housingType.value !== 'any') {
  //       var filterType = window.map.receivedData.filter(function (object) {
  //         return object.offer.type === housingType.value;
  //         console.log(filterType);
  //       });
  //       window.map.showPins(filterType);
  //     } else {
  //       window.map.showPins(window.map.receivedData);
  //     }
  //   });
  // };

  window.filters = {
    housingTypeHandler: housingTypeHandler,
  }

})();

/*
Выводить на карту не более 5 меток. Установка фильтра по количеству должна происходить сразу после получения данных с сервера;
Запрограммировать фильтр «Тип жилья». Помните, независимо от того сколько объявлений соответствует фильтру «Тип жилья» на карте не должно отображаться больше 5 объявлений.
*/
