document.addEventListener("DOMContentLoaded", function() {
    (function() {
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
        });
  
        cell.addEventListener("touchmove", function(event) {
          event.preventDefault();
          const touches = event.changedTouches;
          for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target === cell) {
              changeColor();
            }
          }
        });
  
        return cell; 
      }
  
      function createGrid(size) {
        container.innerHTML = "";
        const containerStyle = getComputedStyle(container);
        const containerWidth = parseInt(containerStyle.getPropertyValue('width'), 10);
        const containerHeight = parseInt(containerStyle.getPropertyValue('height'), 10);
        const containerSize = Math.min(containerWidth, containerHeight);
        const cellSize = (containerSize - 2 * 5) / size; // subtracting the border size
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        for (let i = 0; i < size * size; i++) {
          const cell = createCell(cellSize);
          container.appendChild(cell);
        }
      }
  
      createGrid(16);
  
      document.getElementById("reset-button").addEventListener("click", function() {
        const newSize = parseInt(prompt("Enter a new grid size"), 10);
        if (newSize > 0 && newSize <= 100) {
          createGrid(newSize);
        } else {
          alert("Invalid grid size. Please enter a number between 1 and 100.");
        }
      });
  
      document.getElementById("rainbow-button").addEventListener("click", function() {
        rainbowMode = !rainbowMode;
        this.classList.toggle("active");
      });
  
      document.getElementById("temporary-button").addEventListener("click", function() {
        temporaryMode = !temporaryMode;
        this.classList.toggle("active");
      });
    })();
  });
  