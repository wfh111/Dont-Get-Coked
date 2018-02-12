var AM = new AssetManager();
var sheetHeight = 600;
var right_lane = 100;
var left_lane = -75;
var middle_lane = 15;
var current_lane;
var lane_size = 85;
var left_change = 0;
var right_change = 0;
var gameScore = 0;
var current_level = 1;
var background_speed = 3;
var spike_x;
var spike_y;

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
    this.speed = 3;
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
      if (this.speed < 4) {
        if (this.y >= sheetHeight)
          this.y = 0;
      }
};

Background.prototype.update = function () {
  if (this.speed <= 7) {
    this.speed *= 1.0001;
    background_speed = this.speed;
  }
};

// no inheritance
function Background2(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.speed = 3;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background2.prototype.draw = function () {
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
      if (this.speed < 5) {
        if (this.y >= sheetHeight)
          this.y = 0;
      }
};

Background2.prototype.update = function () {
  if (this.speed <= 7) {
    this.speed *= 1.0001;
    background_speed = this.speed;
  }
};

// no inheritance
function Background3(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.speed = 3;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background3.prototype.draw = function () {
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
      if (this.speed < 6) {
        if (this.y >= sheetHeight)
          this.y = 0;
      }
};

Background3.prototype.update = function () {
  if (this.speed <= 7) {
    this.speed *= 1.0001;
    background_speed = this.speed;
  }
};

// no inheritance
function Background4(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.speed = 3;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background4.prototype.draw = function () {
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

Background4.prototype.update = function () {
  if (this.speed <= 7) {
    this.speed *= 1.0001;
    background_speed = this.speed;
  }
};

function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;
}

BoundingBox.prototype.collide = function (oth) {
    if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
    return false;
}

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

function LevelDisplay(game, color, x, y) {
	this.color = color;
	this.x = x;
	this.y = y;
	this.ctx = game.ctx;
	this.ctx.font = "15px Arial";
	this.ctx.fillStyle = color;
	this.ctx.fillText("LEVEL " + current_level, this.x, this.y);
	Entity.call(this, game, x, y);
}

//Score.prototype = new Entity();
LevelDisplay.prototype.constructor = LevelDisplay;
LevelDisplay.prototype.update = function() {
	//this.score += Math.floor(background_speed);
  current_level = Math.floor(background_speed) - 2;
  if ((background_speed - Math.floor(background_speed) > 0.1) || background_speed >= 7) {
    this.x = 600;
    this.y = 600;
  } else {
    this.x = 170;
    this.y = 200;
  }
	this.ctx.fillText("LEVEL " + current_level, this.x, this.y);
	//Entity.prototype.update.call(this);
};
LevelDisplay.prototype.draw = function() {
	this.ctx.fillText("LEVEL " + current_level, this.x, this.y);
};

//original animation spritesheet, 189, 230, 5, 0.10, 14, true,1
function MushroomDude(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 338, 540, 0.05, 14, true);
    this.x = middle_lane;
    this.y = 0;
    this.speed = 5;
    this.game = game;
    this.Right = false;
    this.Left = false;
    this.Up = false;
    this.box = true;
    this.ctx = game.ctx;
	this.boundingbox = new BoundingBox(this.x + 150, this.y + 100, this.animation.frameWidth  - 270, this.animation.frameHeight - 430);
}

MushroomDude.prototype.draw = function () {
	if (this.box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x + 150, this.y + 100, 0.2);
	this.boundingbox.y = this.y + 100;
}

MushroomDude.prototype.update = function () {
    //if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
    //this.x += this.game.clockTick * this.speed;
    //if (this.x > 400) this.x = 0;
    if (this.x <= left_lane + (lane_size / 2)) {
      current_lane = left_lane;
    } else if (this.x > (left_lane + (lane_size / 2)) && this.x <= (right_lane - (lane_size / 2))) {
      current_lane = middle_lane;
    } else {
      current_lane = right_lane;
    }

    var rect1 ={x:this.x, y:this.y, width:67.6, height:108};
    var rect2 ={x:spike_x, y:spike_y, width:56.8, height:65.2};
    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) { // collision detected!
          console.log("Collision detected with spike@@@@ \n REEEEEEEEEEEEEEEEEeeeee");
          this.y += this.game.clockTick * 60;
    }
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
        this.boundingbox.x += this.speed;
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
        this.boundingbox.x -= this.speed;
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
      this.boundingbox.y -= this.game.clockTick * this.speed;
    }
}

function OminousFigure(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 201.2, 117.7, 0.07, 14, true);
    this.x = middle_lane - 125;
    this.y = 430;
    this.speed = 1;
    this.game = game;
    this.ctx = game.ctx;
    this.box = true;
	this.boundingbox = new BoundingBox(this.x + 150, this.y + 150, this.animation.frameWidth + 105, this.animation.frameHeight);
}

OminousFigure.prototype.draw = function () {
	if (this.box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x + 150, this.y + 100, 1.5);
}

OminousFigure.prototype.update = function () {
}

//0,512
function Spike (game, spritesheet, lane) {
	this.animation = new Animation(spritesheet, 0, 2450, 142, 163, 1, 1, 1, true);
	this.speed = 60;
	this.ctx = game.ctx;
	this.box = true;
	if (lane === 0) {
    	Entity.call(this, game, 80, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 167, -200);
    } else {
    	Entity.call(this, game, 255, -200);
    }
	this.boundingbox = new BoundingBox(this.x, this.y , this.animation.frameWidth - 75, this.animation.frameHeight - 90);
};

Spike.prototype = new Entity();
Spike.prototype.constructor = Spike;

Spike.prototype.update = function() {
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed;
  spike_x = this.x;
  spike_y = this.y;
  this.boundingbox.y = this.y;
	Entity.prototype.update.call(this);
};

Spike.prototype.draw = function () {
	if (this.box) {
//        this.ctx.strokeStyle = "red";
//        this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
        this.ctx.strokeStyle = "yellow";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.4);//0.4
    Entity.prototype.draw.call(this);
};
//0,0
// inheritance
function Crate(game, spritesheet, lane) {
    this.animation = new Animation(spritesheet, 0, 1905, 512, 512, 810, 1, 1, true);
    this.speed = 60;
    this.ctx = game.ctx;
	this.box = true;
    if (lane === 0) {
    	Entity.call(this, game, 87, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 175, -200);
    } else {
    	Entity.call(this, game, 260, -200);
    }
	this.boundingbox = new BoundingBox(this.x, this.y , this.animation.frameWidth - 460, this.animation.frameHeight - 460);
};

Crate.prototype = new Entity();
Crate.prototype.constructor = Crate;

Crate.prototype.update = function () {
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox.y = this.y;
	Entity.prototype.update.call(this);
};

Crate.prototype.draw = function () {
	if (this.box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);//.1
    Entity.prototype.draw.call(this);
};
//0, 1300
function Oil(game, spritesheet, lane) {
    this.animation = new Animation(spritesheet, 100, 3390, 776, 450, 810, 1, 1, true);
    this.speed = 60;
    this.ctx = game.ctx;
	this.box = true;
    if (lane === 0) {
    	Entity.call(this, game, 57, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 145, -200);
    } else {
    	Entity.call(this, game, 230, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 30, this.y, this.animation.frameWidth - 724, this.animation.frameHeight - 380);
};

Oil.prototype = new Entity();
Oil.prototype.constructor = Oil;

Oil.prototype.update = function () {
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox.y = this.y;
	Entity.prototype.update.call(this);
};

Oil.prototype.draw = function () {
	if (this.box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);//.2
    Entity.prototype.draw.call(this);
};
//0, 675
function Branch(game, spritesheet, lane) {
    this.animation = new Animation(spritesheet, 0, 2700, 800, 600, 810, 1, 1, true);
    this.speed = 60;
    this.ctx = game.ctx;
	this.box = true;
    if (lane === 0) {
    	Entity.call(this, game, 70, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 160, -200);
    } else {
    	Entity.call(this, game, 240, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 5, this.y , this.animation.frameWidth - 725, this.animation.frameHeight - 545);
};

Branch.prototype = new Entity();
Branch.prototype.constructor = Branch;

Branch.prototype.update = function () {
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox.y = this.y;
	Entity.prototype.update.call(this);
};

Branch.prototype.draw = function () {
	if (this.box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1); //0.1
    Entity.prototype.draw.call(this);
};

function Wall (game, spritesheet, lane) {
	this.animation = new Animation(spritesheet, 0, 1580, 200, 200, 200, 1, 1, true);
	this.speed = 60;
	this.ctx = game.ctx;
	this.box = true;
	if (lane === 0) {
    	Entity.call(this, game, 69, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 157, -200);
    } else {
    	Entity.call(this, game, 245, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 7, this.y, this.animation.frameWidth - 127, this.animation.frameHeight - 138);
};

Wall.prototype = new Entity();
Wall.prototype.constructor = Wall;

Wall.prototype.update = function() {
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox.y = this.y;
	Entity.prototype.update.call(this);
};

Wall.prototype.draw = function () {
	if (this.box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.4);//0.4
    Entity.prototype.draw.call(this);
};

function Target_Coke (game, spritesheet, lane) {
	this.animation = new Animation(spritesheet, 0, 990, 320, 185, .03, 14, true, false);
	this.speed = 120;
	this.ctx = game.ctx;
	this.box = true;
	if (lane === left_lane) {
    	Entity.call(this, game, 80, -200);
    } else if (lane === middle_lane) {
    	Entity.call(this, game, 170, -200);
    } else {
    	Entity.call(this, game, 257, -200);
    }
	this.boundingbox = new BoundingBox(this.x, this.y , this.animation.frameWidth - 255, this.animation.frameHeight - 148);
};

Target_Coke.prototype = new Entity();
Target_Coke.prototype.constructor = Target_Coke;

Target_Coke.prototype.update = function() {
	this.speed =  115 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox.y = this.y;
	Entity.prototype.update.call(this);
};

Target_Coke.prototype.draw = function () {
	if (this.box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);//0.4
    Entity.prototype.draw.call(this);
};

//function Side_Coke (game, spritesheet, lane) {
//	this.animation = new Animation(spritesheet, 0, 0, 190, 330, .2, 14, true, true);
//	this.speed = 80;
//	this.direction = "left";
//	this.ctx = game.ctx;
//    Entity.call(this, game, 300, 0);
//};
//
//Side_Coke.prototype = new Entity();
//Side_Coke.prototype.constructor = Side_Coke;
//
//Side_Coke.prototype.update = function() {
//	this.speed = 100 * background_speed;
//	this.x -= this.game.clockTick * this.speed;
//	this.y += this.game.clockTick * (60 * background_speed);
//	Entity.prototype.update.call(this);
//};
//
//Side_Coke.prototype.draw = function () {
//	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);//0.4
//    Entity.prototype.draw.call(this);
//};

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
	if(this.counter % Math.ceil(325 / background_speed) === 0){
		var type = Math.floor(Math.random() * 100) + 1;
		  type %= 5;
//		  type = 2; //Testing individual obstacles
		  var lane = Math.floor(Math.random() * 10) + 1;
		  lane %= 3;
//		  lane = 0; //Test obstacle in specific lane
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
		  case 4: //Wall
			  	this.obstacles.push(new Wall(this.game, this.spritesheet, 0));
			  	this.obstacles.push(new Wall(this.game, this.spritesheet, 1));
			  	this.obstacles.push(new Wall(this.game, this.spritesheet, 2));
			  	break;
//		  case 5: //Side_Coke
//			  this.obstacles.push(new Side_Coke(this.game, this.spritesheet, 3));
//			  break;
		  }
	} else if(this.counter % Math.ceil(1240 / background_speed) === 0) {
		this.obstacles.push(new Target_Coke(this.game, this.spritesheet, current_lane));
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
AM.queueDownload("./img/bg4.png");
AM.queueDownload("./img/bg5.png");
AM.queueDownload("./img/bg6.png");
AM.queueDownload("./img/obstacles.png");
AM.queueDownload("./img/theboy.png");
AM.queueDownload("./img/coke_sideways_figure.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background4(gameEngine, AM.getAsset("./img/bg6.png")));
    gameEngine.addEntity(new Background3(gameEngine, AM.getAsset("./img/bg5.png")));
    gameEngine.addEntity(new Background2(gameEngine, AM.getAsset("./img/bg4.png")));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/bg3.png")));
    gameEngine.addEntity(new Obstacle_Spawner(gameEngine, AM.getAsset("./img/obstacles.png")));
    gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/theboy.png")));
    gameEngine.addEntity(new OminousFigure(gameEngine, AM.getAsset("./img/coke_sideways_figure.png")));
    gameEngine.addEntity(new Score(gameEngine, gameScore, "yellow", 280, 480));
    gameEngine.addEntity(new LevelDisplay(gameEngine, "yellow", 170, 200));

    console.log("All Done!");
});
