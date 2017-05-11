$(document).ready(function () {
  // Facebook login
  $("body").on("click", ".btn-fb", function () {
    FB.login(function(response) {
      console.log("test");
      if (response.authResponse) {
        FB.api('/me?fields=id,name,email', function(response) {
          var value = JSON.stringify(response);
          $.cookie("cookieData", value, {expires: 7});
          window.location.href = "http://travelbook.dev/index.html";
        });
      }
    });
  });

  //Register
  var templatePanelLogin = null;
  $.get('templates/temp_panellogin.html', function(data) {
    templatePanelLogin = data;
  });

  $("body").on("click", ".login", function (e) {
    e.preventDefault();
    var renderedPanel = Mustache.render(templatePanelLogin, { login: true });
    $(".panel-login").html(renderedPanel);
  });

  $("body").on("click", ".register", function (e) {
    e.preventDefault();
    var renderedPanel = Mustache.render(templatePanelLogin, { register: true });
    $(".panel-login").html(renderedPanel);
  });
});
