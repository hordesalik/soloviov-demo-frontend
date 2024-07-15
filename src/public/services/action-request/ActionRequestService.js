import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export class ActionRequestService {
    apiUrl = '/action-request-api';
    socketIoPath = '/action-request-api-ws/socket.io';

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

    async createActionRequest(sessionId, shortTimeCode, data) {
        const {apiUrl} = this;
        const response = await fetch(`${apiUrl}/action-request`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId,
                shortTimeCode,
                data,
            }),
        });
        if (!response.ok) {
            return Promise.reject(response);
        }

        return await response.json();
    }

    async sendActionRequestResult(token, result) {
        const {apiUrl} = this;
        const response = await fetch(`${apiUrl}/action-request/${token}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                result,
            }),
        });
        if (!response.ok) {
            return Promise.reject(response);
        }

        return await response.json();
    }
}
