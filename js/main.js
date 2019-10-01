'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var POSITION_Y_MIN = 130;
var POSITION_Y_MAX = 630;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;

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
//  Массив объявлений
var mapCards = [];
//  var mapCard = {};
//  var getMapCards = function () {
  for (var i = 0; i < 8; i++) {
    mapCards[i] = {
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
    };
  }
//  console.log(mapCards);
//  return mapCards;
//  };
//  console.log(mapCards);

//  Пины. Находим шаблон и добавляем его на страницу 8 раз.
var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragmentPins = document.createDocumentFragment();

for (var j = 0; j < 8; j++) {
  var pinsElement = similarPinsTemplate.cloneNode(true);
  pinsElement.style = 'left: ' + (mapCards[j].location.x).toString() + 'px; top: ' + (mapCards[j].location.y).toString() + 'px';
  pinsElement.querySelector('img').src = mapCards[j].author.avatar;
  pinsElement.querySelector('img').alt = mapCards[j].offer.title;

  fragmentPins.appendChild(pinsElement);
}

var similarListElement = document.querySelector('.map__pins');
similarListElement.appendChild(fragmentPins);

//  Карточки объявлений
var adtTemplate = document.querySelector('#card').content.querySelector('.map__card');
var fragmentAdt = document.createDocumentFragment();

//  for (var a = 0; a < mapCards.length; a++) {
var adtElement = adtTemplate.cloneNode(true);
adtElement.querySelector('.popup__title').textContent = mapCards[0].offer.title;
adtElement.querySelector('.popup__text--address').textContent = mapCards[0].offer.address;
adtElement.querySelector('.popup__text--price').textContent = mapCards[0].offer.price + '₽/ночь';
adtElement.querySelector('.popup__type').textContent = getTranslateTypes(mapCards[0].offer.type);
adtElement.querySelector('.popup__text--capacity').textContent = mapCards[0].offer.rooms + ' ' + connectNounAndNumbers(mapCards[0].offer.rooms, ROOMS) + ' для ' + mapCards[0].offer.guests + ' ' + connectNounAndNumbers(mapCards[0].offer.guests, GUESTS);
adtElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCards[0].offer.checkin + ', выезд до ' + mapCards[0].offer.checkout;
adtElement.querySelector('.popup__features').innerHTML = '';
adtElement.querySelector('.popup__features').appendChild(getFeaturesPic(mapCards[0].offer.features));
adtElement.querySelector('.popup__description').textContent = mapCards[0].offer.description;
adtElement.querySelector('.popup__photos').innerHTML = '';
adtElement.querySelector('.popup__photos').appendChild(getPhotos(mapCards[0].offer.photos));
adtElement.querySelector('.popup__avatar').src = mapCards[0].author.avatar;

fragmentAdt.appendChild(adtElement);

var similarAdtElement = document.querySelector('.map');
similarAdtElement.insertBefore(fragmentAdt, document.querySelector('.map__filters-container'));

//  Находим координаты метки и подставляем их в поле Адрес
var MAIN_PIN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
var MAIN_PIN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight;
var MAIN_PIN_ACTIVE_HEIGHT = document.querySelector('.map__pin--main').offsetHeight + 22;
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
var pins = document.querySelectorAll('.map__pin');
var onPageActive = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  for (var p = 0; p < pins.length; p++) {
    pins[p].classList.remove('hidden');
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
//  Может исходные disabled добавить в разметку?
capacitySelect[0].setAttribute('disabled', '');
capacitySelect[1].setAttribute('disabled', '');
capacitySelect[3].setAttribute('disabled', '');
//  Как можно сокрасить этот кусок?
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
//  Может мин и макс добавить в разметку?
priceInput.max = 1000000;
priceInput.setAttribute('min', 1000);
//  Можно ли сократить этот кусок?
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
  } else if (priceInput.validity.typeMismatch) {
    priceInput.setCustomValidity('Введите число');
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

//  Добавьте возможность закрытия карточки с подробной информацией по нажатию клавиши Esc и клике по иконке закрытия;

var card = document.querySelector('.map__card');
var popupClose = card.querySelector('.popup__close');
var pin = document.querySelector('.map__pin:not(.map__pin--main)');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  card.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var openPopup = function () {
  card.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

pin.addEventListener('click', function () {
  openPopup();
});

popupClose.addEventListener('click', function () {
  closePopup();
});

//  Обработчик клика по кнопке "очистить"
var formReset = document.querySelector('.ad-form__reset');
//  var onFormResetClick =
formReset.addEventListener('click', function () {
  onPageDisabled();
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();
  card.classList.add('hidden');
//  метки похожих объявлений и карточка активного объявления удаляются;
//  метка адреса возвращается в исходное положение;
//  значение поля адреса корректируется соответственно положению метки;
});
