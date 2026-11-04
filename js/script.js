const sections = [...document.querySelectorAll("#inicio, #cardapio, #sobre, #avaliacoes")];
const navLinks = [...document.querySelectorAll(".nav-itens a[href^='#']")];
const whatsappNumber = "5591991985577";

for (const link of document.querySelectorAll(
  ".whatsapp, .link-car, .purchase-buttom a, .menu-itens footer a",
)) {
  const productName = link.closest(".menu-itens")?.querySelector("h3")?.textContent.trim();
  const message = productName
    ? `Olá! Gostaria de pedir: ${productName}.`
    : "Olá! Gostaria de fazer um pedido.";

  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
}

function updateActiveLink() {
  const marker = window.scrollY + window.innerHeight * 0.35;
  let activeSection = sections[0];

  for (const section of sections) {
    if (section.offsetTop <= marker) {
      activeSection = section;
    }
  }

  for (const link of navLinks) {
    const isActive = link.hash === `#${activeSection.id}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

let scrollUpdateScheduled = false;

window.addEventListener(
  "scroll",
  () => {
    if (!scrollUpdateScheduled) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        scrollUpdateScheduled = false;
      });
      scrollUpdateScheduled = true;
    }
  },
  { passive: true },
);

window.addEventListener("resize", updateActiveLink);
updateActiveLink();
