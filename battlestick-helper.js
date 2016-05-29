// ==UserScript==
// @name        BattleStick Helper
// @namespace   http://battlestick.net/
// @include     http://battlestick.net/
// @version     1.0.0
// @grant       none
// @run-at      document-end
// ==/UserScript==

unsafeWindow.console.log('battlestick-helper: Activated');
var config = {
  mine: {
    enemyMineNeverHide: true
  }
};
/*
  --- Mine ---
  Fn: - Enemy mines never hide
*/
if (config.mine.enemyMineNeverHide) {
  unsafeWindow.Mine.prototype.update = function () {
    if (null !== myStickman && this.stickman !== myStickman && myStickman.life > 0) {
    } else null !== myStickman && myStickman.life <= 0 && (this.sprite.alpha = 1)
  }
}
