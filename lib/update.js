const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

module.exports = {
  update() {
    // 检测更新
    const notifier = updateNotifier({ pkg });
    notifier.notify();
  }
};