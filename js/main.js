$(document).ready(function () {
  const orderNumber = document.getElementById("orderNumber");
  const stepMail = document.getElementById("stepMail");

  $(document).on("change click keyup", () => {
    let dateDraft = new Date();

    const order = {
      number: orderNumber.value,
      zipcode: stepMail.value,
      day: dateDraft.getDate(),
      month: dateDraft.getMonth(),
      year: dateDraft.getFullYear(),
    };

    localStorage.setItem("order", JSON.stringify(order)); //сохранение номера искомого заказа
  });

  function makeRequest(url) {
    $(".refunds-search__loading").show();
    $(".refunds-search").hide();

    Promise.all([
      $.get("https://jsonplaceholder.typicode.com/users").promise(),
      $.get("https://jsonplaceholder.typicode.com/posts").promise(),
    ])
      .then(function (resultsArray) {
        const arrUsers = resultsArray[0]; //получение массива данных с одного API
        const arrPosts = resultsArray[1]; //получение массива данных с другого API

        const arrSumm = $.merge(arrUsers, arrPosts); //объединение данных API в единый массив

        arrSumm.forEach((item) => {
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
      })
      .catch(function (err) {
        setTimeout(function () {
          $(".refunds-search__loading").hide();
          alert("Произошла ошибка, попробуйте еще раз");
          $(".refunds-search").show();
        }, 900);
      });

    // $.get("https://jsonplaceholder.typicode.com/users", function (data) {
    //   setTimeout(function () {
    //     data.forEach((item) => {
    //       const memory = JSON.parse(localStorage.getItem("order"));

    //       if (memory.number == item.id) {
    //         setTimeout(function () {
    //           setTimeout(function () {
    //             $(".refunds-search__loading").hide();

    //             $(".entered-number").append(
    //               $("<span>", {
    //                 text: "Заказ №" + memory.number + " найден!",
    //               })
    //             );

    //             $(".refunds-autorization-regphone").show();
    //           }, 900);
    //           $(".refunds-search__loading").show();
    //           $(".refunds-autorization-refusal").hide();
    //         }, 0);
    //       } else {
    //         $(".refunds-search__loading").hide();
    //         $(".step-refusal").show();
    //       }
    //     });
    //   }, 500);
    // }).fail(function () {
    //   setTimeout(function () {
    //     $(".refunds-search__loading").hide();
    //     alert("Произошла ошибка, попробуйте еще раз");
    //     $(".refunds-search").show();
    //   }, 900);
    // });
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

    const memory = JSON.parse(localStorage.getItem("order"));

    setTimeout(function () {
      $(".refunds-search__loading").hide();
      $(".entered-number-phone").append(
        $("<span>", {
          text: "Заказ №" + memory.number + " найден!",
        })
      );
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
      const memory = JSON.parse(localStorage.getItem("order"));

      setTimeout(function () {
        $(".refunds-search__loading").hide();
        $(".entered-number-main").append(
          $("<span>", {
            text: "Заказ №" + memory.number + " найден!",
          })
        );

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

  //маска ввода номера телефона
  $("#regphone").mask("+7 (999) 999 99 99", {
    autoclear: false,
    placeholder: "-",
  });

  //сохранение даты заполнения черновика
  function dateDraft() {
    const memory = JSON.parse(localStorage.getItem("order"));

    //преобразование сохраненного значения месяца даты заполнения черновика
    switch (memory.month) {
      case 0:
        memory.month = "01";
        break;

      case 1:
        memory.month = "02";
        break;

      case 2:
        memory.month = "03";
        break;

      case 3:
        memory.month = "04";
        break;

      case 4:
        memory.month = "05";
        break;

      case 5:
        memory.month = "06";
        break;

      case 6:
        memory.month = "07";
        break;

      case 7:
        memory.month = "08";
        break;

      case 8:
        memory.month = "09";
        break;

      case 9:
        memory.month = "10";
        break;

      case 10:
        memory.month = "11";
        break;

      case 11:
        memory.month = "12";
        break;
    }

    $(".draft-overlay__date").append(
      $("<span>", {
        text: memory.day + "." + memory.month + "." + memory.year,
      })
    );
  }

  //открытие черновика, если он есть или перенаправка на страницу возврата
  function checkDraft() {
    if (localStorage.getItem("draft")) {
      $(".draft-overlay").addClass("draft-overlay__visible");
      dateDraft();
    } else {
      setTimeout(function () {
        $(".product-selection").hide();
        $(".refunds-search__loading").show();
        location.href = "data.html";
      }, 700);
    }
  }

  //проверка установки флажка возврата в чекбоксе
  $(".product-selection__button").click(function () {
    if ($(".product-selection__checkbox").prop("checked")) {
      checkDraft();
    } else {
      alert("Выберите товары для возврата!");
    }
  });

  //перенаправка на черновик
  $(".draft-overlay__button").click(function () {
    location.href = "data.html";
  });

  //очистка черновика
  $(".draft-overlay__link").click(function () {
    localStorage.removeItem("draft");
  });
});
