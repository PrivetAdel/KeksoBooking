'use strict';

(function () {
  //  Находим координаты метки и подставляем их в поле Адрес
  var mapPinMain = document.querySelector('.map__pin--main');
  //  Координата по Х
  var mapPinMainPositionX = Math.round(mapPinMain.offsetLeft + (window.util.mainPinWidth / 2));
  //  Координата по Y деактивное состояние
  var mapPinMainPositionY = Math.round(mapPinMain.offsetTop + (window.util.mainPinHeight / 2));
  //  Координата по Y активное состояние
  var mapPinMainActivePositionY = Math.round(mapPinMain.offsetTop + window.util.mainPinActiveHeight);

  //  Определение координат метки в деактивном состоянии
  var addressInput = document.querySelector('input[name = address]');
  addressInput.removeAttribute('value');
  addressInput.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;

  //  Функция определения координат метки в активном состоянии
  var onAddressActive = function () {
    addressInput.value = mapPinMainPositionX + ', ' + mapPinMainActivePositionY;
  };

  //  Добавляем через DOM-операции fieldset атрибут disabled
  var fieldset = document.querySelectorAll('fieldset');
  for (var l = 0; l < fieldset.length; l++) {
    fieldset[l].setAttribute('disabled', '');
  }

  //  Функция активации страници
  var mapPins = document.querySelectorAll('.map__pin');
  var onPageActive = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    for (var p = 0; p < mapPins.length; p++) {
      mapPins[p].classList.remove('hidden');
    }
    for (var t = 0; t < fieldset.length; t++) {
      fieldset[t].removeAttribute('disabled');
    }
  };

  //  Функция деактивации страницы
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var onPageDisabled = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    for (var p = 0; p < pins.length; p++) {
      pins[p].classList.add('hidden');
    }
    mapPinMain.classList.remove('hidden');
    for (var t = 0; t < fieldset.length; t++) {
      fieldset[t].setAttribute('disabled', '');
    }
  };

  //  Обработчик активации страницы по клику
  mapPinMain.addEventListener('mousedown', function () {
    onPageActive();
    onAddressActive();
  });

  //  Обработчик активации страницы по Enter
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      onPageActive();
      onAddressActive();
    }
  });

  //  3.1. Валидация для заголовка
  var titleInput = document.querySelector('input[name="title"]');
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Минимальная длина заголовка — 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Максимальная длина заголовка — 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  //  В этом задании мы запрограммируем сценарий установки соответствия количества гостей с количеством комнат
  var roomsSelect = document.querySelector('select[name="rooms"]');
  var capacitySelect = document.querySelector('select[name="capacity"]');
  roomsSelect.addEventListener('change', function () {
    if (roomsSelect.value === '1') {
      capacitySelect[0].setAttribute('disabled', '');
      capacitySelect[1].setAttribute('disabled', '');
      capacitySelect[2].removeAttribute('disabled', '');
      capacitySelect[3].setAttribute('disabled', '');
    }
    if (roomsSelect.value === '2') {
      capacitySelect[0].setAttribute('disabled', '');
      capacitySelect[1].removeAttribute('disabled', '');
      capacitySelect[2].removeAttribute('disabled', '');
      capacitySelect[3].setAttribute('disabled', '');
    }
    if (roomsSelect.value === '3') {
      capacitySelect[0].removeAttribute('disabled', '');
      capacitySelect[1].removeAttribute('disabled', '');
      capacitySelect[2].removeAttribute('disabled', '');
      capacitySelect[3].setAttribute('disabled', '');
    }
    if (roomsSelect.value === '100') {
      capacitySelect[0].setAttribute('disabled', '');
      capacitySelect[1].setAttribute('disabled', '');
      capacitySelect[2].setAttribute('disabled', '');
      capacitySelect[3].removeAttribute('disabled', '');
      capacitySelect[3].setAttribute('selected', '');
      capacitySelect[2].removeAttribute('selected', '');
    }
  });

  //  3.3. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
  var type = document.querySelector('select[name="type"]');
  var priceInput = document.querySelector('input[name="price"]');
  type.addEventListener('change', function () {
    if (type.value === 'bungalo') {
      priceInput.setAttribute('min', 0);
      priceInput.placeholder = 0;
    } else if (type.value === 'flat') {
      priceInput.setAttribute('min', 1000);
      priceInput.placeholder = 1000;
    } else if (type.value === 'house') {
      priceInput.setAttribute('min', 5000);
      priceInput.placeholder = 5000;
    } else if (type.value === 'palace') {
      priceInput.setAttribute('min', 10000);
      priceInput.placeholder = 10000;
    }
  });

  //  3.2. Валидация цены за ночь:
  priceInput.addEventListener('invalid', function () {
    if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Максимальная цена за ночь — 1 000 000 руб.');
    } else if (priceInput.validity.rangeUnderflow) {
      if (type.value === 'bungalo') {
        priceInput.setCustomValidity('Минимальная цена за ночь в бунгало 0 руб.');
      } else if (type.value === 'flat') {
        priceInput.setCustomValidity('Минимальная цена за ночь в квартире 1 000 руб.');
      } else if (type.value === 'house') {
        priceInput.setCustomValidity('Минимальная цена за ночь в доме 5 000 руб.');
      } else if (type.value === 'palace') {
        priceInput.setCustomValidity('Минимальная цена за ночь во дворце 10 000 руб.');
      } else {
        priceInput.setCustomValidity('');
      }
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    } else {
      priceInput.setCustomValidity('');
    }
  });

  //  3.5. Поля «Время заезда» и «Время выезда» синхронизированы.
  var timeIn = document.querySelector('select[name="timein"]');
  var timeOut = document.querySelector('select[name="timeout"]');
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  //  Обработчик клика по кнопке "очистить"
  var formReset = document.querySelector('.ad-form__reset');
  var map = document.querySelector('.map');
  //  var onFormResetClick =
  formReset.addEventListener('click', function () {
    onPageDisabled();
    document.querySelector('.ad-form').reset();
    document.querySelector('.map__filters').reset();
    priceInput.placeholder = 1000;
    capacitySelect[2].setAttribute('selected', '');
    capacitySelect[2].removeAttribute('disabled', '');
    capacitySelect[3].removeAttribute('selected', '');
    capacitySelect[3].setAttribute('disabled', '');
    map.removeChild(document.querySelector('article'));
  //  метки похожих объявлений и карточка активного объявления удаляются;
  //  метка адреса возвращается в исходное положение;
  //  значение поля адреса корректируется соответственно положению метки;
  });
})();
