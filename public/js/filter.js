const filters = document.getElementById("filters");
const filterItems = document.querySelectorAll(".filter");
const rightBtn = document.querySelector(".right-btn");
const leftBtn = document.querySelector(".left-btn");

if (filters && rightBtn && leftBtn) {
  rightBtn.onclick = () => {
    filters.scrollLeft += 200;
  };

  leftBtn.onclick = () => {
    filters.scrollLeft -= 200;
  };
}

if (filterItems.length) {
  filterItems.forEach((filter) => {
    filter.addEventListener("click", () => {
      filterItems.forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");
    });
  });
}
