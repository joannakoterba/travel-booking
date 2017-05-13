$(document).ready(function () {
  $('select').not('.without-search').select2();
  $('select.without-search').select2({
    minimumResultsForSearch: -1
  });

  var templateOffer = null;
  var offerData = [];

  $.get("templates/temp_offer.html", function (data) {
    templateOffer = data;
  });

  $.getJSON("data/offer.json", function (dataJson) {
    offerData = dataJson;
    var renderOffer = Mustache.render(templateOffer, {result: dataJson});
    $(".offers-list").html(renderOffer);
  });

  // Filtering
  $(".form-search").submit(function (e) {
    e.preventDefault();
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

    var renderOffer = Mustache.render(templateOffer, {result: filterData});
    $(".offers-list").html(renderOffer);
  });

  // $('#pagination').twbsPagination({
  //   totalPages: 10,
  //   visiblePages: 5,
  //   onPageClick: function (event, page) {
  //     var data = offerData.slice((page - 1) * 4, page * 4);
  //     // var renderOffer = Mustache.render(templateOffer, {result: data});
  //     // $(".offers-list").html(renderOffer);
  //   }
  // });


  // Sorting
  $(".select-sort").change(function () {
    var value = $(this).val();
    var sortData = offerData;

    if (value == "name") {
      sortData = sortData.sort(function sortValue(a,b) {

        if (a.destination < b.destination) {
          return -1;
        }

        if (a.destination > b.destination) {
          return 1;
        }

        return 0;
      });
    }

    if (value == "price") {
      sortData = sortData.sort(function sortValue(a,b) {

        if (a.price < b.price) {
          return -1;
        }

        if (a.price > b.price) {
          return 1;
        }

        return 0;

      });
    }
    var renderOffer = Mustache.render(templateOffer, {result: sortData});
    $(".offers-list").html(renderOffer);
  });
});
