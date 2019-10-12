'use strict';

(function () {
  var type = document.querySelector('#housing-type');

  var filterTypes = window.map.receivedData.filter(function (object) {
    return object.offer.type === 'house';
  });
  // console.log(filterTypes);

  type.addEventListener('change', function () {
    window.map.showPins(filterTypes);
    // console.log(filterTypes);
  });

})();

/*
Выводить на карту не более 5 меток. Установка фильтра по количеству должна происходить сразу после получения данных с сервера;
Запрограммировать фильтр «Тип жилья». Помните, независимо от того сколько объявлений соответствует фильтру «Тип жилья» на карте не должно отображаться больше 5 объявлений.
*/
