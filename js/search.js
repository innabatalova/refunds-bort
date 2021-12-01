const search = () => {
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

  //маска ввода номера телефона
  $("#phone")
    .click(function () {
      $(this).setCursorPosition(0);
    })
    .mask("+7 (999) 999 99 99", { autoclear: false, placeholder: "-" });

  $(".product-selection__button").on("click", () => {
    $(".draft-overlay").addClass("draft-overlay__visible");
  });
};

search();
