$(document).ready(function () {
  //маска для проверки ввода номера

  // $(".data-user__input__field").mask("+7 (900) 000 00 00", (minlength = 10));+
  //задаете x как любое число
  // $.mask.definitions["x"] = "[0-9]";

  // //устанавливаете саму маску и * вместо подчеркивания
  // $("id").mask("4276-xxxx-xx98-7654", { placeholder: "*" });

  // $.mask.definitions["h"] = "[0-9]";

  //плагин фиксации курсора в начале поля
  $.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };

  //маска ввода серии паспорта
  $("#series")
    .click(function () {
      $(this).setCursorPosition(0);
    })
    .mask("99 99", { autoclear: false, placeholder: "*" });

  //маска ввода номера паспорта
  $("#number")
    .click(function () {
      $(this).setCursorPosition(0);
    })
    .mask("99 99 99", { autoclear: false, placeholder: "*" });

  //маска ввода даты выдачи паспорта
  $("#data")
    .click(function () {
      $(this).setCursorPosition(0);
    })
    .mask("99 99 9999", { autoclear: false });

  //маска ввода БИК
  $("#BIK")
    .click(function () {
      $(this).setCursorPosition(2);
    })
    .mask("049999999", { autoclear: false, placeholder: "*" });

  //маска ввода корр. счета
  $("#corr")
    .click(function () {
      $(this).setCursorPosition(3);
    })
    .mask("30199999999999999999", { autoclear: false, placeholder: "*" });

  //маска ввода лицевого счета
  $("#person")
    .click(function () {
      $(this).setCursorPosition(0);
    })
    .mask("99999999999999999999", { autoclear: false, placeholder: "*" });

  //маска ввода номера телефона
  $("#phone")
    .click(function () {
      $(this).setCursorPosition(0);
    })
    .mask("+7 (999) 999 99 99", { autoclear: false, placeholder: "-" });
});
