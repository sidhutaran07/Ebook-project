document.getElementById("ebookForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        year: document.getElementById("year").value,
        description: document.getElementById("description").value
    };

    try {
        const res = await fetch("https://testing-apps-m8dz.onrender.com/api/ebooks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            document.getElementById("message").textContent = "✅ Ebook added successfully!";
            document.getElementById("ebookForm").reset();
        } else {
            document.getElementById("message").textContent = "❌ Error adding ebook.";
        }
    } catch (err) {
        document.getElementById("message").textContent = "⚠️ Network error.";
    }
});
