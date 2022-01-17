const data = () => {
  //маска ввода серии паспорта
  $("#series").mask("99 99", { autoclear: false, placeholder: "*" });

  //маска ввода номера паспорта
  $("#number").mask("99 99 99", { autoclear: false, placeholder: "*" });

  //маска ввода БИК
  $("#BIK").mask("049999999", { autoclear: false, placeholder: "*" });

  //маска ввода корр. счета
  $("#corr").mask("30199999999999999999", {
    autoclear: false,
    placeholder: "*",
  });

  //маска ввода лицевого счета
  $("#person").mask("99999999999999999999", {
    autoclear: false,
    placeholder: "*",
  });

  //маска ввода номера телефона
  $("#phone").mask("+7 (999) 999 99 99", {
    autoclear: false,
    placeholder: "-",
  });

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

  $(document).on("change click keyup", () => {
    let dateDraft = new Date();

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
      day: dateDraft.getDate(),
      month: dateDraft.getMonth(),
      year: dateDraft.getFullYear(),
    };

    localStorage.setItem("draft", JSON.stringify(draft)); //сохранение данных в локальном хранилище браузера
  });

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
};

data();
