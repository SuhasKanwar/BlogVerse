const searchInput = document.querySelector(".search-input");
const blogContainers = document.querySelectorAll(".blog-card-container");

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase().trim();

  blogContainers.forEach((container) => {
    const categoryName = container
      .querySelector(".blog-cover")
      .textContent.toLowerCase();
    const cards = container.querySelectorAll(".card");
    let categoryHasVisibleCards = false;

    cards.forEach((card) => {
      const title = card.querySelector(".blog-head").textContent.toLowerCase();
      const description = card
        .querySelector(".blog-description")
        .textContent.toLowerCase();

      const matchesSearch =
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        categoryName.includes(searchTerm);

      card.closest("a").style.display = matchesSearch ? "block" : "none";

      if (matchesSearch) {
        categoryHasVisibleCards = true;
      }
    });

    container.style.display = categoryHasVisibleCards ? "flex" : "none";
  });
});