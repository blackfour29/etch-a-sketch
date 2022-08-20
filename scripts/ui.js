function clearCurrentGrid()
{
  gridEl.innerHTML = '';
}

function updateRangeLabel(size=16)
{
  rangeLabel.textContent = `Grid size: ${size} x ${size}`;
}

function renderNewGrid(size=16)
{
  gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridEl.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for(let i = 1; i<=size * size; i++)
  {
    const square = document.createElement("div");
    square.classList.add("square");
    gridLinesCb.checked = true;
    gridEl.appendChild(square);
  }
}