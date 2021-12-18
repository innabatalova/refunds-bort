$(document).ready(function () {
  const orderNumber = document.getElementById("orderNumber");

  $(document).on("change click keyup", () => {
    const order = {
      number: orderNumber.value,
    };

    localStorage.setItem("order", JSON.stringify(order)); //сохранение данных в локальном хранилище браузера
  });

  function makeRequest(url) {
    $(".refunds-search__loading").show();
    $(".refunds-search").hide();
    $.get("https://jsonplaceholder.typicode.com/users", function (data) {
      setTimeout(function () {
        data.forEach((item) => {
          const ordering = JSON.parse(localStorage.getItem("order"));

          if (ordering.number == item.id) {
            setTimeout(function () {
              setTimeout(function () {
                $(".refunds-search__loading").hide();
                $(".refunds-autorization-mail").show();
              }, 900);
              $(".refunds-autorization-refusal").hide();
              $(".refunds-search__loading").show();
            }, 0);
          } else {
            $(".refunds-search__loading").hide();
            $(".refunds-autorization-refusal").show();
          }
        });
      }, 500);
    }).fail(function () {
      setTimeout(function () {
        $(".refunds-search__loading").hide();
        alert("Произошла ошибка, попробуйте еще раз");
        $(".refunds-search").show();
      }, 900);
    });
  }

  $(".refunds-search__form").submit(function (e) {
    e.preventDefault();
    makeRequest();
  });

  //перелинковка полей подтверждения аккаунта
  $(".refunds-autorization__link__mail").click(function () {
    $(".refunds-autorization-mail").hide();
    $(".refunds-search__loading").show();

    setTimeout(function () {
      $(".refunds-search__loading").hide();
      $(".refunds-autorization-phone").show();
    }, 500);
  });

  $(".refunds-autorization__link__phone").click(function (e) {
    $(".refunds-autorization-phone").hide();
    $(".refunds-search__loading").show();

    setTimeout(function () {
      $(".refunds-search__loading").hide();
      $(".refunds-autorization-mail").show();
    }, 500);
  });
});
