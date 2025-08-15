function conectarElementos(svg, elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();

    const x1 = rect1.right - svgRect.left;
    const y1 = rect1.top + rect1.height / 2 - svgRect.top;
    const x2 = rect2.left - svgRect.left;
    const y2 = rect2.top + rect2.height / 2 - svgRect.top;

    const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
    linea.setAttribute("x1", x1);
    linea.setAttribute("y1", y1);
    linea.setAttribute("x2", x2);
    linea.setAttribute("y2", y2);
    linea.classList.add("linea");
    svg.appendChild(linea);
    return linea;
}

document.addEventListener("DOMContentLoaded", () => {
    const svg = document.getElementById("flechas");

    document.querySelectorAll(".ramo").forEach(ramo => {
        ramo.addEventListener("mouseenter", () => {
            const prereqs = ramo.dataset.prerequisitos.split(",").map(p => p.trim()).filter(Boolean);
            prereqs.forEach(pr => {
                const target = document.getElementById(pr);
                if (target) {
                    const linea = conectarElementos(svg, target, ramo);
                    setTimeout(() => linea.classList.add("visible"), 10);
                }
            });
        });

        ramo.addEventListener("mouseleave", () => {
            document.querySelectorAll(".linea").forEach(linea => {
                linea.remove();
            });
        });

        ramo.addEventListener("click", () => {
            ramo.classList.toggle("aprobado");
        });
    });
});
