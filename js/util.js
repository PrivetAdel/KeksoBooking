'use strict';

(function () {
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
  var shuffle = function (array) {
    var j;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };

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
  var getFeaturesPic = function (array) {
    var fragmentFeatures = document.createDocumentFragment();
    var featuresPic = document.createElement('li');
    for (var i = 0; i < array.length; i++) {
      var pic = featuresPic.cloneNode(true);
      pic.classList.add('popup__feature');
      pic.classList.add('popup__feature--' + array[i]);
      fragmentFeatures.appendChild(pic);
    }
    return fragmentFeatures;
  };

  //  Фотографии в карточке
  var getPhotos = function (array) {
    var fragmentPhotos = document.createDocumentFragment();
    var photos = document.createElement('img');
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

  window.util = {
    escKeycode: ESC_KEYCODE,
    enterKeycode: ENTER_KEYCODE,
    positionYMin: POSITION_Y_MIN,
    positionYMax: POSITION_Y_MAX,
    pinWidth: PIN_WIDTH,
    pinHeight: PIN_HEIGHT,
    photoWidth: PHOTO_WIDTH,
    photoHeight: PHOTO_HEIGHT,
    mainPinWidth: MAIN_PIN_WIDTH,
    mainPinHeight: MAIN_PIN_HEIGHT,
    mainPinActiveHeight: MAIN_PIN_ACTIVE_HEIGHT,

    typesArray: TYPES,
    featuresArray: FEATURES,
    photosArray: PHOTOS,
    roomsArray: ROOMS,
    guestsArray: GUESTS,

    shuffle: shuffle,
    getRandomPrefix: getRandomPrefix,
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    getTranslateTypes: getTranslateTypes,
    getFeaturesPic: getFeaturesPic,
    getPhotos: getPhotos,
    connectNounAndNumbers: connectNounAndNumbers,
  };
})();
