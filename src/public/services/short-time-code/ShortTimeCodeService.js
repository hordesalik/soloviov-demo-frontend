import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export class ShortTimeCodeService {
    apiUrl = '/short-time-code-api';
    socketIoPath = '/short-time-code-api-ws/socket.io';

    async startSession() {
        const {apiUrl} = this;
        const response = await fetch(`${apiUrl}/sessions`, {
            method: 'post'
        });
        if (!response.ok) {
            return Promise.reject(response);
        }

        return await response.json();
    }

    async generateCode(sessionId) {
        const {apiUrl} = this;
        const response = await fetch(`${apiUrl}/short-time-codes`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId,
            }),
        });
        if (!response.ok) {
            return Promise.reject(response);
        }

        return await response.json();
    }

    async sendMessage(code, message) {
        const {apiUrl} = this;
        const response = await fetch(`${apiUrl}/messages`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                message,
            }),
        });
        if (!response.ok) {
            return Promise.reject(response);
        }

        return await response.json();
    }

    connectSocket(sessionId) {
        const {socketIoPath} = this;
        const socket = io({
            path: socketIoPath,
            transports: ['websocket'],
            reconnectionDelayMax: 10000,
            query: {
                sessionId
            }
        });

        return Promise.resolve(socket);
    }
}
