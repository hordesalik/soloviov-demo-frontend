import {BaseComponent} from './BaseComponent.js';
import {ShortTimeCodeClient} from '../../services/short-time-code/ShortTimeCodeClient.js';

export class BaseShortTimeCodeDemoClient extends BaseComponent {
    onMessageReceived(message) {
        throw new Error('"onMessageReceived" method to be implemented');
    }

    initSTCClient() {
        const stcClient = new ShortTimeCodeClient({
            onMessage: this.onMessageReceived.bind(this)
        });
        this.stcClient = stcClient;
        return stcClient.startClient();
    }

    bindCodeGenerate() {
        const {shadow, stcClient} = this;
        const codeGenerate = shadow.querySelector('short-time-code-demo-client-code-generate');
        codeGenerate.setSTCClient(stcClient);
        return Promise.resolve();
    }

    async connectedCallback() {
        await super.connectedCallback();
        await this.initSTCClient();
        await this.bindCodeGenerate();
    }
}
