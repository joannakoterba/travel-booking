$(document).ready(function () {
  $('select').not('.without-search').select2();
  $('select.without-search').select2({
    minimumResultsForSearch: -1
  });

  var templateOffer = null;
  var offerData = [];
  var itemsPerPage = 4;

  $.get("templates/temp_offer.html", function (data) {
    templateOffer = data;
  });

  $.getJSON("data/offer.json", function (dataJson) {
    offerData = dataJson;
    $('#pagination').twbsPagination({
      totalPages: Math.ceil(offerData.length / itemsPerPage),
      visiblePages: 5,
      prev: "&laquo",
      next: "&raquo",
      onPageClick: function (event, page) {
        var data = offerData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        var renderOffer = Mustache.render(templateOffer, {result: data});
        $(".offers-list").html(renderOffer);
      }
    });
  });

  // Filtering
  $(".form-search").submit(function (e) {
    e.preventDefault();
    filterAndSort(offerData, templateOffer, itemsPerPage);
  });

  // Sorting
  $(".select-sort").change(function () {
    filterAndSort(offerData, templateOffer, itemsPerPage);
  });
});
