const gridEl = document.querySelector(".grid");
const rangeEl = document.querySelector("#range");
const rangeLabel = document.querySelector('.range-label');
const colorPickerBtn = document.querySelector(".pcr-button");



renderSquares();

function renderSquares(size=16){
  for(let i = 1; i<=size * size; i++)
  {
    const square = document.createElement("div");
    square.classList.add("square");
    gridEl.appendChild(square);
  }
}

function updateRangeLabel()
{
  let newValue = rangeEl.value;
  rangeLabel.textContent = newValue;
}

rangeEl.addEventListener("input", updateRangeLabel);

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


pickr.on('change', instance => {
  let r = instance.toRGBA()[0];
  let g = instance.toRGBA()[1];
  let b = instance.toRGBA()[2];

  // testBox.style.backgroundColor = `rgb(${r}, ${g}, ${b}`;
  colorPickerBtn.style.setProperty('--pcr-color', `rgb(${r}, ${g}, ${b}`);
});

