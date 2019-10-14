'use strict';

(function () {
  var MAX_VISIBLE_PINS = 5;
  var LOW_PRICE_FILTER = 10000;
  var HIGH_PRICE_FILTER = 50000;

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var filterSelectDefinition = [
    mapFiltersContainer.querySelector('#housing-type'),
    mapFiltersContainer.querySelector('#housing-price'),
    mapFiltersContainer.querySelector('#housing-rooms'),
    mapFiltersContainer.querySelector('#housing-guests')
  ];

  var filterCheckDefinition = [
    mapFiltersContainer.querySelector('#filter-wifi'),
    mapFiltersContainer.querySelector('#filter-dishwasher'),
    mapFiltersContainer.querySelector('#filter-parking'),
    mapFiltersContainer.querySelector('#filter-washer'),
    mapFiltersContainer.querySelector('#filter-elevator'),
    mapFiltersContainer.querySelector('#filter-conditioner')
  ];

  var onFilterChange = window.debounce(function () {
    window.pin.closeCard();
    window.pin.removePins();
    window.pin.insertPins();
  });

  var initFilter = function () {
    filterSelectDefinition.forEach(function (item) {
      item.addEventListener('change', onFilterChange);
    });
    filterCheckDefinition.forEach(function (item) {
      item.addEventListener('change', onFilterChange);
    });
  };

  initFilter();

  var checkFilter = function (item) {
    var out = true;
    filterCheckDefinition.forEach(function (it) {
      if (it.checked) {
        out = out && item.offer.features.includes(it.value);
      }
    });
    return out;
  };

  var priceFilter = function (item) {
    var out = true;
    switch (filterSelectDefinition[1].value) {
      case 'middle':
        out = out && item.offer.price >= LOW_PRICE_FILTER && item.offer.price <= HIGH_PRICE_FILTER;
        break;
      case 'low':
        out = out && item.offer.price < LOW_PRICE_FILTER;
        break;
      case 'high':
        out = out && item.offer.price > HIGH_PRICE_FILTER;
        break;
    }
    return out;
  };

  var filter = function (item) {
    var out = true;
    out = out && (item.offer.type === filterSelectDefinition[0].value || filterSelectDefinition[0].value === 'any');
    out = out && priceFilter(item);
    out = out && (item.offer.rooms.toString() === filterSelectDefinition[2].value || filterSelectDefinition[2].value === 'any');
    out = out && (item.offer.guests.toString() === filterSelectDefinition[3].value || filterSelectDefinition[3].value === 'any');
    out = out && checkFilter(item);
    return out;
  };

  var filterData = function (origData) {
    var data = origData.filter(filter);
    return data.slice(0, MAX_VISIBLE_PINS);
  };

  window.filter = {
    filterData: filterData
  };
})();
