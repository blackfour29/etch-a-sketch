const gridEl = document.querySelector(".grid");
const rangeEl = document.querySelector("#range");
const rangeLabel = document.querySelector('.range-label');
const colorPickerBtn = document.querySelector(".pcr-button");
const rainbowCB = document.querySelector(".rainbow-checkbox");
const eraserCB = document.querySelector(".eraser-checkbox");
const darkenCB = document.querySelector(".darken-checkbox");
const lightenCb = document.querySelector(".lighten-checkbox");
const colorPickCb = document.querySelector(".color-pick-checkbox");
const gridLinesCb = document.querySelector(".grid-lines-checkbox");
const brushCb = document.querySelector(".brush-checkbox");
const optionsCbs = document.querySelectorAll(".options--checkbox");
const clearBtn = document.querySelector(".clear-button")

let brushColor = "#42445A";
let currentTool = "brush";
let mousePressed = false;

brushCb.checked = true; // brush should be on by default

window.addEventListener("load", displayNewGrid);

rangeEl.addEventListener("change", function(event){
  let gridSize = rangeEl.value;
  displayNewGrid(event, gridSize);
})

rangeEl.addEventListener("input", function(event) {
  let gridSize = event.target.value;
  updateRangeLabel(gridSize);
});

gridEl.addEventListener("mousedown", startColoringMode);
gridEl.addEventListener("mouseup", stopColoringMode);
gridEl.addEventListener("mouseleave", stopColoringMode)
gridEl.addEventListener("mouseover", color)

brushCb.addEventListener("change", toggleBrush);

rainbowCB.addEventListener("change", turnOnRainbowBrush);

eraserCB.addEventListener("change", turnOnEraser);

darkenCB.addEventListener("change", turnOnDarken);

lightenCb.addEventListener("change", turnOnLighten);

colorPickCb.addEventListener("change", turnOnColorPick);

gridLinesCb.addEventListener("change", toggleGridLines);

clearBtn.addEventListener("click", function(event){
  let gridSize = rangeEl.value;
  displayNewGrid(event, gridSize);
});

function toggleGridLines()
{
  let gridSquares = document.querySelectorAll(".square");
  if(gridLinesCb.checked)
  {
    gridSquares.forEach(square => {
      square.style.border="none";
    })
  }
  else if(!gridLinesCb.checked)
  {
    gridSquares.forEach(square => {
      square.style.border = "solid 1px black";
    })
  }
}

function turnOffCheckboxesExcept(node)
{
  optionsCbs.forEach(checkbox => {
    if(checkbox !== node)
      checkbox.checked = false;
  })
}

function startColoringMode(event)
{
  mousePressed = true;
  color(event);
}

function displayNewGrid(event, size=16){
  clearCurrentGrid();
  renderNewGrid(size);
  updateRangeLabel(size);
}

function color(event)
{
  if(mousePressed)
  {
    if(currentTool === "brush")
      event.target.style.backgroundColor = brushColor;
    else if(currentTool === "rainbow-brush")
      event.target.style.backgroundColor = getRandomColor();
    else if(currentTool === "eraser")
      event.target.style.cssText = '';  
    else if(currentTool === "darken")
      event.target.style.backgroundColor = changeShade("darken", event.target.style.backgroundColor);
    else if(currentTool === "lighten")
      event.target.style.backgroundColor = changeShade("lighten" , event.target.style.backgroundColor);
    else if(currentTool === "color-pick")
    {
      let color = event.target.style.backgroundColor;
      if(color)
      {
        brushColor = color;
        colorPickerBtn.style.setProperty('--pcr-color', `${color}`)
        // turnOnBrush();
        switchToolToBrush(color);
      }
    }
    else
      return;
  }
}

function stopColoringMode()
{
  mousePressed = false;
}

function switchToolToBrush(color)
{
  brushColor = color;
  currentTool = "brush";
  turnOffCheckboxesExcept(brushCb);
  brushCb.checked = true;
}