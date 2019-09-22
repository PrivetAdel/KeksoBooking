'use strict';

//  Мокки
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
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
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var POSITION_X_MIN = 0;
var POSITION_X_MAX = 980;
var POSITION_Y_MIN = 130;
var POSITION_Y_MAX = 630;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

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

var cards = [];
for (var i = 0; i < 8; i++) {
  cards[i] = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1).toString() + '.png',
    },

    offer: {
      title: 'заголовок предложения',
      address: '600, 350',
      price: '1000',
      type: getRandomElement(TYPES),
      rooms: getRandomInteger(1, 5),
      guests: '3',
      checkin: (Math.floor(Math.random() * 3 + 12)).toString() + ':00',
      checkout: (Math.floor(Math.random() * 3 + 12)).toString() + ':00',
      features: getRandomPrefix(FEATURES),
      description: 'строка с описанием',
      photos: getRandomPrefix(PHOTOS),
    },

    location: {
      x: getRandomInteger(POSITION_X_MIN, POSITION_X_MAX) - (PIN_WIDTH / 2),
      y: getRandomInteger(POSITION_Y_MIN, POSITION_Y_MAX) - PIN_HEIGHT,
    }
  };
}

//  2. У блока .map уберите класс .map--faded.
document.querySelector('.map').classList.remove('.map--faded');

//  3. На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin

var similarCardsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

for (var j = 0; j < 8; j++) {
  var cardsElement = similarCardsTemplate.cloneNode(true);
  cardsElement.style = 'left: ' + (cards[j].location.x).toString() + 'px; top: ' + (cards[j].location.y).toString() + 'px';
  cardsElement.querySelector('img').src = cards[j].author.avatar;
  cardsElement.querySelector('img').alt = cards[j].offer.title;

  fragment.appendChild(cardsElement);
}

//  Находим блок куда будем добавлять элементы
var similarListElement = document.querySelector('.map__pins');
similarListElement.appendChild(fragment);
