'use strict';

//  Константы
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var POSITION_Y_MIN = 130;
var POSITION_Y_MAX = 630;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;
var MAIN_PIN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
var MAIN_PIN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight;
var MAIN_PIN_ACTIVE_HEIGHT = document.querySelector('.map__pin--main').offsetHeight + 22;

//  Мокки
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo',
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var ROOMS = [
  'комната',
  'комнаты',
  'комнат',
];

var GUESTS = [
  'гостя',
  'гостей',
  'гостей',
];

//  Функция перемешивания массива
function shuffle(array) {
  var j;
  var temp;
  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

//  Функция получения массива случайной длины
var getRandomPrefix = function (array) {
  var toPop = getRandomInteger(0, array.length - 1); // определить сколько элементов уберем из копии массива
  var result = shuffle(array.slice()); // скопировать массив
  for (var i = 0; i < toPop; i += 1) {
    result.pop(); //  убрать последний элемент
  }
  return result;
};

// функция рандомного числа от min до max
var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

//  Функция генерации случайного элемента из массива
var getRandomElement = function (array) {
  var index = getRandomInteger(0, array.length - 1);
  return array[index];
};

//  Поиск координаты метки по Х
var positionXMax = document.querySelector('.map').clientWidth;

//  Перевод TYPES
var getTranslateTypes = function (type) {
  var translate;
  if (type === 'palace') {
    translate = 'Дворец';
  } else if (type === 'flat') {
    translate = 'Квартира';
  } else if (type === 'house') {
    translate = 'Дом';
  } else {
    translate = 'Бунгало';
  }
  return translate;
};

// Иконка для features
var fragmentFeatures = document.createDocumentFragment();
var featuresPic = document.createElement('li');
var getFeaturesPic = function (array) {
  for (var i = 0; i < array.length; i++) {
    var pic = featuresPic.cloneNode(true);
    pic.classList.add('popup__feature');
    pic.classList.add('popup__feature--' + array[i]);
    fragmentFeatures.appendChild(pic);
  }
  return fragmentFeatures;
};

//  Фотографии в карточке
var fragmentPhotos = document.createDocumentFragment();
var photos = document.createElement('img');
var getPhotos = function (array) {
  for (var i = 0; i < array.length; i++) {
    var photo = photos.cloneNode(true);
    photo.src = array[i];
    photo.classList.add('popup__photo');
    photo.width = PHOTO_WIDTH;
    photo.height = PHOTO_HEIGHT;
    photo.alt = 'Фотография жилья';
    fragmentPhotos.appendChild(photo);
  }
  return fragmentPhotos;
};

//  Функция согласования существительных и чисел
var connectNounAndNumbers = function (number, array) {
  number = Math.abs(number) % 100;
  var number1 = number % 10;
  if (number > 10 && number < 20) {
    return array[2];
  } else if (number1 > 1 && number1 < 5) {
    return array[1];
  } else if (number1 === 1) {
    return array[0];
  } else {
    return array[2];
  }
};

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
        type: getRandomElement(TYPES),
        rooms: getRandomInteger(1, 5),
        guests: 3,
        checkin: getRandomInteger(12, 14).toString() + ':00',
        checkout: getRandomInteger(12, 14).toString() + ':00',
        features: getRandomPrefix(FEATURES),
        description: 'строка с описанием',
        photos: getRandomPrefix(PHOTOS),
      },

      location: {
        x: getRandomInteger(0, positionXMax) - (PIN_WIDTH / 2),
        y: getRandomInteger(POSITION_Y_MIN, POSITION_Y_MAX) - PIN_HEIGHT,
      }
    });
  }
  return objects;
};
objects = getObjects();

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
  adtElement.querySelector('.popup__type').textContent = getTranslateTypes(object.offer.type);
  adtElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' ' + connectNounAndNumbers(object.offer.rooms, ROOMS) + ' для ' + object.offer.guests + ' ' + connectNounAndNumbers(object.offer.guests, GUESTS);
  adtElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  adtElement.querySelector('.popup__features').innerHTML = '';
  adtElement.querySelector('.popup__features').appendChild(getFeaturesPic(object.offer.features));
  adtElement.querySelector('.popup__description').textContent = object.offer.description;
  adtElement.querySelector('.popup__photos').innerHTML = '';
  adtElement.querySelector('.popup__photos').appendChild(getPhotos(object.offer.photos));
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

map.addEventListener('click', function toggleDone(evt) {
  if (!evt.target.matches('button[type="button"]')) {
    return;
  }
  map.removeChild(document.querySelector('article'));
});

map.addEventListener('keydown', function toggleDone(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (!evt.target.matches('button[type="button"]')) {
      return;
    }
    map.removeChild(document.querySelector('article'));
  }
});

//  Находим координаты метки и подставляем их в поле Адрес
var mapPinMain = document.querySelector('.map__pin--main');
//  Координата по Х
var mapPinMainPositionX = Math.round(mapPinMain.offsetLeft + (MAIN_PIN_WIDTH / 2));
//  Координата по Y деактивное состояние
var mapPinMainPositionY = Math.round(mapPinMain.offsetTop + (MAIN_PIN_HEIGHT / 2));
//  Координата по Y активное состояние
var mapPinMainActivePositionY = Math.round(mapPinMain.offsetTop + MAIN_PIN_ACTIVE_HEIGHT);

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
  if (evt.keyCode === ENTER_KEYCODE) {
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
//  var onFormResetClick =
formReset.addEventListener('click', function () {
  onPageDisabled();
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();
//  метки похожих объявлений и карточка активного объявления удаляются;
//  метка адреса возвращается в исходное положение;
//  значение поля адреса корректируется соответственно положению метки;
});
