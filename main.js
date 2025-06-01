fetch("https://openaccess-api.clevelandart.org/api/artworks?limit=30")
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById("departments"); // Χρησιμοποιούμε το ίδιο id
    const types = new Set();

    data.data.forEach(art => {
      if (art.type) {
        types.add(art.type);
      }
    });

    types.forEach(type => {
      const li = document.createElement("li");
      li.textContent = type;
      list.appendChild(li);
    });
  });

// ✅ Εμφάνιση 10 έργων που έχουν εικόνα
fetch("https://openaccess-api.clevelandart.org/api/artworks?limit=30")
  .then(response => response.json())
  .then(data => {
    const artworksWithImages = data.data.filter(art => art.images?.web?.url);
    const tableBody = document.querySelector("#artworks-table tbody");

    artworksWithImages.slice(0, 10).forEach(art => {
      const row = document.createElement("tr");

      const titleCell = document.createElement("td");
      titleCell.textContent = art.title || "Άγνωστο";
      row.appendChild(titleCell);

      const artistCell = document.createElement("td");
      artistCell.textContent = art.creators?.[0]?.description || "Άγνωστος";
      row.appendChild(artistCell);

      const imageCell = document.createElement("td");
      const btn = document.createElement("button");
      btn.textContent = "Δες εικόνα";

      btn.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.display = "block";

        const img = document.createElement("img");
        img.src = art.images.web.url;
        img.alt = art.title;

        const span = document.createElement("span");
        span.className = "close";
        span.innerHTML = "&times;";
        span.onclick = () => {
          modal.style.display = "none";
          modal.innerHTML = "";
        };

        modal.innerHTML = "";
        modal.appendChild(span);
        modal.appendChild(img);
      };

      imageCell.appendChild(btn);
      row.appendChild(imageCell);
      tableBody.appendChild(row);
    });
  });



