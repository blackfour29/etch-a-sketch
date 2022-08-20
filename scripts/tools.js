function toggleBrush()
{
  if(brushCb.checked)
    currentTool = "brush";
  else if(!brushCb.checked)
    currentTool = "none";
  turnOffCheckboxesExcept(brushCb);
}

function turnOnRainbowBrush()
{
  if(rainbowCB.checked)
  {  
    currentTool = "rainbow-brush";
    turnOffCheckboxesExcept(rainbowCB);
  }
}

function turnOnEraser()
{
  if(eraserCB.checked)
  {
    currentTool = "eraser";
    turnOffCheckboxesExcept(eraserCB);
  }
}

function turnOnDarken()
{
  if(darkenCB.checked)
  {
    currentTool = "darken";
    turnOffCheckboxesExcept(darkenCB);
  }
}

function turnOnLighten()
{
  
  if(lightenCb.checked)
  {
    currentTool = "lighten";
    turnOffCheckboxesExcept(lightenCb);
  }
  else if(!lightenCb.checked)
  {
    currentTool = "brush";
    brushCb.checked = true;
  }
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

function turnOnColorPick()
{
  if(colorPickCb.checked)
  {
    currentTool = "color-pick";
    turnOffCheckboxesExcept(colorPickCb);
  } 
}

function turnOnBrush()
{
  currentTool = "brush";
  brushCb.checked = true;
  turnOffCheckboxesExcept(brushCb);
}