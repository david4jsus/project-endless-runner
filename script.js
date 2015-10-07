// First Variables
var map = document.getElementById("map");
var ctx = map.getContext("2d");
document.addEventListener("keydown", KeyDown);
var score = 0;
var gameStart = true;
var paused = false;
var gameEnd = false;
map.onclick = function() {
	if (gameStart || gameEnd) {
		ob1x = 	Math.floor(((Math.random() * 1000) + 1) + map.width);	// Obstacle 1 x
		ob1y = map.height - 200;										// Obstacle 1 y
		ob2x = Math.floor(((Math.random() * 1000) + map.width) + ob1x);	// Obstacle 2 x
		ob2y = map.height - 200;										// Obstacle 2 y
		chx  = 100;														// Character x
		chy  = map.height - 200;										// Character y
		bg1x = 0;														// Background - Far x
		bg2x = bg.width;												// Background - Far (2nd) x
		fg1x = 0;														// Background - Close
		fg2x = fg.width;												// Background - Close (2nd) x
		jumping = false;
		up = false;
		score = 0;
		gameStart = false;
		gameEnd = false;
		bgsound.play();
	}
};

// Image Init
// -- Background --
var bg = new Image();
bg.src = "assets/BG.png";
var fg = new Image();
fg.src = "assets/FG.png";
// -- Character --
var character = new Image();
character.src = "assets/Character1.png";
var character1 = new Image();
character1.src = "assets/Character1.png";
var character2 = new Image();
character2.src = "assets/Character2.png";
var cjumping = new Image();
cjumping.src = "assets/Jumping.png";
var down = new Image();
down.src = "assets/Down.png";
// -- Obstacles --
var obstacle1 = new Image();
obstacle1.src = "assets/Obstacle1.png"
var obstacle2 = new Image();
obstacle2.src = "assets/Obstacle2.png"
// -- Sounds --
var bgsound = new Audio("assets/Project Endless Runner OST.mp3");
var jumpsound = new Audio("assets/bounce.mp3");

drawImage();

// Image Drawing
function drawImage(){
	setInterval(update, 1000/60.0);
}

// Animation Variables
var dt = 1000/120;
var ob1x = Math.floor(((Math.random() * 1000) + 1) + map.width);	// Obstacle 1 x
var ob1y = map.height - 200;										// Obstacle 1 y
var ob2x = Math.floor(((Math.random() * 1000) + map.width) + ob1x);	// Obstacle 2 x
var ob2y = map.height - 200;										// Obstacle 2 y
var chx  = 100;														// Character x
var chy  = map.height - 200;										// Character y
var bg1x = 0;														// Background - Far x
var bg2x = bg.width;												// Background - Far (2nd) x
var fg1x = 0;														// Background - Close
var fg2x = fg.width;												// Background - Close (2nd) x
var jumping = false;
var up = false;

function KeyDown(e) {

	if (e.keyCode == 38 || e.keyCode == 119 || e.keyCode == 87 || e.keyCode == 32) {	// Up/Spacebar
		if (!jumping && !paused) {
			jumping = true;
			up = true;
			jumpsound.play();
		}
	}
	if (e.keyCode == 27) {	// Esc
		if (!gameStart && !gameEnd)
			paused = !paused;
	}
	if (e.keyCode == 13) {	// Enter
			if (gameStart || gameEnd) {
			ob1x = 	Math.floor(((Math.random() * 1000) + 1) + map.width);	// Obstacle 1 x
			ob1y = map.height - 200;										// Obstacle 1 y
			ob2x = Math.floor(((Math.random() * 1000) + map.width) + ob1x);	// Obstacle 2 x
			ob2y = map.height - 200;										// Obstacle 2 y
			chx  = 100;														// Character x
			chy  = map.height - 200;										// Character y
			bg1x = 0;														// Background - Far x
			bg2x = bg.width;												// Background - Far (2nd) x
			fg1x = 0;														// Background - Close
			fg2x = fg.width;												// Background - Close (2nd) x
			jumping = false;
			up = false;
			score = 0;
			gameStart = false;
			gameEnd = false;
			bgsound.play();
		}
	}

}

function drawBG() {
	ctx.drawImage(bg, bg1x, 0);	// BG1
	if (bg1x + bg.width < 0)
		bg1x = bg2x + bg.width - 20;
	else
		bg1x -= dt/2;
	
	ctx.drawImage(bg, bg2x, 0);	// BG2
	if (bg2x + bg.width < 0)
		bg2x = bg1x + bg.width - 20;
	else
		bg2x -= dt/2;
	
	ctx.drawImage(fg, fg1x, 0);	// FG1
	if (fg1x + fg.width < 0)
		fg1x = 2 * map.width;
	else
		fg1x -= dt/1.25;
	
	ctx.drawImage(fg, fg2x, 0);	// FG2
	if (fg2x + fg.width < 0)
		fg2x = 2 * map.width;
	else
		fg2x -= dt/1.25;
}

function update() {
	
		var d = new Date();
		var t = d.getTime();
	
	if (gameStart) {
		
		if (Math.round(t/1000) % 2 == 0)
			ctx.fillStyle = "#FF0000";
		else if (Math.round(t/1000) % 3 == 0)
			ctx.fillStyle = "#00FF00";
		else if (Math.round(t/1000) % 5 == 0)
			ctx.fillStyle = "#0000FF";
		else
			ctx.fillStyle = "#000000";
		ctx.clearRect(0, 0, map.width, map.height);
		ctx.font = "30px Consolas";
		ctx.fillText("PROJECT ENDLESS RUNNER", map.width/2 - 180, map.height/2 - 50);
		ctx.fillStyle = "#000000";
		ctx.font = "15px Consolas";
		ctx.fillText("Press 'enter' to start running!!", map.width/2 - 130, 3*map.height/4 - 50);
		
	} else if (gameEnd) {
		
		if (Math.round(t/1000) % 2 == 0)
			ctx.fillStyle = "#FF0000";
		else if (Math.round(t/1000) % 3 == 0)
			ctx.fillStyle = "#00FF00";
		else if (Math.round(t/1000) % 5 == 0)
			ctx.fillStyle = "#0000FF";
		else
			ctx.fillStyle = "#000000";
		ctx.clearRect(0, 0, map.width, map.height);
		ctx.font = "30px Consolas";
		ctx.fillText("YOU DIED", map.width/2 - 75, map.height/2 - 50);
		ctx.fillStyle = "#000000";
		ctx.font = "25px Consolas";
		ctx.fillText("Score: " + score, map.width/2 - 73 - Math.round(score/100), map.height/2);
		ctx.font = "15px Consolas";
		ctx.fillText("Press 'enter' to try again!!", map.width/2 - 120, 3*map.height/4 - 50);
		
	} else if (!paused) {
			
		ctx.clearRect(0, 0, map.width, map.height);
		// -- Background --
		drawBG();
		// -- Ground --
		ctx.fillStyle = "#900000";
		ctx.fillRect(0, map.height - 100, map.width, 100);
		// -- Score --
		ctx.fillStyle = "#000000";
		ctx.font = "30px Comic Sans MS";
		ctx.fillText("Score: " + score, map.width - 200, 50);
		// -- Character --
		if (Math.round(t/100) % 2 == 0 && !jumping) {
			ctx.drawImage(character2, chx, chy);
		} else if (jumping && up) {
			ctx.drawImage(cjumping, chx, chy);
		} else if (jumping && !up) {
			ctx.drawImage(down, chx, chy);
		} else {
			ctx.drawImage(character1, chx, chy);
		}
		// -- Obstacles --
		ctx.drawImage(obstacle1, ob1x, ob1y);
		ctx.drawImage(obstacle2, ob2x, ob2y);
		
		// -- Obstacle Movement --
		ob1x -= dt;
		ob2x -= dt;
		
		if (ob1x+obstacle1.width < 0) {
			ob1x = Math.floor(((Math.random() * 1000) + 1) + map.width);
		}
		if (ob2x+obstacle2.width < 0) {
			ob2x = Math.floor(((Math.random() * 1000) + map.width) + ob1x);
			if (ob1x-ob2x+obstacle2.width < 150)
				ob2x -= 50;
		}

		// -- Jumping --
		if (jumping) {
			if (up) {
				if (chy <= map.height - 450)
					up = false;
				else
					chy -= 10;
			}
			else {
				if (chy + character.height >= map.height - 110) {
					jumping = false;
					chy = map.height - 200;
				}
				else {
					chy += 10;
					jumpsound.pause();
					jumpsound.currentTime = 0;
				}
			}
		}
		
		// -- Hitting Obstacles --
		if (ob1x > chx + 5 && ob1x < chx + character.width - 5 && ob1y >= chy && ob1y <= chy + character.height - 5) {
			gameEnd = true;
			bgsound.pause();
		}
		if (ob2x > chx + 10 && ob2x < chx + character.width - 5 && ob2y >= chy && ob2y <= chy + character.height - 10) {
			gameEnd = true;
			bgsound.pause();
		}
		
		// -- Score --
		score++;
	}
	else {	// -- Pause screen --
	
		ctx.clearRect(map.width/2 - map.width/4, map.height/2 - map.height/4, map.width/2, map.height/2);
		ctx.fillStyle = "#000000";
		ctx.fillRect(map.width/2 - map.width/4, map.height/2 - map.height/4, map.width/2, map.height/2);
		// -- Flashy border --
		var d = new Date();
		var t = d.getTime();
		if (Math.round(t/1000) % 2 == 0) {
			ctx.strokeStyle="red";
			ctx.fillStyle = "#FF0000";
		} else if (Math.round(t/1000) % 3 == 0) {
			ctx.strokeStyle="blue";
			ctx.fillStyle = "#0000FF";
		} else if (Math.round(t/1000) % 5 == 0) {
			ctx.strokeStyle="green";
			ctx.fillStyle = "#00FF00";
		} else {
			ctx.strokeStyle="white";
			ctx.fillStyle = "#FFFFFF";
		}
		ctx.lineWidth = "5";
		ctx.rect(map.width/2 - map.width/4, map.height/2 - map.height/4, map.width/2, map.height/2);
		ctx.stroke();
		// -- Score --
		ctx.font = "50px Comic Sans MS";
		ctx.fillText("PAUSE", (map.width/2 - map.width/4) + map.width/5 - 50, (map.height/2 - map.height/4) + map.height/4 - 10);
		ctx.font = "30px Comic Sans MS";
		ctx.fillText("Score: " + (score - 1), (map.width/2 - map.width/4) + map.width/5 - 40, (map.height/2 - map.height/4) + map.height/4 + 50);
		
	}
	
}