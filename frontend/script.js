async function loadPDFs() {
  const container = document.getElementById("pdfContainer");
  container.innerHTML = "<p>Loading PDFs...</p>";

  try {
    const res = await fetch("http://localhost:5000/api/books");
    const files = await res.json();

    if (files.length === 0) {
      container.innerHTML = "<p>No PDFs found.</p>";
      return;
    }

    container.innerHTML = "";
    files.forEach(file => {
      const card = document.createElement("div");
      card.className = "pdf-card";
      card.innerHTML = `
        <h3>${file}</h3>
        <iframe src="http://localhost:5000/api/pdf/${file}" width="100%" height="250px"></iframe>
        <br/>
        <button onclick="openPDF('${file}')">Open PDF</button>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Error loading PDFs.</p>";
  }
}

function openPDF(filename) {
  window.open(`http://localhost:5000/api/pdf/${filename}`, "_blank");
}

window.onload = loadPDFs;
