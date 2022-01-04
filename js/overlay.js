const overlay = () => {
  $(".draft-overlay__button").click(function () {
    location.href = "data.html";
  });

  //очистка черновика
  $(".draft-overlay__link").click(function () {
    localStorage.removeItem("draft");
  });
};

overlay();
