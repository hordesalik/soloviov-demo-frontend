import {actionRequestServiceInstance} from './actionRequestServiceInstance.js';

export class ActionRequestClient {
    sessionId = undefined;
    onMessage = () => {
    };

    constructor(config = {}) {
        Object.assign(this, config);
    }

    async startSession() {
        const {id} = await actionRequestServiceInstance.startSession();
        this.sessionId = id;

        return this.sessionId;
    }

    onWebsocketMessage(message) {
        this.onMessage(message);
    }

    async connectSocket() {
        const {sessionId} = this;
        const socket = await actionRequestServiceInstance.connectSocket(sessionId)
        socket.on('message', this.onWebsocketMessage.bind(this));
    }

    async startClient() {
        await this.startSession();
        await this.connectSocket();
    }

    async createActionRequest(shortTimeCode, data) {
        const {sessionId} = this;

        return await actionRequestServiceInstance.createActionRequest(sessionId, shortTimeCode, data);
    }
}
