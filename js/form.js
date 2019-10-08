'use strict';

(function () {
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
  var priceInput = document.querySelector('input[name="price"]');
  var type = document.querySelector('select[name="type"]');
  type.addEventListener('change', function () {
    priceInput.setAttribute('min', window.util.priceObject[type.value]);
    priceInput.placeholder = window.util.priceObject[type.value];
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
    } else if (priceInput.validity.typeMismatch) {
      priceInput.setCustomValidity('Введите число');
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

  //  Функция деактивации страницы
  var onPageDisabled = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (element, i) {
      pins[i].classList.add('hidden');
    });
    window.util.fieldsets.forEach(function (element, i) {
      window.util.fieldsets[i].setAttribute('disabled', '');
    });
    window.util.mapPinMain.classList.remove('hidden');
  };

  //  Обработчик клика по кнопке "очистить"
  var formReset = document.querySelector('.ad-form__reset');
  var map = document.querySelector('.map');
  //  var card = map.querySelector('.popup');
  var onFormResetClick = function () {
    onPageDisabled();
    document.querySelector('.ad-form').reset();
    document.querySelector('.map__filters').reset();
    priceInput.placeholder = 1000;
    capacitySelect[2].setAttribute('selected', '');
    capacitySelect[2].removeAttribute('disabled', '');
    capacitySelect[3].removeAttribute('selected', '');
    capacitySelect[3].setAttribute('disabled', '');
    if (map.querySelector('.popup') !== null) {
      map.removeChild(map.querySelector('.popup'));
    }
    window.util.addressInput.removeAttribute('value');
    window.util.addressInput.value = window.util.mapPinMainPositionX + ', ' + window.util.mapPinMainPositionY;
    window.util.mapPinMain.style.top = window.util.mainPinStartPositionY;
    window.util.mapPinMain.style.left = window.util.mainPinStartPositionX;
  };

  formReset.addEventListener('click', function () {
    onFormResetClick();
  });
})();
