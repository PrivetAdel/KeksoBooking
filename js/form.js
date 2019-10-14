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

  // var roomsToCapacity = {
  //   '1':
  //   '2':
  //   '3':
  //   '100':
  // };


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

  //  Поля «Время заезда» и «Время выезда» синхронизированы.
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
    //  window.util.addressInput.removeAttribute('value');
    window.util.addressInput.value = window.util.mapPinMainPositionX + ', ' + window.util.mapPinMainPositionY;
    window.util.mapPinMain.style.top = window.util.mainPinStartPositionY;
    window.util.mapPinMain.style.left = window.util.mainPinStartPositionX;
  };

  formReset.addEventListener('click', function () {
    onFormResetClick();
  });

  //  Закрытие сообщения об успешной отправке формы или об ошибке
  var closeMessage = function (message) {
    message.remove();
  };

  //  Функция показывающая сообщение об успешной отправке формы
  var showSuccessMessage = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessageElement = successMessageTemplate.cloneNode(true);

    document.querySelector('main').insertAdjacentElement('afterbegin', successMessageElement);

    var successMessage = document.querySelector('.success');
    successMessage.addEventListener('click', function () {
      closeMessage(successMessage);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.escKeycode) {
        closeMessage(successMessage);
        evt.preventDefault();
      }
    });
  };

  //  Функция показывающая сообщение об ошибке при отправке формы
  window.showErrorMessage = function () {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessageElement = errorMessageTemplate.cloneNode(true);

    document.querySelector('main').insertAdjacentElement('afterbegin', errorMessageElement);

    var errorMessage = document.querySelector('.error');
    errorMessage.addEventListener('click', function () {
      closeMessage(errorMessage);
    });

    errorMessage.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.escKeycode) {
        closeMessage(errorMessage);
        evt.preventDefault();
      }
    });
  };

  //  Отправка данных формы на сервер
  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.save(new FormData(form), function () {
      onFormResetClick();
      showSuccessMessage();
    }, window.showErrorMessage);
  });

})();
