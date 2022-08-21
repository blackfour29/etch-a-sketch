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

// brush and grid lines should be on by default
brushCb.checked = true; 
gridLinesCb.checked = true;


////////// Event listeners

window.addEventListener("load", displayNewGrid);

rangeEl.addEventListener("change", function(event){
  let gridSize = rangeEl.value;
  displayNewGrid(event, gridSize);
})

rangeEl.addEventListener("input", function(event) {
  let gridSize = event.target.value;
  updateRangeLabel(gridSize);
});

gridEl.addEventListener("mousedown", startUsingTool);
gridEl.addEventListener("mouseup", stopUsingTool);
gridEl.addEventListener("mouseleave", stopUsingTool)
gridEl.addEventListener("mouseover", useTool)

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




////////// Logic

function toggleGridLines()
{
  let gridSquares = document.querySelectorAll(".square");
  if(!gridLinesCb.checked)
  {
    gridSquares.forEach(square => {
      square.style.border="none";
    })
  }
  else if(gridLinesCb.checked)
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

function startUsingTool(event)
{
  mousePressed = true;
  useTool(event);
}

function displayNewGrid(event, size=16){
  clearCurrentGrid();
  renderNewGrid(size);
  updateRangeLabel(size);
}

function useTool(event)
{
  if(mousePressed)
  {
    if(currentTool === "brush")
      event.target.style.backgroundColor = brushColor;
    else if(currentTool === "rainbow-brush")
      event.target.style.backgroundColor = getRandomColor();
    else if(currentTool === "eraser")
      event.target.style.backgroundColor = "#ffffff";
    else if(currentTool === "darken")
      event.target.style.backgroundColor = changeShade("darken", event.target.style.backgroundColor);
    else if(currentTool === "lighten")
      event.target.style.backgroundColor = changeShade("lighten" , event.target.style.backgroundColor);
    else if(currentTool === "color-pick")
    {
      // using event.target.style.backgroundColor would produce a bug in this case if it's used to read the color of the clicked square. That is because it only returns the inline styles of the element, which on the initial render of the grid are none, unlike in the other cases. To work around that, i read the computed styles instead and target the background-color property. 
      // note: the argument passed to getPropertyValue has to match exactly the property name from the computed styles. Camelcasing or the css property name will not work (backgroundColor / "background color")

      //let color = event.target.style.backgroundColor; - bug

      let color = getComputedStyle(event.target).getPropertyValue("background-color");
      brushColor = color;
      colorPickerBtn.style.setProperty('--pcr-color', `${color}`)
      switchToolToBrush(color);
    }
    else
      return;
  }
}

function stopUsingTool()
{
  mousePressed = false;
}

function switchToolToBrush(color)
{
  color = color || brushColor;
  brushColor = color;
  currentTool = "brush";
  turnOffCheckboxesExcept(brushCb);
  brushCb.checked = true;
}