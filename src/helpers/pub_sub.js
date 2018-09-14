const PubSub = {
  publish: function (channel, payload) {
    const event = new CustomEvent(channel, {
      detail: payload
    });
    document.dispatchEvent(event);
    // console.log(`PUBLISHING channel: ${channel},payload ${payload}`)
  },

  subscribe: function (channel, callback) {
    document.addEventListener(channel, callback);
    // console.log(` SUBSCRIBING: channel: ${channel}`)

  }
};

module.exports = PubSub;
