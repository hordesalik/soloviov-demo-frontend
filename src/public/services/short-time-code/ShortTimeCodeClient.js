import {shortTimeCodeServiceInstance} from './shortTimeCodeServiceInstance.js';

export class ShortTimeCodeClient {
    sessionId = undefined;

    onMessage = () => {
    };

    constructor(config = {}) {
        Object.assign(this, config);
    }

    async startSession() {
        const {id} = await shortTimeCodeServiceInstance.startSession();
        this.sessionId = id;

        return this.sessionId;
    }

    onWebsocketMessage(message) {
        this.onMessage(message);
    }

    async connectSocket() {
        const {sessionId} = this;
        const socket = await shortTimeCodeServiceInstance.connectSocket(sessionId)
        socket.on('message', this.onWebsocketMessage.bind(this));
    }

    async startClient() {
        await this.startSession();
        await this.connectSocket();
    }

    async generateCode() {
        const {sessionId} = this;
        const {code} = await shortTimeCodeServiceInstance.generateCode(sessionId);

        return code;
    }
}
