var AM = new AssetManager();
var sheetHeight = 490;
var right_lane = 100;
var left_lane = -75;
var middle_lane = 15;
var lane_size = 100;
var left_change = 0;
var right_change = 0;
var gameScore = 0;
var background_speed = 1;

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.speed = 2;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    //this.ctx.drawImage(this.spritesheet,
      //             this.x, this.y);
      // Pan background
      this.y += this.speed;
      this.ctx.drawImage(this.spritesheet,
                     this.x, this.y);

      // Draw another image at the top edge of the first image
      this.ctx.drawImage(this.spritesheet,
                     this.x, this.y - sheetHeight);

      // If the image scrolled off the screen, reset
      if (this.y >= sheetHeight)
        this.y = 0;
};

Background.prototype.update = function () {
  if (this.speed <= 5) {
    this.speed *= 1.0001;
    background_speed = this.speed;
  }
  if (this.speed >= 3) {
    // trigger level change
  }
  if (this.speed >= 4) {
    // triger level change
  }
};

function Score(game, score, color, x, y) {
	this.color = color;
	this.x = x;
	this.y = y;
	this.ctx = game.ctx;
	this.score = score;
	this.ctx.font = "15px Arial";
	this.ctx.fillStyle = color;
	this.ctx.fillText("SCORE: " + this.score, this.x, this.y);
	Entity.call(this, game, x, y);
}

//Score.prototype = new Entity();
Score.prototype.constructor = Score;
Score.prototype.update = function() {
	this.score += Math.floor(background_speed);
	this.ctx.fillText("SCORE: " + this.score, this.x, this.y);
	//Entity.prototype.update.call(this);
};
Score.prototype.draw = function() {
	this.ctx.fillText("SCORE: " + this.score, this.x, this.y);
};

//original animation spritesheet, 189, 230, 5, 0.10, 14, true,1
function MushroomDude(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 338, 540, 0.05, 14, true);
    this.x = middle_lane;
    this.y = 100;
    this.speed = 5;
    this.game = game;
    this.Right = false;
    this.Left = false;
    this.Up = false;
    this.ctx = game.ctx;
}

MushroomDude.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x + 150, this.y + 100, 0.2);
}

MushroomDude.prototype.update = function () {
    //if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
    //this.x += this.game.clockTick * this.speed;
    //if (this.x > 400) this.x = 0;

    if (this.game.rightButton) {
      this.Right = true;
    } else {
      if (this.x >= right_lane || (Math.floor(this.x) == middle_lane) || this.Left) {
        right_change = 0;
        this.Right = false;
      }
    }
    if (this.Right) {
      if (this.x < right_lane) {
        this.x += this.speed;
        right_change += this.speed;
      } else {
        right_change = 0;
        this.Right = false;
      }
    }

    if (this.game.leftButton) {
      this.Left = true;
    } else {
      if (this.x <= left_lane || (Math.floor(this.x) == middle_lane) || this.Right) {
        left_change = 0;
        this.Left = false;
      }
    }
    if (this.Left) {
      if (this.x > left_lane) {
        this.x -= this.speed;
        left_change += this.speed;
      } else {
        left_change = 0;
        this.Left = false;
      }
    }

    if (this.game.upButton) {
      this.Up = true;
    } else {
      this.Up = false;
    }
    if (this.Up) {
      this.y -= this.game.clockTick * this.speed;
    }
}

function OminousFigure(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 93, 84, 0.05, 5, true);
    this.x = middle_lane - 100;
    this.y = 210;
    this.speed = 1;
    this.game = game;
    this.ctx = game.ctx;
}

OminousFigure.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x + 150, this.y + 100, 3);
}

OminousFigure.prototype.update = function () {
}

//0,512
function Spike (game, spritesheet, lane) {
	this.animation = new Animation(spritesheet, 0, 520, 142, 163, 810, 1, 1, true);
	this.speed = 60;
	this.ctx = game.ctx;
	if (lane === 0) {
    	Entity.call(this, game, 85, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 173, -200);
    } else {
    	Entity.call(this, game, 260, -200);
    }
};

Spike.prototype = new Entity();
Spike.prototype.constructor = Spike;

Spike.prototype.update = function() {
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed
	Entity.prototype.update.call(this);
};

Spike.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.4);//0.4
    Entity.prototype.draw.call(this);
};
//0,0
// inheritance
function Crate(game, spritesheet, lane) {
    this.animation = new Animation(spritesheet, 0, 0, 512, 512, 810, 1, 1, true);
    this.speed = 60;
    this.ctx = game.ctx;
    if (lane === 0) {
    	Entity.call(this, game, 87, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 175, -200);
    } else {
    	Entity.call(this, game, 260, -200);
    }
};

Crate.prototype = new Entity();
Crate.prototype.constructor = Crate;

Crate.prototype.update = function () {
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed
	Entity.prototype.update.call(this);
};

Crate.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);//.1
    Entity.prototype.draw.call(this);
};
//0, 1300
function Oil(game, spritesheet, lane) {
    this.animation = new Animation(spritesheet, 0, 1450, 776, 450, 810, 1, 1, true);
    this.speed = 60;
    this.ctx = game.ctx;
    if (lane === 0) {
    	Entity.call(this, game, 40, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 128, -200);
    } else {
    	Entity.call(this, game, 215, -200);
    }
};

Oil.prototype = new Entity();
Oil.prototype.constructor = Oil;

Oil.prototype.update = function () {
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed
	Entity.prototype.update.call(this);
};

Oil.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);//.2
    Entity.prototype.draw.call(this);
};
//0, 675
function Branch(game, spritesheet, lane) {
    this.animation = new Animation(spritesheet, 0, 675, 800, 600, 810, 1, 1, true);
    this.speed = 60;
    this.ctx = game.ctx;
    if (lane === 0) {
    	Entity.call(this, game, 70, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 160, -200);
    } else {
    	Entity.call(this, game, 240, -200);
    }

};

Branch.prototype = new Entity();
Branch.prototype.constructor = Branch;

Branch.prototype.update = function () {
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed
	Entity.prototype.update.call(this);
};

Branch.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1); //0.1
    Entity.prototype.draw.call(this);
};

function Obstacle_Spawner(game, spritesheet) {
	this.obstacles = [];
	this.game = game;
	this.spritesheet = spritesheet;
	this.counter = 0;
	this.previous = -1;
};

Obstacle_Spawner.prototype = new Entity();
Obstacle_Spawner.prototype.constructor = Obstacle_Spawner;

Obstacle_Spawner.prototype.update = function () {
	if(this.counter % Math.floor(225 / background_speed) === 0){
		var type = Math.floor(Math.random() * 100) + 1;
		  type %= 4;
		  var lane = Math.floor(Math.random() * 10) + 1;
		  lane %= 3;
		  while(lane === this.previous) {
			  lane = Math.floor(Math.random() * 10) + 1;
			  lane %= 3;
		  }
		  this.previous = lane;
		  switch(type) {
		  case 0: //Spikes
		  	this.obstacles.push(new Spike(this.game, this.spritesheet, lane));
		  	break;
		  case 1: //Crate
		      this.obstacles.push(new Crate(this.game, this.spritesheet, lane));
		      break;
		  case 2: //Oil
		  	this.obstacles.push(new Oil(this.game, this.spritesheet, lane));
		  	break;
		  case 3: //Branch
		  	this.obstacles.push(new Branch(this.game, this.spritesheet, lane));
		  	break;
		  }
	}
	var numObstacle = this.obstacles.length;
	for(i = 0; i < numObstacle; i++) {
		this.obstacles[i].update();
	}
	this.counter++;
};

Obstacle_Spawner.prototype.draw = function () {
	var numObstacle = this.obstacles.length;
	for(i = 0; i < numObstacle; i++) {
		this.obstacles[i].draw();
	}
};

AM.queueDownload("./img/bg3.png");
AM.queueDownload("./img/obstacles.png");
AM.queueDownload("./img/theboy.png");
AM.queueDownload("./img/enem.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/bg3.png")));
    gameEngine.addEntity(new Obstacle_Spawner(gameEngine, AM.getAsset("./img/obstacles.png")));
    gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/theboy.png")));
    gameEngine.addEntity(new OminousFigure(gameEngine, AM.getAsset("./img/enem.png")));
    gameEngine.addEntity(new Score(gameEngine, gameScore, "#FFFFFF", 280, 480));

    console.log("All Done!");
});
