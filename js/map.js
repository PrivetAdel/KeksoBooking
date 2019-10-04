'use strict';

(function () {
  //  Поиск координаты метки по Х
  var positionXMax = document.querySelector('.map').clientWidth;
  //  1. Напишите функцию для создания массива из 8 сгенерированных JS объектов
  var objects = [];
  var getObjects = function () {
    for (var i = 0; i < 8; i++) {
      objects.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1).toString() + '.png',
        },

        offer: {
          title: 'заголовок предложения',
          address: '600, 350',
          price: 1000,
          type: window.util.getRandomElement(window.util.typesArray),
          rooms: window.util.getRandomInteger(1, 5),
          guests: 3,
          checkin: window.util.getRandomInteger(12, 14).toString() + ':00',
          checkout: window.util.getRandomInteger(12, 14).toString() + ':00',
          features: window.util.getRandomPrefix(window.util.featuresArray),
          description: 'строка с описанием',
          photos: window.util.getRandomPrefix(window.util.photosArray),
        },

        location: {
          x: window.util.getRandomInteger(0, positionXMax) - (window.util.pinWidth / 2),
          y: window.util.getRandomInteger(window.util.positionYMin, window.util.positionYMax) - window.util.pinHeight,
        }
      });
    }
    return objects;
  };
  getObjects();

  //  Пины. Создаем дом-элемент.
  var getPin = function (object) {
    var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    var pinElement = similarPinsTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (object.location.x).toString() + 'px; top: ' + (object.location.y).toString() + 'px';
    pinElement.querySelector('img').src = object.author.avatar;
    pinElement.querySelector('img').alt = object.offer.title;

    return pinElement;
  };
  //  Находим шаблон и добавляем его на страницу 8 раз.
  var showPins = function () {
    var similarListElement = document.querySelector('.map__pins');
    var fragmentPins = document.createDocumentFragment();

    for (var i = 0; i < objects.length; i++) {
      fragmentPins.appendChild(getPin(objects[i]));
    }
    similarListElement.appendChild(fragmentPins);

    return similarListElement;
  };
  showPins();

  //  Карточки объявлени. Создаем дом-элемент.
  var getAdt = function (object) {
    var adtTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var adtElement = adtTemplate.cloneNode(true);

    adtElement.querySelector('.popup__title').textContent = object.offer.title;
    adtElement.querySelector('.popup__text--address').textContent = object.offer.address;
    adtElement.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
    adtElement.querySelector('.popup__type').textContent = window.util.getTranslateTypes(object.offer.type);
    adtElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' ' + window.util.connectNounAndNumbers(object.offer.rooms, window.util.roomsArray) + ' для ' + object.offer.guests + ' ' + window.util.connectNounAndNumbers(object.offer.guests, window.util.guestsArray);
    adtElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    adtElement.querySelector('.popup__features').innerHTML = '';
    adtElement.querySelector('.popup__features').appendChild(window.util.getFeaturesPic(object.offer.features));
    adtElement.querySelector('.popup__description').textContent = object.offer.description;
    adtElement.querySelector('.popup__photos').innerHTML = '';
    adtElement.querySelector('.popup__photos').appendChild(window.util.getPhotos(object.offer.photos));
    adtElement.querySelector('.popup__avatar').src = object.author.avatar;

    return adtElement;
  };

  var map = document.querySelector('.map');
  var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  var filters = map.querySelector('.map__filters-container');

  /*  Почему не работает такой вариант?
    for (var i = 0; i < objects.length; i++) {
      pins[i].addEventListener('click', function () {
        map.insertBefore(getAdt(objects[i]), filters);
        document.addEventListener('keydown', onPopupEscPress);
      });
    }
  */

  pins[0].addEventListener('click', function () {
    map.insertBefore(getAdt(objects[0]), filters);
  });
  pins[1].addEventListener('click', function () {
    map.insertBefore(getAdt(objects[1]), filters);
  });
  pins[2].addEventListener('click', function () {
    map.insertBefore(getAdt(objects[2]), filters);
  });
  pins[3].addEventListener('click', function () {
    map.insertBefore(getAdt(objects[3]), filters);
  });
  pins[4].addEventListener('click', function () {
    map.insertBefore(getAdt(objects[4]), filters);
  });
  pins[5].addEventListener('click', function () {
    map.insertBefore(getAdt(objects[5]), filters);
  });
  pins[6].addEventListener('click', function () {
    map.insertBefore(getAdt(objects[6]), filters);
  });
  pins[7].addEventListener('click', function () {
    map.insertBefore(getAdt(objects[7]), filters);
  });

  pins[0].addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      map.insertBefore(getAdt(objects[0]), filters);
    }
  });
  pins[1].addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      map.insertBefore(getAdt(objects[1]), filters);
    }
  });
  pins[2].addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      map.insertBefore(getAdt(objects[2]), filters);
    }
  });
  pins[3].addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      map.insertBefore(getAdt(objects[3]), filters);
    }
  });
  pins[4].addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      map.insertBefore(getAdt(objects[4]), filters);
    }
  });
  pins[5].addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      map.insertBefore(getAdt(objects[5]), filters);
    }
  });
  pins[6].addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      map.insertBefore(getAdt(objects[6]), filters);
    }
  });
  pins[7].addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      map.insertBefore(getAdt(objects[7]), filters);
    }
  });

  // Что значит запись function toggleDone(evt)?
  map.addEventListener('click', function toggleDone(evt) {
    if (!evt.target.matches('button[type="button"]')) {
      return;
    }
    map.removeChild(document.querySelector('article'));
  });

  //  Где и как правильно погасить обработчик по Esc?
  map.addEventListener('keydown', function toggleDone(evt) {
    if (evt.keyCode === window.util.escKeycode) {
      if (!evt.target.matches('button[type="button"]')) {
        return;
      }
      map.removeChild(document.querySelector('article'));
    }
  });

  // В этом задании мы решим задачу перемещения главной метки по карте
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      var getMapPinMainTop = function () {
        var mapPinMainTop = mapPinMain.offsetTop - shift.y;
        if (mapPinMainTop > (window.util.positionYMax - window.util.mainPinActiveHeight)) {
          mapPinMainTop = (window.util.positionYMax - window.util.mainPinActiveHeight);
        }
        if (mapPinMainTop < (window.util.positionYMin - window.util.mainPinActiveHeight)) {
          mapPinMainTop = (window.util.positionYMin - window.util.mainPinActiveHeight);
        }
        return mapPinMainTop;
      };

      var getMapPinMainLeft = function () {
        var mapPinMainLeft = mapPinMain.offsetLeft - shift.x;
        if (mapPinMainLeft > (positionXMax - (window.util.mainPinWidth / 2))) {
          mapPinMainLeft = Math.round(positionXMax - (window.util.mainPinWidth / 2));
        }
        if (mapPinMainLeft <= -(window.util.mainPinWidth / 2)) {
          mapPinMainLeft = Math.round(-window.util.mainPinWidth / 2);
        }
        return mapPinMainLeft;
      };


      mapPinMain.style.top = getMapPinMainTop() + 'px';
      mapPinMain.style.left = getMapPinMainLeft() + 'px';

      var getAdress = function () {
        var mapPinMainPositionX = Math.round((mapPinMain.offsetLeft - shift.x) + (window.util.mainPinWidth / 2));
        var mapPinMainPositionY = Math.round((mapPinMain.offsetTop - shift.y) + window.util.mainPinActiveHeight);

        var addressInput = document.querySelector('input[name = address]');
        addressInput.removeAttribute('value');
        addressInput.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;

        return addressInput.value;
      };
      getAdress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      var getAdress = function () {
        var mapPinMainPositionX = Math.round(mapPinMain.offsetLeft + (window.util.mainPinWidth / 2));
        var mapPinMainPositionY = Math.round(mapPinMain.offsetTop + window.util.mainPinActiveHeight);

        var addressInput = document.querySelector('input[name = address]');
        addressInput.removeAttribute('value');
        addressInput.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;

        return addressInput.value;
      };
      getAdress();
      /*
      Учтите, расчёт координат метки и их запись в поле адреса должна дублироваться и в обработчике mouseup, потому что в некоторых случаях пользователь может нажать мышь на метке, но никуда её не переместить. Напишите универсальную функцию расчёта координат, чтобы избавиться от дублирования кода.
      Правильная ли реализация?
      */
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
