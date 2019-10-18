'use strict';

(function () {
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  //  Валидация заголовка
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

  //  Соответствие количества гостей с количеством комнат
  var roomsSelect = document.querySelector('select[name="rooms"]');
  var capacitySelect = document.querySelector('select[name="capacity"]');
  var maxValueMap = {
    '1': 1,
    '2': 2,
    '3': 3,
    '100': 0,
  };
  roomsSelect.addEventListener('change', function () {
    var maxValue = parseInt(maxValueMap[roomsSelect.value], 10);
    if (capacitySelect.value !== maxValue) {
      capacitySelect.value = maxValue;
    }
    if (maxValue === 0) {
      capacitySelect[0].removeAttribute('disabled', '');
      capacitySelect[1].setAttribute('disabled', '');
      capacitySelect[2].setAttribute('disabled', '');
      capacitySelect[3].setAttribute('disabled', '');
    }
    if (maxValue === 1) {
      capacitySelect[0].setAttribute('disabled', '');
      capacitySelect[1].removeAttribute('disabled', '');
      capacitySelect[2].setAttribute('disabled', '');
      capacitySelect[3].setAttribute('disabled', '');
    }
    if (maxValue === 2) {
      capacitySelect[0].setAttribute('disabled', '');
      capacitySelect[1].removeAttribute('disabled', '');
      capacitySelect[2].removeAttribute('disabled', '');
      capacitySelect[3].setAttribute('disabled', '');
    }
    if (maxValue === 3) {
      capacitySelect[0].setAttribute('disabled', '');
      capacitySelect[1].removeAttribute('disabled', '');
      capacitySelect[2].removeAttribute('disabled', '');
      capacitySelect[3].removeAttribute('disabled', '');
    }
  });
  //  Соответствие значения поля «Тип жилья» и минимального значения поля «Цена за ночь»:
  var priceInput = document.querySelector('input[name="price"]');
  var type = document.querySelector('select[name="type"]');
  type.addEventListener('change', function () {
    priceInput.setAttribute('min', window.util.tipeToPrice[type.value]);
    priceInput.placeholder = window.util.tipeToPrice[type.value];
  });

  //  Валидация цены за ночь
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

  //  Синхронизация полей «Время заезда» и «Время выезда»
  var timeIn = document.querySelector('select[name="timein"]');
  var timeOut = document.querySelector('select[name="timeout"]');
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  //  Добавление аватарки
  var avatarChooser = document.querySelector('.ad-form__field input[type="file"]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  avatarChooser.addEventListener('change', function () {
    window.loadFiles.setPicture(avatarChooser, true, avatarPreview);
  });
  //  Добавление фотографий
  var photoChooser = document.querySelector('.ad-form__upload input[type="file"]');
  photoChooser.addEventListener('change', function () {
    var photoPreview = document.createElement('img');
    window.loadFiles.setPicture(photoChooser, false, photoPreview);
    document.querySelector('.ad-form__photo').appendChild(photoPreview);
  });
  //  Удаление аватарки и фотографий
  var resetPicture = function () {
    avatarPreview.src = DEFAULT_AVATAR;
    var photoPreview = document.querySelectorAll('.ad-form__photo img');
    photoPreview.forEach(function (element, i) {
      photoPreview[i].remove();
    });
  };

  //  Функция удаления пинов
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (element, i) {
      pins[i].remove();
    });
  };

  //  Функция закрытия карточек объявления Popup
  var removePopupCards = function () {
    if (map.querySelector('.popup')) {
      map.removeChild(map.querySelector('.popup'));
    }
  };

  //  Функция деактивации страницы
  var map = document.querySelector('.map');
  var pageDisabledHandler = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').reset();
    document.querySelector('.map__filters').reset();
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    removePins();
    removePopupCards();
    resetPicture();
    window.util.mapPinMain.classList.remove('hidden');
    priceInput.placeholder = 1000;
    window.map.setMainPinCoordinates();
    window.map.getDisabledFieldsets();
    window.util.mapPinMain.style.top = window.util.mainPinStartPositionY;
    window.util.mapPinMain.style.left = window.util.mainPinStartPositionX;
    capacitySelect[0].setAttribute('disabled', '');
    capacitySelect[1].removeAttribute('disabled', '');
    capacitySelect[2].setAttribute('disabled', '');
    capacitySelect[3].setAttribute('disabled', '');

  };

  //  Обработчик клика по кнопке "очистить"
  var formReset = document.querySelector('.ad-form__reset');

  formReset.addEventListener('click', pageDisabledHandler);

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

  //  Функция показывающая сообщение об ошибке при отправке формы или при ошибке получения данных с сервера
  var showErrorMessage = function () {
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

  var successHandler = function () {
    pageDisabledHandler();
    showSuccessMessage();
  };

  //  Отправка данных формы на сервер
  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successHandler, showErrorMessage);
  });

  window.form = {
    removePins: removePins,
    removePopupCards: removePopupCards,
    showErrorMessage: showErrorMessage,
  };

})();
