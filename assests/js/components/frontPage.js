function frontPage(db) {
  const frontpage = document.querySelector(".carrousel");

  function getImages() {
    let cont = 0;
    let html = "";
    for (const item of db) {
      cont++;
      html += `<img src="${item.image}" alt="${item.name}">`;
      if (cont == 5) return html;
    }
  }
  frontpage.innerHTML = getImages();
}

export default frontPage;
