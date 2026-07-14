(function () {
  const grid = document.getElementById("catalog");
  const filtersEl = document.getElementById("filters");
  const searchInput = document.getElementById("searchInput");
  const emptyMsg = document.getElementById("empty");

  const data = window.CATALOG || [];
  let activeCategory = "All";
  let query = "";

  const categories = ["All", ...new Set(data.map((v) => v.category))];

  function renderFilters() {
    filtersEl.innerHTML = "";
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "chip" + (cat === activeCategory ? " active" : "");
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        activeCategory = cat;
        renderFilters();
        renderGrid();
      });
      filtersEl.appendChild(btn);
    });
  }

  function renderGrid() {
    const q = query.trim().toLowerCase();
    const items = data.filter((v) => {
      const matchCat = activeCategory === "All" || v.category === activeCategory;
      const matchQuery =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        (v.description || "").toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    grid.innerHTML = "";
    emptyMsg.hidden = items.length > 0;

    items.forEach((v) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="poster" style="background:${v.gradient}">
          <span class="badge">${v.category}</span>
          <span class="play"></span>
        </div>
        <div class="card-body">
          <p class="card-title">${v.title}</p>
          <div class="card-sub">
            <span>${v.year}</span>
            <span>${v.duration}</span>
            <span>${v.rating}</span>
          </div>
        </div>`;
      card.addEventListener("click", () => {
        window.location.href = `player.html?id=${encodeURIComponent(v.id)}`;
      });
      grid.appendChild(card);
    });
  }

  searchInput.addEventListener("input", (e) => {
    query = e.target.value;
    renderGrid();
  });

  renderFilters();
  renderGrid();
})();
