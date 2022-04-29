const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const totalScoreBoard = document.querySelector(".total-peeks");
const accuracy = document.querySelector(".accuracy");
const moles = document.querySelectorAll(".mole");
const audioContainer = document.getElementById("audioContainer");
const reloadButton = document.querySelector("#reload");

var running = false

let lastHole;
let timeUp = false;
let score = 0;

function reload() {
    reload = location.reload();
}

function gotoMainPage() {
	location.href = 'home.html?#products';
}

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

function update_accuracy() {
	accuracy.textContent = Math.round(scoreBoard.textContent / totalScoreBoard.textContent * 100) + "%";
}

function peep() {
	const time = randomTime(600, 1000);
	const hole = randomHole(holes);
	hole.classList.add("up");
	total_peeks++;
	totalScoreBoard.textContent = total_peeks;
	update_accuracy()
	setTimeout(() => {
		hole.classList.remove("up");
		if (!timeUp) peep();
	}, time);

}

function startGame() {
	if (running) return;
	scoreBoard.textContent = 0;
	timeUp = false;
	score = 0;
	total_peeks = 0
	running = true
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
reloadButton.addEventListener("click", reload, false);
