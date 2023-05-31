document.addEventListener("DOMContentLoaded", function() {
    let rainbowMode = false;
    let temporaryMode = false;
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
      const darkerColor = `rgb(${match[1] * 0.9}, ${match[2] * 0.9}, ${match[3] * 0.9})`;
      return darkerColor;
    }
  
    function createCell(size) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.width = `${size}px`;
      cell.style.height = `${size}px`;
  
      function changeColor() {
        if (rainbowMode) {
          cell.style.transition = "background-color 0.3s ease";
          cell.style.backgroundColor = getRandomColor();
        } else {
          const currentColor = getComputedStyle(cell).backgroundColor;
          const targetColor = darkenColor(cell);
          cell.style.transition = "background-color 0.3s ease";
          cell.style.backgroundColor = targetColor;
        }
  
        if (temporaryMode) {
          setTimeout(() => {
            cell.style.transition = "background-color 0.3s ease";
            cell.style.backgroundColor = "";
          }, 1000);
        }
      }
  
      cell.addEventListener("mouseenter", changeColor);
    // Event listeners for touch events on mobile
    cell.addEventListener("touchstart", function(event) {
        event.preventDefault();
        changeColor();
        cell.addEventListener("touchmove", touchMoveHandler);
      });
  
      function touchMoveHandler(event) {
        event.preventDefault();
        const touches = event.touches;
        for (let i = 0; i < touches.length; i++) {
          const touch = touches[i];
          const target = document.elementFromPoint(touch.clientX, touch.clientY);
          if (target === cell) {
            changeColor();
          }
        }
      }
  
      cell.addEventListener("touchend", function(event) {
        event.preventDefault();
        cell.removeEventListener("touchmove", touchMoveHandler);
      });
  
      return cell;
    }
  
    function createGrid(size) {
      container.innerHTML = "";
      const cellSize = (960 - 2 * 5) / size; // subtracting the border size
      container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
      container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
      for (let i = 0; i < size * size; i++) {
        const cell = createCell(cellSize);
        container.appendChild(cell);
      }
    }
  
    function rescaleGrid() {
      let newSize = prompt("Enter new size (1-100)");
      if (newSize && !isNaN(newSize) && newSize <= 100) {
        createGrid(newSize);
      } else {
        alert("Please enter a valid number (1-100)");
      }
    }
  
    function toggleTemporaryMode() {
      temporaryMode = !temporaryMode;
      const button = document.getElementById("temporary-mode");
      button.textContent = temporaryMode ? "Permanent Mode" : "Temporary Mode";
    }

    function eraseAllCells() {
        const cells = container.querySelectorAll(".cell");
        cells.forEach(cell => {
          cell.style.transition = "background-color 0.3s ease";
          cell.style.backgroundColor = "";
        });
      }
  
    document.getElementById("rescale").addEventListener("click", rescaleGrid);
    document.getElementById("rainbow").addEventListener("click", function() {
      rainbowMode = !rainbowMode;
      this.textContent = rainbowMode ? "B&W Mode" : "Rainbow Mode";
    });
    document.getElementById("temporary-mode").addEventListener("click", toggleTemporaryMode);
    document.getElementById("erase-all").addEventListener("click", eraseAllCells);
  
    createGrid(16);
  });
  