const overlay = () => {
  const draftOverlayButton = $(".draft-overlay__button");
  const draftOverlayLink = $(".draft-overlay__link");

  $(draftOverlayButton).on("click", () => {
    location.href = "data.html";
  });

  //очистка черновика
  $(draftOverlayLink).on("click", () => {
    localStorage.removeItem("draft");
  });
};

overlay();
