$(document).ready(function () {
  var templateOffer = null;

  $.get("templates/temp_offer.html", function (data) {
    templateOffer = data;
  });

  $.getJSON("data/offer.json", function (dataJson) {
    
    var renderOffer = Mustache.render(templateOffer, dataJson);
    $(".offer-box").append(renderOffer);
  })
});