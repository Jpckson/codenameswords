const input = document.getElementById("search");
const grid = document.getElementById("grid");
const count = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

const cards = Array.from(grid.querySelectorAll(".card"));
const plural = (n) => `${n} ${n === 1 ? "list" : "lists"}`;

input.addEventListener("input", function () {
    const search = input.value.toLowerCase().trim();
    let shown = 0;
    for (const card of cards) {
        const name = card.dataset.name || "";
        const match = !search || name.includes(search);
        card.hidden = !match;
        if (match) shown++;
    }
    if (count) count.textContent = plural(shown);
    if (noResults) noResults.hidden = shown !== 0;
});

const randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", function () {
    const visible = Array.from(grid.querySelectorAll(".card")).filter(
        (c) => !c.hidden
    );
    if (!visible.length) return;
    const pick = visible[Math.floor(Math.random() * visible.length)];
    const link = pick.querySelector(".card-link");
    const href = link && link.getAttribute("href");
    if (href) window.location.href = href;
});
