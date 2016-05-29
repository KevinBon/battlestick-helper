// ==UserScript==
// @name        BattleStick Helper
// @namespace   http://battlestick.net/
// @include     http://battlestick.net/
// @version     1.1.0
// @grant       none
// @run-at      document-end
// ==/UserScript==

unsafeWindow.console.log('battlestick-helper: Activated');
var config = {
  mine: {
    enemyMineIdentifier: {
      active: true,
      myColor: 0x00ffff, // Cyan
      enemyColor: 0xff00ff, // Violet
    },
    enemyMineNeverHide: true
  }
};
// Helper
var isMyStickMan = function() {
  return null !== myStickman && this.stickman === myStickman;
}

 // --- Mine ---
// Fn: - Enemy mines never hide
if (config.mine.enemyMineNeverHide) {
  unsafeWindow.Mine.prototype.update = function () {
    if (null !== myStickman && this.stickman !== myStickman && myStickman.life > 0) {
    } else null !== myStickman && myStickman.life <= 0 && (this.sprite.alpha = 1)
  }
}
if (config.mine.enemyMineIdentifier.active) {
  unsafeWindow.Mine.prototype._create = unsafeWindow.Mine.prototype.create;
  unsafeWindow.Mine.prototype.create = function() {
    this._create();
    this.sprite.tint = isMyStickMan.call(this) ? config.mine.enemyMineIdentifier.myColor : config.mine.enemyMineIdentifier.enemyColor;;
  }
}
