"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebsocketTransport = void 0;
exports.createChannel = createChannel;
exports.default = void 0;

var _global = _interopRequireDefault(require("global"));

var _channels = require("@storybook/channels");

var _clientLogger = require("@storybook/client-logger");

var _telejson = require("telejson");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  WebSocket
} = _global.default;

class WebsocketTransport {
  constructor({
    url,
    onError
  }) {
    this.socket = void 0;
    this.handler = void 0;
    this.buffer = [];
    this.isReady = false;
    this.connect(url, onError);
  }

  setHandler(handler) {
    this.handler = handler;
  }

  send(event) {
    if (!this.isReady) {
      this.sendLater(event);
    } else {
      this.sendNow(event);
    }
  }

  sendLater(event) {
    this.buffer.push(event);
  }

  sendNow(event) {
    const data = (0, _telejson.stringify)(event, {
      maxDepth: 15,
      allowFunction: true
    });
    this.socket.send(data);
  }

  flush() {
    const {
      buffer
    } = this;
    this.buffer = [];
    buffer.forEach(event => this.send(event));
  }

  connect(url, onError) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.isReady = true;
      this.flush();
    };

    this.socket.onmessage = ({
      data
    }) => {
      const event = typeof data === 'string' && (0, _telejson.isJSON)(data) ? (0, _telejson.parse)(data) : data;
      this.handler(event);
    };

    this.socket.onerror = e => {
      if (onError) {
        onError(e);
      }
    };
  }

}

exports.WebsocketTransport = WebsocketTransport;

function createChannel({
  url,
  async = false,
  onError = err => _clientLogger.logger.warn(err)
}) {
  const transport = new WebsocketTransport({
    url,
    onError
  });
  return new _channels.Channel({
    transport,
    async
  });
} // backwards compat with builder-vite


var _default = createChannel;
exports.default = _default;