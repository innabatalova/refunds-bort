$(document).ready(function () {
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

  //сохрание черновика ввода форм
  const seriesInput = document.getElementById("series");
  const numberInput = document.getElementById("number");
  const dataInput = document.getElementById("data");
  const issuedInput = document.getElementById("issued");
  const fullnameInput = document.getElementById("fullname");
  const buydataInput = document.getElementById("buydata");
  const addressInput = document.getElementById("address");
  const bankInput = document.getElementById("bank");
  const BIKInput = document.getElementById("BIK");
  const corrInput = document.getElementById("corr");
  const personInput = document.getElementById("person");
  const draftOverlayLink = $(".draft-overlay__link");

  $(document).on("change click keyup", () => {
    const draft = {
      series: seriesInput.value,
      number: numberInput.value,
      data: dataInput.value,
      issued: issuedInput.value,
      fullname: fullnameInput.value,
      buydata: buydataInput.value,
      address: addressInput.value,
      bank: bankInput.value,
      BIK: BIKInput.value,
      corr: corrInput.value,
      person: personInput.value,
    };

    localStorage.setItem("draft", JSON.stringify(draft)); //сохранение данных в локальном хранилище браузера
  });

  // const fillDraft = (draft) => {
  //   localStorage.getItem("draft", JSON.parse(draft));
  //   seriesInput.textContent = "draft.series";
  //   console.log("testing");
  // };

  // fillDraft();

  if (localStorage.getItem("draft")) {
    const drafter = JSON.parse(localStorage.getItem("draft"));

    seriesInput.value = drafter.series;
    numberInput.value = drafter.number;
    dataInput.value = drafter.data;
    issuedInput.value = drafter.issued;
    fullnameInput.value = drafter.fullname;
    buydataInput.value = drafter.buydata;
    addressInput.value = drafter.address;
    bankInput.value = drafter.bank;
    BIKInput.value = drafter.BIK;
    corrInput.value = drafter.corr;
    personInput.value = drafter.person;
  }

  const draftOverlayButton = $(".draft-overlay__button");

  $(draftOverlayButton).on("click", () => {
    console.log(this);
    // location.href = "data.html";
  });

  //очистка черновика
  $(draftOverlayLink).on("click", () => {
    localStorage.removeItem("draft");
  });
});
