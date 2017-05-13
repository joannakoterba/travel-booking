function sortByName (a,b) {

  if (a.destination < b.destination) {
    return -1;
  }

  if (a.destination > b.destination) {
    return 1;
  }

  return 0;
}

function sortByPrice (a,b) {

  if (a.price < b.price) {
    return -1;
  }

  if (a.price > b.price) {
    return 1;
  }

  return 0;
}

function filterAndSort (offerData, template, itemsPerPage) {
  var filterData = offerData;
  var destinationInput = $("#inputDestination").val().toLowerCase();
  var depValue = $("#departureInput").val();
  var arrValue = $("#arrivalInput").val();
  var departureInput = moment($("#departureInput").val(), "D.M.Y");
  var arrivalInput = moment($("#arrivalInput").val(), "D.M.Y");
  var minPrice = $("#min-price").val();
  var maxPrice = $("#max-price").val();
  var travellingCheck = $('input[name="travelling"]');
  var restCheck = $('input[name="rest"]');
  var value = $(".select-sort").val();

  if (destinationInput) {
    filterData = filterData.filter(function (value) {
      var filterValue = value.destination.toLowerCase();
      return filterValue.indexOf(destinationInput) != -1;
    });
  }

  if (arrValue) {
    filterData = filterData.filter(function (value) {
      var filterArrValue = moment((value.arrival), "D.M.Y");
      return filterArrValue.isBefore(arrivalInput);
    });
  }

  if (depValue) {
    filterData = filterData.filter(function (value) {
      var filterDepValue = moment((value.departure), "D.M.Y");
      return filterDepValue.isAfter(departureInput);
    });
  }

  if (minPrice) {
    filterData = filterData.filter(function (value) {
      return value.price >= minPrice;
    });
  }

  if (maxPrice) {
    filterData = filterData.filter(function (value) {
      return value.price <= maxPrice;
    });
  }

  if (travellingCheck.is(':checked')) {
    filterData = filterData.filter(function (value) {
      return value.categories.indexOf("objazdowe") != -1;
    });
  }

  if (restCheck.is(':checked')) {
    filterData = filterData.filter(function (value) {
      return value.categories.indexOf("wypoczynek") != -1;
    });
  }

  // Sort
  if (value == "name") {
    filterData = filterData.sort(sortByName);
  }

  if (value == "price") {
    filterData = filterData.sort(sortByPrice);
  }

  $("#pagination").twbsPagination('destroy');
  $('#pagination').twbsPagination({
    totalPages: Math.ceil(filterData.length / itemsPerPage),
    visiblePages: 5,
    prev: "&laquo",
    next: "&raquo",
    onPageClick: function (event, page) {
      var data = filterData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      var renderOffer = Mustache.render(template, {result: data});
      $(".offers-list").html(renderOffer);
    }
  });

  // var renderOffer = Mustache.render(template, {result: filterData});
  // $(".offers-list").html(renderOffer);
}