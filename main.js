var AM = new AssetManager();
var sheetHeight = 600;
var right_lane = 250;
var left_lane = 75;
var middle_lane = 165;
var current_lane;
var lane_size = 85;
var left_change = 0;
var right_change = 0;
var gameScore = 0;
var current_level = 1;
var background_speed = 3;
var bound_box = false;
//var bound_box = true; //To test
var gameEngine = new GameEngine();
var chaser;
var multiplier = 1;

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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	gameScore += Math.floor(background_speed) * multiplier;
	this.score = gameScore
	this.ctx.fillText("SCORE: " + this.score, this.x, this.y);
	//Entity.prototype.update.call(this);
};
Score.prototype.draw = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.ctx.fillText("SCORE: " + this.score, this.x, this.y);
};

function startScreen(game, img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;
	Entity.call(this, game, x, y);
}

startScreen.prototype = new Entity();
startScreen.prototype.constructor = startScreen;

startScreen.prototype.reset = function() {
	this.game.running = false;
}

startScreen.prototype.update = function() {
	if (this.game.click) {
		this.game.running = true;
	}
}

startScreen.prototype.draw = function(ctx) {
	if(this.game.running && this.game.over || this.game.noSG) return;
	if (!this.game.running) {
		ctx.drawImage(this.img, this.x, this.y);
		ctx.font = "20pt Arial";
		ctx.fillStyle = "white";
		if (this.game.mouse) {
			ctx.fillStyle = "white";
			ctx.fillText("Click For Pepsi!", 112, 550);
			ctx.font = "10pt Arial";
			ctx.fillText("Controls and Hints", 140, 20)
			ctx.fillText("Move: A and D or <- and ->" , 10, 40);
			ctx.fillText("Jump: Space Bar", 10, 55);
			ctx.fillText("Shoot: W", 10, 70);
			ctx.fillText("Collect Crystal Pepsi", 210, 40);
			ctx.fillText("for Invincibility!", 210, 55);
			ctx.fillText("Collect Party Food", 210, 85);
			ctx.fillText("to Regain Energy!", 210, 100);
			ctx.fillText("Shoot Coke Boxes!", 210, 470);
			ctx.fillText("Dodge Crates!", 210, 485);
			ctx.fillText("Jump Out of Spikes!", 210, 500);
			ctx.fillText("Do it For Pepsi!", 100, 485);
		}
		
	}
}

function gameOver(game, img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;
	Entity.call(this, game, x, y);
}

gameOver.prototype = new Entity();
gameOver.prototype.constructor = gameOver;

gameOver.prototype.update = function() {
	if(!this.game.running && !this.game.noSG) return;
	if (this.game.running && this.game.over) {
		this.game.running = false;
	}
}

gameOver.prototype.draw = function(ctx) {
	if(!this.game.running && !this.game.noSG) return;
	if(!this.game.running && this.game.over) { //need variable for when pepsi man is caught
		ctx.drawImage(this.img, this.x, this.y);
		ctx.font = "15pt Arial";
		ctx.fillStyle = "black";
		ctx.fillText("YOU GOT COKED!", 112, 100);
		ctx.fillText("Your Score: " + gameScore, 112, 150); //Need to add score variable, need to pass in score parameter?
		ctx.font = "20pt Arial";
		ctx.fillText("COKE HAS TAKEN OVER!", 40, 550);
	}
		
}

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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.ctx.fillText("LEVEL " + current_level, this.x, this.y);
};

//original animation spritesheet, 189, 230, 5, 0.10, 14, true,1
function PepsiMan(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 338, 540, 0.05, 14, true);
    this.jumpAnimation = new Animation(AM.getAsset("./img/jump.png"), 0, 0, 801, 894, 0.08, 4, false, true);
    this.shootAnimation = new Animation(AM.getAsset("./img/shoot.png"), 0, 0, 589, 594, 0.05, 4, false, true);
    //this.jumpAnimation = new Animation(AM.getAsset("./img/jump.png"), 0, 0, 799, 894, 0.05, 5, false, true);
    this.jumping = false;
    this.x = middle_lane;
    this.y = 150;
    this.groundY;
    this.speed = 5;
    this.game = game;
    this.Right = false;
    this.Left = false;
    this.shooting = false;
    this.fired = false;
    this.stuck = false;
    this.invincible = false;
    this.multiplierActive = false;
    this.boosted = false;
    this.spike;
    this.currentTime = this.game.clockTick;
    this.prevTime = this.game.clockTick;
    this.prevTimeM = this.game.clockTick;
    this.ctx = game.ctx;
	this.boundingbox = new BoundingBox(this.x + 20, this.y + 50, this.animation.frameWidth  - 290, this.animation.frameHeight - 530);
}

PepsiMan.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
  if (this.jumping) {
      this.jumpAnimation.drawFrame(this.game.clockTick, this.ctx, this.x - 15, this.y - 10, 0.14);
  } else if (this.shooting) {
      this.shootAnimation.drawFrame(this.game.clockTick, this.ctx, this.x - 20, this.y, 0.18);
  } else {
      this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);
  }
	//this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);
}

PepsiMan.prototype.update = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
    //if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
    //this.x += this.game.clockTick * this.speed;
    //if (this.x > 400) this.x = 0;
    if (this.y >= 100 && !this.stuck) { // makeshift stay alive scale
      this.y -= 0.1;
    }	
    if (this.boosted) {
    	this.invincibility = true;
    	if(this.y <= 100) {
    		this.boosted = false;
    		this.invincibility = false;
    	}
    	this.y -= 0.5;
    }
    this.currentTime += this.game.clockTick;
    if (this.invincible) {
//    	console.log(this.currentTime - this.prevTime); //Bug Check
    	if (this.currentTime - this.prevTime >= 10) {
    		this.invincible = false;
    	}
    }
    if (this.multiplierActive) {
    	if (this.currentTime - this.prevTimeM >= 15) {
    		this.multiplierActive = false;
    		multiplier = 1;
    	}
    }
    if (this.game.jumpButton) {
    	this.jumping = true;
    }
    if (this.jumping) {
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
            this.stuck = false;
            if (this.spike !== undefined) { //Fixed
                this.spike.live = false;
            }
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        if (jumpDistance > 0.46) {
          this.y += 3;
        } else {
          this.y -= 3;
        }
    }

    if (this.game.shootButton) {
      this.shooting = true;
      if (!this.fired) {
        gameEngine.addEntity(new Bullet(gameEngine, AM.getAsset("./img/pep16v2.png"), this));
        this.fired = true;
      }
    }
    if (this.shooting) {
        if (this.shootAnimation.isDone()) {
            this.shootAnimation.elapsedTime = 0;
            this.shooting = false;
            this.fired = false;
        }
    }

    if (this.x <= left_lane + (lane_size / 2)) {
      current_lane = left_lane;
    } else if (this.x > (left_lane + (lane_size / 2)) && this.x <= (right_lane - (lane_size / 2))) {
      current_lane = middle_lane;
    } else {
      current_lane = right_lane;
    }
    if (this.game.rightButton) {
      this.Right = true;
    } else {
      if (this.x >= right_lane || (Math.floor(this.x) == middle_lane) || this.Left) {
        right_change = 0;
        this.Right = false;
      }
    }
    if (this.Right && !this.stuck) {
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
    if (this.Left && !this.stuck) {
      if (this.x > left_lane) {
        this.x -= this.speed;
        this.boundingbox.x -= this.speed;
        left_change += this.speed;
      } else {
        left_change = 0;
        this.Left = false;
      }
    }
    for (var i = 0; i < this.game.powerups.length; i++) {
    	var pwr = this.game.powerups[i];
    	if(pwr instanceof Invincible && this.boundingbox.collide(pwr.boundingbox) && pwr.live) {
    		pwr.live = false;
    		this.invincible = true;
    		this.prevTime = this.currentTime;
    	}
    	if(pwr instanceof Score_Multiplier && this.boundingbox.collide(pwr.boundingbox) && pwr.live) {
    		pwr.live = false;
    		multiplier = 2;
    		this.multiplierActive = true;
    		this.prevTimeM = this.currentTime;
    	}
    	if(pwr instanceof Booster && this.boundingbox.collide(pwr.boundingbox) && pwr.live) {
    		this.boosted = true;
    		this.invincible = true;
    	}
    	if((pwr instanceof Burger || pwr instanceof Popsicle || pwr instanceof Icecream || pwr instanceof Pizza)
    			&& this.boundingbox.collide(pwr.boundingbox) && pwr.live) {
    		pwr.live = false;
    		this.y += .5;
    	}
    	if(pwr instanceof Money && this.boundingbox.collide(pwr.boundingbox) && pwr.live) {
    		gameScore += 200;
    		pwr.live = false;
    	}
    }
    for (var i = 0; i < this.game.obstacles.length; i++) {
    	var ob = this.game.obstacles[i];
    	if(ob instanceof Spike && this.boundingbox.collide(ob.boundingbox) && !this.invincible && !this.jumping && ob.live) {
    		this.y += this.game.clockTick * ob.speed;
    		this.stuck = true;
    		this.spike = ob;
    	}
    	if(ob instanceof Oil && this.boundingbox.collide(ob.boundingbox) && !this.invincible) {
    		this.y += this.game.clockTick * 60;
    		ob.live = false;
    	}
    	else if(ob instanceof Branch && this.boundingbox.collide(ob.boundingbox) && !this.invincible) {
    		this.y += this.game.clockTick * 100;
    		ob.live = false;
    	}
    	else if(ob instanceof Target_Coke && this.boundingbox.collide(ob.boundingbox) && !this.jumping && ob.live && !this.invincible) {
    		this.y += this.game.clockTick * 2000;
    		ob.live = false;
    	}
    	else if((ob instanceof Wall || ob instanceof Crate) && this.boundingbox.collide(ob.boundingbox) && !this.invincible && ob.live) {
    		this.y += this.game.clockTick * ob.speed;
    	}
    }
    if(this.jumping) {
    	this.boundingbox = new BoundingBox(this.x + 20, this.y + 80, this.animation.frameWidth  - 310, this.animation.frameHeight - 520);
    } 
    else {
    	this.boundingbox = new BoundingBox(this.x + 20, this.y + 50, this.animation.frameWidth  - 310, this.animation.frameHeight - 530);
    }
	if (this.boundingbox.collide(chaser.boundingbox)) {
		console.log("Game Over");
		this.game.finalScore = this.score;
		this.game.over = true;
		this.game.running = false;
		this.game.noSG = true;
	}
}

function OminousFigure(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 201.2, 117.7, 0.07, 14, true);
    this.x = -left_lane - 20;
    this.y = 430;
    this.speed = 1;
    this.game = game;
    this.ctx = game.ctx;
	this.boundingbox = new BoundingBox(this.x + 150, this.y + 160, this.animation.frameWidth + 105, this.animation.frameHeight);
}

OminousFigure.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x + 150, this.y + 100, 1.5);
}

OminousFigure.prototype.update = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
}

//0,512
function Spike (game, spritesheet, lane) {
	this.animation = new Animation(spritesheet, 0, 2455, 142, 163, 1, 1, 1, true);
	this.speed = 60;
	this.ctx = game.ctx;
	this.live = true;
	if (lane === 0) {
    	Entity.call(this, game, 80, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 167, -200);
    } else {
    	Entity.call(this, game, 255, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 5, this.y + 10, this.animation.frameWidth - 85, this.animation.frameHeight - 110);
};

Spike.prototype = new Entity();
Spike.prototype.constructor = Spike;

Spike.prototype.update = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	spike_x = this.x;
	spike_y = this.y;
	this.boundingbox = new BoundingBox(this.x + 5, this.y + 10, this.animation.frameWidth - 85, this.animation.frameHeight - 110);
	Entity.prototype.update.call(this);
};

Spike.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
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
    this.live = true;
    if (lane === 0) {
    	Entity.call(this, game, 87, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 175, -200);
    } else {
    	Entity.call(this, game, 260, -200);
    }
	this.boundingbox = new BoundingBox(this.x, this.y + 30, this.animation.frameWidth - 460, this.animation.frameHeight - 480);
};

Crate.prototype = new Entity();
Crate.prototype.constructor = Crate;

Crate.prototype.update = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x, this.y + 30, this.animation.frameWidth - 460, this.animation.frameHeight - 480);
	Entity.prototype.update.call(this);
};

Crate.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	if(this.live) {
	    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);//.1
	    Entity.prototype.draw.call(this);	
	}
};
//0, 1300
function Oil(game, spritesheet, lane) {
    this.animation = new Animation(spritesheet, 100, 3390, 776, 450, 810, 1, 1, true);
    this.speed = 60;
    this.ctx = game.ctx;
    this.live = true;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 30, this.y, this.animation.frameWidth - 724, this.animation.frameHeight - 380);
	Entity.prototype.update.call(this);
};

Oil.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);
    Entity.prototype.draw.call(this);
};
//0, 675
function Branch(game, spritesheet, lane) {
    this.animation = new Animation(spritesheet, 0, 2700, 800, 600, 810, 1, 1, true);
    this.speed = 60;
    this.ctx = game.ctx;
    this.live = true;
    if (lane === 0) {
    	Entity.call(this, game, 65, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 155, -200);
    } else {
    	Entity.call(this, game, 240, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 15, this.y , this.animation.frameWidth - 735, this.animation.frameHeight - 545);
};

Branch.prototype = new Entity();
Branch.prototype.constructor = Branch;

Branch.prototype.update = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 15, this.y , this.animation.frameWidth - 735, this.animation.frameHeight - 545);
	Entity.prototype.update.call(this);
};

Branch.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
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
	this.live = true;
	if (lane === 0) {
    	Entity.call(this, game, 69, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 157, -200);
    } else {
    	Entity.call(this, game, 245, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 7, this.y + 15, this.animation.frameWidth - 127, this.animation.frameHeight - 165);
};

Wall.prototype = new Entity();
Wall.prototype.constructor = Wall;

Wall.prototype.update = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed = 60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 7, this.y + 15, this.animation.frameWidth - 127, this.animation.frameHeight - 165);
	Entity.prototype.update.call(this);
};

Wall.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  } if (this.live) {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.4);//0.4
	    Entity.prototype.draw.call(this);
  }
};

function Target_Coke (game, spritesheet, lane) {
	this.animation = new Animation(spritesheet, 0, 990, 320, 185, .03, 14, true, false);
	this.speed = 120;
	this.ctx = game.ctx;
	this.live = true;
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed =  115 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x, this.y , this.animation.frameWidth - 255, this.animation.frameHeight - 148);
	Entity.prototype.update.call(this);
};

Target_Coke.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	if(this.live){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);//0.4
	    Entity.prototype.draw.call(this);
	}

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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if(this.counter % Math.ceil(325 / background_speed) === 0){
		var type = Math.floor(Math.random() * 100) + 1;
		  type %= 5;
//		  type = 1; //Testing individual obstacles
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
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	var numObstacle = this.obstacles.length;
	for(i = 0; i < numObstacle; i++) {
		this.obstacles[i].draw();
	}
};
function Invincible (game, spritesheet, lane) {
	this.animation = new Animation(spritesheet, 0, 92, 76, 75, .1, 16, true, false);
	this.speed = 60;
	this.ctx = game.ctx;
	this.live = true;
	if (lane === 0) {
    	Entity.call(this, game, 90, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 185, -200);
    } else {
    	Entity.call(this, game, 268, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 5, this.y + 20, this.animation.frameWidth - 55, this.animation.frameHeight - 45);
};

Invincible.prototype = new Entity();
Invincible.prototype.constructor = Invincible;

Invincible.prototype.update = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed =  60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 5, this.y + 20, this.animation.frameWidth - 55, this.animation.frameHeight - 45);
	Entity.prototype.update.call(this);
};

Invincible.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	if(this.live){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.8);
	    Entity.prototype.draw.call(this);
	}
};

function Score_Multiplier (game, spritesheet, lane) {
	this.animation = new Animation(spritesheet, 1, 0, 38.78, 45, .1, 6, true, false);
	this.speed = 60;
	this.ctx = game.ctx;
	this.live = true;
	if (lane === 0) {
    	Entity.call(this, game, 90, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 180, -200);
    } else {
    	Entity.call(this, game, 265, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 5, this.y + 5, this.animation.frameWidth - 10, this.animation.frameHeight - 10);
};

Score_Multiplier.prototype = new Entity();
Score_Multiplier.prototype.constructor = Score_Multiplier;

Score_Multiplier.prototype.update = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed =  60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 5, this.y + 5, this.animation.frameWidth - 10, this.animation.frameHeight - 10);
	Entity.prototype.update.call(this);
};

Score_Multiplier.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	if(this.live){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
	    Entity.prototype.draw.call(this);
	}
};

function Booster (game, spritesheet, lane) {
	this.animation = new Animation(spritesheet, 0, 50, 46, 40, .08, 7, true, false);
	this.speed = 60;
	this.ctx = game.ctx;
	this.live = true;
	if (lane === 0) {
    	Entity.call(this, game, 90, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 180, -200);
    } else {
    	Entity.call(this, game, 265, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 5, this.y + 15, this.animation.frameWidth - 20, this.animation.frameHeight - 10);
};

Booster.prototype = new Entity();
Booster.prototype.constructor = Booster;

Booster.prototype.update = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed =  60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 5, this.y + 15, this.animation.frameWidth - 20, this.animation.frameHeight - 10);
	Entity.prototype.update.call(this);
};

Booster.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	if(this.live){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1.2);
	    Entity.prototype.draw.call(this);
	}
};

function Money (game, spritesheet, lane) {
	this.animation = new Animation(spritesheet, 0, 238, 130, 64, .1, 30, true, false);
	this.speed = 60;
	this.ctx = game.ctx;
	this.live = true;
	if (lane === 0) {
    	Entity.call(this, game, 80, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 168, -200);
    } else {
    	Entity.call(this, game, 254, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 5, this.y + 15, this.animation.frameWidth - 40, this.animation.frameHeight - 30);
};

Money.prototype = new Entity();
Money.prototype.constructor = Money;

Money.prototype.update = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed =  60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 5, this.y + 15, this.animation.frameWidth - 75, this.animation.frameHeight - 50);
	Entity.prototype.update.call(this);
};

Money.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	if(this.live){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, .5);
	    Entity.prototype.draw.call(this);
	}
};

function Burger (game, spritesheet, lane, type) {
	this.animation = new Animation(spritesheet, 0, 618, 138, 101.5, .1, 48, true, false);
//	this.animation = new Animation(spritesheet, 0, 1835, 138, 101.5, .08, 48, true, false);
	this.speed = 60;
	this.ctx = game.ctx;
	this.live = true;
	this.type = type;
	if (lane === 0) {
    	Entity.call(this, game, 72, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 165, -200);
    } else {
    	Entity.call(this, game, 250, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 20, this.y + 8, this.animation.frameWidth - 110, this.animation.frameHeight - 70);
};

Burger.prototype = new Entity();
Burger.prototype.constructor = Burger;

Burger.prototype.update = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed =  60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 20, this.y + 8, this.animation.frameWidth - 110, this.animation.frameHeight - 70);
	Entity.prototype.update.call(this);
};

Burger.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	if(this.live){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.7);
	    Entity.prototype.draw.call(this);
	}
};

function Popsicle (game, spritesheet, lane, type) {
	this.animation = new Animation(spritesheet, 0, 1835, 138, 101.5, .07, 48, true, false);
	this.speed = 60;
	this.ctx = game.ctx;
	this.live = true;
	this.type = type;
	if (lane === 0) {
    	Entity.call(this, game, 80, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 165, -200);
    } else {
    	Entity.call(this, game, 250, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 20, this.y + 15, this.animation.frameWidth - 120, this.animation.frameHeight - 70);
};

Popsicle.prototype = new Entity();
Popsicle.prototype.constructor = Popsicle;

Popsicle.prototype.update = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed =  60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 20, this.y + 15, this.animation.frameWidth - 120, this.animation.frameHeight - 70);
	Entity.prototype.update.call(this);
};

Popsicle.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	if(this.live){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.7);
	    Entity.prototype.draw.call(this);
	}
};

function Icecream (game, spritesheet, lane, type) {
	this.animation = new Animation(spritesheet, 0, 3050, 145, 108, .08, 48, true, false);
	this.speed = 60;
	this.ctx = game.ctx;
	this.live = true;
	this.type = type;
	if (lane === 0) {
    	Entity.call(this, game, 85, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 175, -200);
    } else {
    	Entity.call(this, game, 260, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 10, this.y + 35, this.animation.frameWidth - 120, this.animation.frameHeight - 80);
};

Icecream.prototype = new Entity();
Icecream.prototype.constructor = Icecream;

Icecream.prototype.update = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed =  60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 10, this.y + 35, this.animation.frameWidth - 120, this.animation.frameHeight - 80);
	Entity.prototype.update.call(this);
};

Icecream.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	if(this.live){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.7);
	    Entity.prototype.draw.call(this);
	}
};

function Pizza (game, spritesheet, lane, type) {
	this.animation = new Animation(spritesheet, 0, 4338, 144, 107.8, .03, 48, true, false);
	this.speed = 60;
	this.ctx = game.ctx;
	this.live = true;
	this.type = type;
	if (lane === 0) {
    	Entity.call(this, game, 85, -200);
    } else if (lane === 1) {
    	Entity.call(this, game, 175, -200);
    } else {
    	Entity.call(this, game, 260, -200);
    }
	this.boundingbox = new BoundingBox(this.x + 10, this.y + 15, this.animation.frameWidth - 110, this.animation.frameHeight - 70);
};

Pizza.prototype = new Entity();
Pizza.prototype.constructor = Pizza;

Pizza.prototype.update = function() {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	this.speed =  60 * background_speed;
	this.y += this.game.clockTick * this.speed;
	this.boundingbox = new BoundingBox(this.x + 10, this.y + 15, this.animation.frameWidth - 110, this.animation.frameHeight - 70);
	Entity.prototype.update.call(this);
};

Pizza.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
//      this.ctx.strokeStyle = "red";
//      this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
  }
	if(this.live){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.7);
	    Entity.prototype.draw.call(this);
	}
};

function Powerup_Spawner(game, spritesheet) {
	this.powerups = [];
	this.game = game;
	this.spritesheet = spritesheet;
	this.counter = 0;
	this.previous = -1;
};

Powerup_Spawner.prototype = new Entity();
Powerup_Spawner.prototype.constructor = Powerup_Spawner;

Powerup_Spawner.prototype.update = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (this.counter % Math.ceil(9250 / background_speed) === 0 && this.counter !== 0) { //9250
		  var lane = Math.floor(Math.random() * 10) + 1;
		  lane %= 3;
//		  lane = 0; //Test powerup in specific lane
		  this.powerups.push(new Invincible(this.game, this.spritesheet, lane));
	}
	if (this.counter % Math.ceil(4275 / background_speed) === 0 && this.counter !== 0) { //4275
		var type = Math.floor(Math.random() * 100) + 1;
		type %= 2;
//		type = 0; //Testing individual powerup
		var lane = Math.floor(Math.random() * 10) + 1;
		lane %= 3;
//		lane = 0; //Test specific lane
		switch(type) {
		  case 0: //Score_Multiplier
			  	this.powerups.push(new Score_Multiplier(this.game, this.spritesheet, lane));
			  	break;
		  case 1: //Booster
			  	this.powerups.push(new Booster(this.game, this.spritesheet, lane));
			  	break;
		}
	}
	if (this.counter % Math.ceil(875 / background_speed) === 0 && this.counter !== 0) { //1785
		var type = Math.floor(Math.random() * 100) + 1;
		type %= 5;
//		type = 0; //Testing individual food
		var lane = Math.floor(Math.random() * 10) + 1;
		lane %= 3;
//		lane = 0; //Test specific lane
		switch(type) {
		case 0:
			this.powerups.push(new Money(this.game, this.spritesheet, lane));
			break;
		case 1:
			this.powerups.push(new Burger(this.game, this.spritesheet, lane));
			break;
		case 2:
			this.powerups.push(new Popsicle(this.game, this.spritesheet, lane));
			break;
		case 3:
			this.powerups.push(new Icecream(this.game, this.spritesheet, lane));
			break;
		case 4:
			this.powerups.push(new Pizza(this.game, this.spritesheet, lane));
		}

	}
	var numPowerup = this.powerups.length;
	for(i = 0; i < numPowerup; i++) {
		this.powerups[i].update();
	}
	this.counter++;
};

Powerup_Spawner.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	var numPowerup = this.powerups.length;
	for(i = 0; i < numPowerup; i++) {
		this.powerups[i].draw();
	}
};

// bullet
function Bullet(game, spritesheet, pepsimane) {
    this.animation = new Animation(spritesheet, 0, 0, 155.75, 156, 0.05, 16, true, true);
    this.x = pepsimane.x + 20;
    this.y = pepsimane.y - 5;
    this.startY = this.y;
    this.speed = 4;
    this.game = game;
    this.Right = false;
    this.Left = false;
    this.shooting = false;
    this.live = true;
    this.ctx = game.ctx;
	this.boundingbox = new BoundingBox(this.x, this.y + 4, this.animation.frameWidth - 130, this.animation.frameHeight - 100);
}

Bullet.prototype.draw = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
	if (bound_box) {
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
	}
	if(this.live){
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.15);
	}
}

Bullet.prototype.update = function () {
	if(!this.game.running || (!this.game.running && this.game.over)) return;
    //if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
    //this.x += this.game.clockTick * this.speed;
    //if (this.x > 400) this.x = 0;
    this.y -= this.speed;
    if (this.startY - this.y >= 230) {
    	this.live = false;
    }
	this.boundingbox = new BoundingBox(this.x, this.y + 4, this.animation.frameWidth - 130, this.animation.frameHeight - 100);
	for (var i = 0; i < this.game.obstacles.length; i++) {
		var ob = this.game.obstacles[i];
		if(ob instanceof Wall && this.boundingbox.collide(ob.boundingbox) && this.live && ob.live) {
			this.live = false;
			ob.live = false;
		}
	}
}

AM.queueDownload("./img/bg3.png");
AM.queueDownload("./img/bg4.png");
AM.queueDownload("./img/bg5.png");
AM.queueDownload("./img/bg6.png");
AM.queueDownload("./img/obstacles.png");
AM.queueDownload("./img/theboy.png");
AM.queueDownload("./img/jump.png");
AM.queueDownload("./img/shoot.png");
AM.queueDownload("./img/coke_sideways_figure.png");
AM.queueDownload("./img/Powerups.png");
AM.queueDownload("./img/pep16v2.png");
AM.queueDownload("./img/newpepsi.jpg");
AM.queueDownload("./img/newcoke.jpg");
AM.queueDownload("./img/crystal_pepsi.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
//    var gameEngine = new GameEngine();
    

    gameEngine.running = false;
    gameEngine.over = false;
    gameEngine.noSG = false;
    var SG = new startScreen(gameEngine, AM.getAsset("./img/newpepsi.jpg"), 0, 0);
    gameEngine.addEntity(SG);
    console.log(SG);
    
    var GO = new gameOver(gameEngine, AM.getAsset("./img/newcoke.jpg"), 0, 0);
    gameEngine.addEntity(GO);
    console.log(GO);
    
    gameEngine.init(ctx);
    gameEngine.start();
    var powerups = new Powerup_Spawner(gameEngine, AM.getAsset("./img/Powerups.png"));
    var obstacleSpawner = new Obstacle_Spawner(gameEngine, AM.getAsset("./img/obstacles.png"));
    chaser = new OminousFigure(gameEngine, AM.getAsset("./img/coke_sideways_figure.png"));
    gameEngine.addEntity(new Background4(gameEngine, AM.getAsset("./img/bg6.png")));
    gameEngine.addEntity(new Background3(gameEngine, AM.getAsset("./img/bg5.png")));
    gameEngine.addEntity(new Background2(gameEngine, AM.getAsset("./img/bg4.png")));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/bg3.png")));
    gameEngine.addEntity(obstacleSpawner);
    gameEngine.obstacles = obstacleSpawner.obstacles;
    gameEngine.addEntity(powerups);
    gameEngine.powerups = powerups.powerups;
    gameEngine.addEntity(new PepsiMan(gameEngine, AM.getAsset("./img/theboy.png")));
    gameEngine.addEntity(chaser);
    //gameEngine.addEntity(new Bullet(gameEngine, AM.getAsset("./img/pep16v2.png")));
    gameEngine.addEntity(new Score(gameEngine, gameScore, "yellow", 280, 480));
    gameEngine.addEntity(new LevelDisplay(gameEngine, "yellow", 170, 200));
    
    console.log("All Done!");
});
