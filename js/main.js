$(document).ready(function () {
  const orderNumber = document.getElementById("orderNumber");
  const stepMail = document.getElementById("stepMail");

  $(document).on("change click keyup", () => {
    const order = {
      number: orderNumber.value,
      zipcode: stepMail.value,
    };

    localStorage.setItem("order", JSON.stringify(order)); //сохранение номера искомого заказа
  });

  function makeRequest(url) {
    $(".refunds-search__loading").show();
    $(".refunds-search").hide();
    $.get("https://jsonplaceholder.typicode.com/users", function (data) {
      setTimeout(function () {
        data.forEach((item) => {
          const memory = JSON.parse(localStorage.getItem("order"));

          if (memory.number == item.id) {
            setTimeout(function () {
              setTimeout(function () {
                $(".refunds-search__loading").hide();

                $(".entered-number").append(
                  $("<span>", {
                    text: "Заказ №" + memory.number + " найден!",
                  })
                );

                $(".refunds-autorization-regphone").show();
              }, 900);
              $(".refunds-search__loading").show();
              $(".refunds-autorization-refusal").hide();
            }, 0);
          } else {
            $(".refunds-search__loading").hide();
            $(".step-refusal").show();
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
  //запуск проверки номера заказа с данными о заказе на сервере
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

  //запуск регистрации по номеру телефона
  function regPhone(url) {
    $(".refunds-search__loading").show();
    $(".refunds-autorization-regphone").hide();
    $.get("https://jsonplaceholder.typicode.com/users", function (data) {
      setTimeout(function () {
        $(".refunds-search__loading").hide();
        $(".refunds-autorization-mail").show();
      }, 500);
    }).fail(function () {
      setTimeout(function () {
        $(".refunds-search__loading").hide();
        alert("Произошла ошибка, попробуйте еще раз");
      }, 900);
    });
  }

  $(".step-regphone").submit(function (e) {
    const memory = JSON.parse(localStorage.getItem("order"));
    e.preventDefault();
    regPhone();
  });

  //запуск проверки по коду из смс
  function setCode(url) {
    $(".refunds-search__loading").show();
    $(".refunds-autorization-mail").hide();
    $.get("https://jsonplaceholder.typicode.com/users", function (data) {
      setTimeout(function () {
        data.forEach((item) => {
          const memory = JSON.parse(localStorage.getItem("order"));

          if (memory.zipcode == item.address.zipcode) {
            setTimeout(function () {
              setTimeout(function () {
                $(".refunds-search__loading").hide();
                $(".product-selection").show();
                $(".step-mail").hide();
              }, 900);
            }, 0);
          } else {
            setTimeout(function () {
              $(".refunds-search__loading").hide();
              $(".product-selection").hide();
              $(".step-mail").show();
            }, 900);
            $(".refunds-search__loading").show();
            $(".step-mail").hide();
          }
        });
      }, 500);
    }).fail(function () {
      setTimeout(function () {
        $(".refunds-search__loading").hide();
        alert("Произошла ошибка, попробуйте еще раз");
        $(".step-mail").show();
      }, 900);
    });
  }

  $(".step-mail").submit(function (e) {
    const memory = JSON.parse(localStorage.getItem("order"));

    if (memory.zipcode.length == 10) {
      e.preventDefault();
      setCode();
    }
  });

  //маска ввода номера телефона для регистрации
  $("#phone").mask("+7 (999) 999 99 99", {
    autoclear: false,
    placeholder: "-",
  });

  $(".product-selection__button").on("click", () => {
    $(".draft-overlay").addClass("draft-overlay__visible");
  });

  //маска ввода номера телефона
  $("#regphone").mask("+7 (999) 999 99 99", {
    autoclear: false,
    placeholder: "-",
  });
});
