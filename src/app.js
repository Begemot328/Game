let totalShots = 0;
let successfulShots = 0;
const aimQuantity = 5;
let aimSize = 100;
const sceneryBack = document.querySelector('#scenery-back');
const scenery = document.querySelector('#scenery');
const sampleAim = document.querySelector('#sample-aim');


function removeAims() {
  document.querySelectorAll(".aim").forEach(o => o.remove())
}

function placeAims() {
  removeAims();

  const maxWidth = sceneryBack.width - aimSize;
  const maxHeight = sceneryBack.height - aimSize;

  console.log(sceneryBack.height);
  console.log(sceneryBack.clientHeight);
  console.log(sceneryBack.naturalHeight);


  for (let i = 0; i < aimQuantity; i++) {
    scenery.appendChild(createAimBySample(Math.random() * maxHeight, Math.random() * maxWidth));
  }
}

function createAim() {
  let newNode = document.createElement('img');

  newNode.setAttribute('src', "img/aim-target-svgrepo-com.svg");
  newNode.setAttribute('class', "aim");
  newNode.setAttribute('height', '100');
  newNode.style.position = 'absolute';
  newNode.style.top = '300px';
  newNode.style.left = '300px';
  // newNode.addEventListener("click", shoot.bind(null, newNode));
  // newNode.addEventListener("click", shoot.bind(null, newNode));
  newNode.addEventListener("click", shootAim);

  console.log(newNode);
  scenery.appendChild(newNode);

  return newNode;
}

function changeAimsSize(size) {
  sampleAim.setAttribute('height', size);

  aimSize = size;
  placeAims();
}

function createAimBySample(top, left) {
  let newNode = sampleAim.cloneNode(true);
  newNode.removeAttribute('id');

  newNode.classList.add('aim');
  newNode.style.top = top + 'px';
  newNode.style.left = left + 'px';
  newNode.style.display = 'initial';

  return newNode;
}

function shootAim() {
  shoot(this);
}

function shoot(x) {
  console.log('Shoot!');

  x.remove();
  successfulShots++;
  totalShots++;

  check();
}

function shootMissed() {
  console.log('Shoot big!');

  totalShots++;

  check();
}

function check() {
  setAccuracy(calculateAccuracy(successfulShots, totalShots).toFixed(2));

  if (document.querySelectorAll(".aim").length === 0) {
    endGame()
  }
}

function calculateAccuracy(successfulShots, totalShots) {
  return successfulShots / totalShots * 100;
}

function setAccuracy(accuracy) {
  document.querySelector("#accuracy").innerHTML = `Your accuracy is ${accuracy}%`;
}

function endGame() {
  document.body.classList.add('endgame-mode');
  alertUser();
}

function restartGame() {
  document.body.classList.remove('endgame-mode');
  document.body.classList.add('game-mode');
  totalShots = 0;
  successfulShots = 0;
}

function alertUser() {
  window.setTimeout(function () {
    alert('That\'s all, Folks!')
  }, 500);
}
