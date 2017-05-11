$(document).ready(function () {
  var templateLogin = null;
  $.get('templates/temp_login.html', function(data) {
    templateLogin = data;

    var cookieValue = $.cookie("cookieData");
    if(cookieValue) {
      var cookieData = JSON.parse(cookieValue);
      var rendered = Mustache.render(templateLogin, cookieData);
      $(".login").addClass("hidden");
      $(".navbar-collapse").append(rendered);
    }
  });

  $("body").on("click", ".logout", function (e) {
    e.preventDefault();
    $.removeCookie('cookieData');
    $(".logged").addClass("hidden");
    $(".login").removeClass("hidden");
  });
});
