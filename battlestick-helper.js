// ==UserScript==
// @name        BattleStick Helper
// @namespace   http://battlestick.net/
// @include     http://battlestick.net/
// @version     1.3.0
// @grant       none
// @run-at      document-end
// ==/UserScript==

unsafeWindow.console.log('battlestick-helper: Activated');
var enums = {
  SKINS: {
    BEAR: 'bear',
    CLASSICAL: 'classical', // Default
    COWBOY: 'cowboy',
    HITSTICK: 'hitstick',
    JVC: 'jvc',
    MILITARY: 'military',
    MOOMAN: 'mooman',
    MUSCLOR: 'musclor',
    NINJA: 'ninja',
    SCIENTIST: 'scientist',
    STICKCENA: 'stickcena',
  },
};

var config = {
  fakeDeath: {
    doNotHideName: true,
    doNotHideLifeBar: true,
  },
  mine: {
    enemyMineIdentifier: {
      active: true,
      myColor: 0x00ffff, // Cyan
      enemyColor: 0xff00ff, // Violet
    },
    enemyMineNeverHide: true
  },
  stickman: {
    speedRun: 350, // default: 250
    speedJump: 550, // default: 400
    recolor: {
      active: true,
      enemyColor: 0xff00ff, // Violet
    },
    skin: enums.SKIN.NINJA
  },
};
// Helper
var isMyStickMan = function() {
  return null !== myStickman && this.stickman === myStickman;
}

// --- Mine ---
// Fn: - Enemy mines never hide
Mine.prototype._update = Mine.prototype.update;
Mine.prototype.update = function () {
  this._update();
  if (config.mine.enemyMineNeverHide) {
    this.sprite.alpha = 1;
  }
};
// Fn: - Mine colorisation depending on enemy/your
Mine.prototype._create = Mine.prototype.create;
Mine.prototype.create = function() {
  this._create();
  if (config.mine.enemyMineIdentifier.active) {
    this.sprite.tint = isMyStickMan.call(this) ? config.mine.enemyMineIdentifier.myColor : config.mine.enemyMineIdentifier.enemyColor;;
  }
};
// --- Fake Death ---
Stickman.prototype._displayLifeBar = Stickman.prototype.displayLifeBar;
Stickman.prototype.displayLifeBar = function () {
  this._displayLifeBar();
  if (config.fakeDeath.doNotHideLifeBar) {
    // Bar background (black)
    this.graphics.lineStyle(5, 0);
    this.graphics.moveTo(this.head.position.x - 26 * this.lifeMax / 1000, this.head.position.y - 45);
    this.graphics.lineTo(this.head.position.x + 25 * this.lifeMax / 1000, this.head.position.y - 45);
    // Actual life
    this === myStickman ? this.graphics.lineStyle(3, 3407616) : this.graphics.lineStyle(3, 16724736);
    this.graphics.moveTo(this.head.position.x - 25 * this.lifeMax / 1000, this.head.position.y - 45);
    this.graphics.lineTo(this.head.position.x - 25 * this.lifeMax / 1000 + this.life * (49 * this.lifeMax / 1000) / this.lifeMax, this.head.position.y - 45);
  }
  // Name
  if (config.fakeDeath.doNotHideName) {
    if (this.life > 0) {
      this.nickname.text = this.name;
    }
  }
};
// Enemy stickman recolorisation
// Stickman attribute changes
Stickman.prototype._create = Stickman.prototype.create;
Stickman.prototype.create = function () {
  this._create();
  if (config.stickman.recolor.active) {
    if (this !== myStickman) {
      this.sprites.forEach(function(spr) {
        spr.tint = config.stickman.recolor.enemyColor;
      });
    }
  }
  if (this === myStickman) {
    this.speedRun = config.stickman.speedRun;
    this.speedJump = config.stickman.speedJump;
    this.skin = config.stickman.skin;
  }
};
