const search = () => {
  $(".product-selection__button").on("click", () => {
    $(".draft-overlay").addClass("draft-overlay__visible");
  });
};

search();
