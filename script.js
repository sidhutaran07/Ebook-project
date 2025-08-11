const form = document.getElementById("ebookForm");
const message = document.getElementById("message");

const API_URL = "https://testing-apps-m8dz.onrender.com/api/ebooks";

// Submit form
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ebookData = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        year: parseInt(document.getElementById("year").value, 10),
        description: document.getElementById("description").value
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ebookData)
        });

        if (res.ok) {
            message.textContent = "✅ Ebook submitted successfully!";
            form.reset();
            fetchEbooks(); // refresh list
        } else {
            message.textContent = "❌ Failed to submit ebook.";
        }
    } catch (err) {
        console.error(err);
        message.textContent = "⚠️ Error submitting ebook.";
    }
});

// Fetch and display ebooks
async function fetchEbooks() {
    try {
        const res = await fetch(API_URL);
        const ebooks = await res.json();

        const listContainer = document.getElementById("ebookList");
        listContainer.innerHTML = "";

        ebooks.forEach(book => {
            const item = document.createElement("div");
            item.className = "ebook-item";
            item.innerHTML = `
                <strong>${book.title}</strong> by ${book.author} (${book.year})<br>
                ${book.description}
            `;
            listContainer.appendChild(item);
        });

    } catch (err) {
        console.error(err);
    }
}

// Load ebooks on page load
fetchEbooks();
