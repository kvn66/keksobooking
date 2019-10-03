'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin--main');

  var createPin = function (dataElement) {
    var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + dataElement.location.x + 'px; top: ' + dataElement.location.y + 'px;';
    pinElement.querySelector('img').src = dataElement.author.avatar;
    pinElement.querySelector('img').alt = dataElement.offer.title;

    return pinElement;
  };

  var createPins = function (dataArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataArray.length; i++) {
      fragment.appendChild(createPin(dataArray[i]));
    }
    return fragment;
  };

  window.pin = {
    mapPin: mapPin,
    createPins: createPins
  };
})();
