import {BaseComponent} from '../common/BaseComponent.js';
import {ActionRequestClient} from '../../services/action-request/ActionRequestClient.js';

const templateHtml = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <div>
        <fieldset id="requester">
            <legend>Requester section</legend>
    
            <div class="mb-3 input-group">
                <label for="requester-code" class="input-group-text">Action Request receiver code:</label>
                <input type="text" id="requester-code" class="form-control"/>
                <button type="button" id="requester-send" class="btn btn-success">Send</button>
            </div>
        </fieldset>
    </div>
    
    <dialog-info></dialog-info>
    `;

export class ShortTimeCodeDemoAdvancedRequesterComponent extends BaseComponent {
    getTemplateHTML() {
        return templateHtml;
    }

    async onMessageReceived(message) {
        console.log('onMessageReceived', message);
        try {
            switch (message?.type) {
                case 'actionRequestUpdate':
                    await this.processActionRequestUpdate(message.actionRequest);
                    break;
                default:
                    console.log('Unexpected message is received', message);
            }
        } catch (e) {
            console.log('Error while processing a message', e);
        }
    }

    initARClient() {
        const arClient = new ActionRequestClient({
            onMessage: this.onMessageReceived.bind(this)
        });
        this.arClient = arClient;
        return arClient.startClient();
    }

    initRequesterSection() {
        const {shadow, arClient} = this;
        const codeInput = shadow.getElementById('requester-code');
        const sendButton = shadow.getElementById('requester-send');

        async function onSendClick() {
            try {
                const data = {
                    type: 'confirm',
                    message: 'Please confirm the action',
                };
                const responseObject = await arClient.createActionRequest(codeInput.value, data);
                console.log('Action Request created', responseObject);
            } catch (e) {
                console.error('Failed to create an Action Request', e);
            }
        }
        sendButton.addEventListener('click', onSendClick);
        return Promise.resolve();
    }

    async connectedCallback() {
        await super.connectedCallback();
        await this.initARClient();
        await this.initRequesterSection();
    }

    getActionRequestUpdateResultText(actionRequest) {
        const result = actionRequest?.result;
        switch (result) {
            case 'confirm':
                return 'confirmed';
            case 'reject':
                return 'rejected';
            default:
                console.log(`action request unexpected result: "${result}"`);
                return 'unexpected';
        }
    }

    async processActionRequestUpdate(actionRequest) {
        const messageText = this.getActionRequestUpdateResultText(actionRequest);
        const infoMessage = `Requested action is ${messageText}`;
        const infoDialog = this.shadow.querySelector('dialog-info');
        infoDialog.openDialog({
            message: infoMessage,
        });
    }
}
