import {BaseComponent} from '../common/BaseComponent.js';
import {shortTimeCodeServiceInstance} from '../../services/short-time-code/shortTimeCodeServiceInstance.js';

const templateHtml = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <div>
        <fieldset>
            <div class="mb-3">
                <label for="sender-message" class="form-label">Message text:</label>
                <textarea id="sender-message" class="form-control"></textarea>
            </div>
    
            <div class="mb-3 input-group">
                <label for="sender-code" class="input-group-text">Message receiver code:</label>
                <input type="text" id="sender-code" class="form-control"/>
                <button type="button" id="sender-send" class="btn btn-success">Send</button>
            </div>
        </fieldset>
    </div>
`;

export class ShortTimeCodeDemoBasicSenderComponent extends BaseComponent {
    getTemplateHTML() {
        return templateHtml;
    }

    async connectedCallback() {
        await super.connectedCallback();
        await this.initSenderSection();
    }

    initSenderSection() {
        const {shadow} = this;
        const messageInput = shadow.getElementById('sender-message');
        const codeInput = shadow.getElementById('sender-code');
        const sendButton = shadow.getElementById('sender-send');

        async function onSendClick() {
            try {
                const responseObject = await shortTimeCodeServiceInstance.sendMessage(codeInput.value, messageInput.value);
                console.log('Message sent', responseObject);
            } catch (e) {
                console.error('Failed to send a message', e);
            }
        }

        sendButton.addEventListener('click', onSendClick);
        return Promise.resolve();
    }
}
