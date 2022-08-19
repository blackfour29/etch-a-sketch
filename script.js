const pickr = Pickr.create({
  el: '.color-picker',
  theme: 'classic', // or 'monolith', or 'nano'

  swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 0.95)',
      'rgba(156, 39, 176, 0.9)',
      'rgba(103, 58, 183, 0.85)',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)'
  ],

  components: {

      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: true,
          input: true,
          clear: true,
          save: true
      }
  }
});

const gridEl = document.querySelector(".grid");
const rangeEl = document.querySelector("#range");
const rangeLabel = document.querySelector('.range-label');
const colorPickerBtn = document.querySelector(".pcr-button");
const rainbowCB = document.querySelector(".rainbow-checkbox");
const eraserCB = document.querySelector(".eraser-checkbox");
const darkenCB = document.querySelector(".darken-checkbox");
const lightenCB = document.querySelector(".lighten-checkbox");
const colorPickCb = document.querySelector(".color-pick-checkbox");
const gridLinesCb = document.querySelector(".grid-lines-checkbox");
const brushCb = document.querySelector(".brush-checkbox");
const optionsCbs = document.querySelectorAll(".options--checkbox");



let brushColor = "#42445A";
let currentTool = "brush";
let mousePressed = false;

brushCb.checked = true;


window.addEventListener("load", displayNewGrid);

rangeEl.addEventListener("change", function(event){
  let gridSize = rangeEl.value;
  displayNewGrid(event, gridSize);
})

rangeEl.addEventListener("input", function(event) {
  let size = event.target.value;
  updateRangeLabel(size);
});

gridEl.addEventListener("mousedown", startColoringMode);
gridEl.addEventListener("mouseup", stopColoringMode);
gridEl.addEventListener("mouseleave", stopColoringMode)
gridEl.addEventListener("mouseover", color)

brushCb.addEventListener("change", toggleBrush);


rainbowCB.addEventListener("change", toggleRainbowBrush);

eraserCB.addEventListener("change", toggleEraser);

darkenCB.addEventListener("change", toggleDarken);

lightenCB.addEventListener("change", toggleLighten);

colorPickCb.addEventListener("change", toggleColorPick);

gridLinesCb.addEventListener("change", toggleGridLines);


function toggleBrush()
{
  if(brushCb.checked)
    currentTool = "brush"

  turnOffCheckboxesExcept(brushCb);

}

function toggleDarken()
{
  if(darkenCB.checked)
  {
    currentTool = "darken";
    turnOffCheckboxesExcept(darkenCB);
  }
  else if(!darkenCB.checked)
  {
    currentTool = "brush";
    brushCb.checked = true;
  }

}

function toggleLighten()
{
  
  if(lightenCB.checked)
  currentTool = "lighten";
  else if(!lightenCB.checked)
  currentTool = "brush;"

  turnOffCheckboxesExcept(lightenCB);
}

function toggleColorPick()
{
  
  if(colorPickCb.checked)
  currentTool = "color-pick";
  else if(!colorPickCb.checked)
  currentTool = "brush";

  turnOffCheckboxesExcept(colorPickCb);
}

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

function toggleEraser()
{
  if(eraserCB.checked)
  {
    currentTool = "eraser";
  }
  else
  {
    currentTool = "brush";
  }

  turnOffCheckboxesExcept(eraserCB);

}

function getRandomColor()
{
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
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
    {
      event.target.style.backgroundColor = changeShade("darken", event.target.style.backgroundColor);
    }
    else if(currentTool === "lighten")
    {
      event.target.style.backgroundColor = changeShade("lighten" , event.target.style.backgroundColor);
    }
    else if(currentTool === "color-pick")
    {
      let color = event.target.style.backgroundColor;
      if(color)
      {
        brushColor = color;
        colorPickerBtn.style.setProperty('--pcr-color', `${color}`)
      }
    }
  }
}

function stopColoringMode()
{
  mousePressed = false;
}

function toggleRainbowBrush()
{
  if(rainbowCB.checked)
  {  
    currentTool = "rainbow-brush";
  }

  else if(!rainbowCB.checked)
  {
    currentTool = "brush";
  }
  turnOffCheckboxesExcept(rainbowCB);

}

function changeShade(mode, color)
{
  
  color = color.slice(4, color.length-1);
  let values = color.split(",")
  
  if(mode === "darken")
  {
    for(let i=0; i<=values.length-1; i++)
      values[i] = parseInt(values[i]) - 15;
  }
  else if(mode === "lighten")
  {
    for(let i=0; i<=values.length-1; i++)
      values[i] = parseInt(values[i]) + 15;
  }


  return `rgb(${values[0]}, ${values[1]}, ${values[2]})`
}



pickr.on('change', instance => {
  let r = instance.toRGBA()[0];
  let g = instance.toRGBA()[1];
  let b = instance.toRGBA()[2];

  // testBox.style.backgroundColor = `rgb(${r}, ${g}, ${b}`;
  colorPickerBtn.style.setProperty('--pcr-color', `rgb(${r}, ${g}, ${b}`);
});

pickr.on("hide", instance => {
  let color = colorPickerBtn.style.getPropertyValue("--pcr-color");
  brushColor = color;
})