document.getElementById("ebookForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const ebookData = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        isbn: document.getElementById("isbn").value,
        cover: document.getElementById("cover").value
    };

    const res = await fetch("https://testing-apps-m8dz.onrender.com/api/ebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ebookData)
    });

    if (res.ok) {
        document.getElementById("message").textContent = "✅ Ebook submitted successfully!";
        fetchEbooks(); // refresh the list
    } else {
        document.getElementById("message").textContent = "❌ Failed to submit ebook.";
    }
});

// Fetch and display ebooks
async function fetchEbooks() {
    const res = await fetch("https://testing-apps-m8dz.onrender.com/api/ebooks");
    const ebooks = await res.json();

    const container = document.createElement("div");
    ebooks.forEach(book => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${book.title}</h3><p>By ${book.author}</p>`;
        container.appendChild(div);
    });
    document.body.appendChild(container);
}

// Load ebooks on page load
fetchEbooks();
