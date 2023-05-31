document.addEventListener("DOMContentLoaded", function() {
    let rainbowMode = false;
    const container = document.getElementById("container");

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function darkenColor(element) {
        const currentColor = getComputedStyle(element).backgroundColor;
        const match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+(?:\.\d+)?))?\)/.exec(currentColor);
        const darkerColor = `rgb(${match[1]*0.9}, ${match[2]*0.9}, ${match[3]*0.9})`;
        return darkerColor;
    }

    function createCell(size) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${size}px`;
        cell.style.height = `${size}px`;
    
        cell.addEventListener("mouseenter", function() {
            if (rainbowMode) {
                this.style.backgroundColor = getRandomColor();
            } else {
                this.style.backgroundColor = darkenColor(this);
            }
        });
    
        return cell;
    }
    

    function createGrid(size) {
        container.innerHTML = "";
        const cellSize = Math.floor(960 / size);
        container.style.height = `${cellSize * size}px`;
        for(let i = 0; i < size * size; i++) {
            const cell = createCell(cellSize);
            container.appendChild(cell);
        }
    }

    function rescaleGrid() {
        let newSize = prompt("Enter new size");
        if(newSize && !isNaN(newSize) && newSize <= 100) {
            createGrid(newSize);
        } else {
            alert("Please enter a valid number (1-100)");
        }
    }

    document.getElementById("rescale").addEventListener("click", rescaleGrid);

    document.getElementById("rainbow").addEventListener("click", function() {
        rainbowMode = !rainbowMode;
        this.textContent = rainbowMode ? "Normal Mode" : "Rainbow Mode";
    });

    createGrid(16);
});
