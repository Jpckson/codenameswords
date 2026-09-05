const btn = document.getElementById("copyBtn");
const label = btn.querySelector(".btn-label") || btn;
const original = label.textContent;

function flash() {
    label.textContent = "Copied!";
    btn.classList.add("is-copied");
    setTimeout(() => {
        label.textContent = "Copy All Words";
        btn.classList.remove("is-copied");
    }, 2000);
}

async function copy() {
    // This feels wrong but docs said this was correct 😭
    const words = btn.dataset.words;
    const text = words.split(',').join("\n");
    try {
        await navigator.clipboard.writeText(text);
        flash();
    } catch (err) {
        console.error(err);
    }
}

btn.addEventListener('click', () => {
    copy();
})