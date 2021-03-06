'use strict';

window.card = (function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  var createCardFeatures = function (dataElement) {
    var ul = document.createElement('ul');
    ul.classList.add('popup__features');

    for (var i = 0; i < dataElement.offer.features.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + dataElement.offer.features[i]);
      ul.append(li);
    }

    return ul;
  };

  var createCardPhotos = function (cardElement, dataElement, width, height) {
    var popupPhotos = cardElement.querySelector('.popup__photos');
    popupPhotos.removeChild(cardElement.querySelector('.popup__photo'));

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataElement.offer.photos.length; i++) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = dataElement.offer.photos[i];
      img.width = width;
      img.height = height;
      img.alt = 'Фотография жилья';
      fragment.appendChild(img);
    }
    popupPhotos.appendChild(fragment);
  };

  var createCard = function (dataArray, index) {
    var TypeConverter = {
      FLAT: 'Квартира',
      BUNGALO: 'Бунгало',
      HOUSE: 'Дом',
      PALACE: 'Дворец'
    };

    var similarCardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
    var cardElement = similarCardTemplate.cloneNode(true);

    var dataElement = dataArray[index];
    cardElement.querySelector('.popup__title').textContent = dataElement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = dataElement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = dataElement.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TypeConverter[dataElement.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = dataElement.offer.rooms + ' комнаты для ' + dataElement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataElement.offer.checkin + ', выезд до ' + dataElement.offer.checkout;
    cardElement.replaceChild(createCardFeatures(dataElement), cardElement.querySelector('.popup__features'));
    cardElement.querySelector('.popup__description').textContent = dataElement.offer.description;
    cardElement.querySelector('.popup__avatar').src = dataElement.author.avatar;
    createCardPhotos(cardElement, dataElement, PHOTO_WIDTH, PHOTO_HEIGHT);

    return cardElement;
  };

  var insertCard = function (dataArray, index) {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    window.util.map.insertBefore(createCard(dataArray, index), window.filter.container);
  };

  var onPopupEscPress = function (evt) {
    if (evt.which === window.util.ESC_KEYCODE) {
      closeCard();
    }
  };

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card !== null) {
      card.remove();
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openCard = function (pin) {
    insertCard(window.loadData.data, window.pin.searchIndex(window.loadData.data, pin));
    var card = document.querySelector('.map__card');
    var cardCloseButton = card.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', function () {
      closeCard();
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  return {
    open: openCard,
    close: closeCard
  };
})();
