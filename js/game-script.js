const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const audioContainer = document.getElementById("audioContainer");

let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
	const idx = Math.floor(Math.random() * holes.length);
	const hole = holes[idx];
	if (hole === lastHole) {
		return randomHole(holes);
	}
	lastHole = hole;
	return hole;
}

function peep() {
	const time = randomTime(600, 1000);
	const hole = randomHole(holes);
	hole.classList.add("up");
	setTimeout(() => {
		hole.classList.remove("up");
		if (!timeUp) peep();
	}, time);
}

function startGame() {
	scoreBoard.textContent = 0;
	timeUp = false;
	score = 0;
	peep();
	// setTimeout(() => (timeUp = true), 10000); // This will run the program for 10 seconds, this is commented out so the program runs infinitely.
}

function bonk(e) {
	if (!e.isTrusted) return; // This checks if someone is trying to cheat by sending a fake click using JavaScript
	score++;
	this.classList.remove("up");
	playHitSound();
	scoreBoard.textContent = score;
}

function playHitSound() {
	audioContainer.play();
}

moles.forEach(mole => mole.addEventListener("click", bonk));
