import {BaseShortTimeCodeDemoClient} from '../common/BaseShortTimeCodeDemoClient.js';
import {actionRequestServiceInstance} from '../../services/action-request/actionRequestServiceInstance.js';

const templateHtml = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <div>
        <fieldset id="receiver" class="mb-3">
            <legend>Receiver</legend>
    
            <div class="mb-3">
                <short-time-code-demo-client-code-generate></short-time-code-demo-client-code-generate>
    
                <div>
                    <small class="text-muted">
                        Click "Generate Code" to generate a new short time code which can be used to receive a message
                    </small>
                </div>
            </div>
        </fieldset>
    </div>
    
    <dialog-confirm></dialog-confirm>
    `;

export class ShortTimeCodeDemoAdvancedClientComponent extends BaseShortTimeCodeDemoClient {
    getTemplateHTML() {
        return templateHtml;
    }

    async onMessageReceived(message) {
        console.log('onMessageReceived', message);
        try {
            switch (message?.data?.type) {
                case 'confirm':
                    await this.processConfirmMessage(message);
                    break;
                default:
                    console.log('Unexpected message is received', message);
            }
        } catch (e) {
            console.log('Error while processing a message', e);
        }
    }

    async processConfirmMessage(message) {
        const messageText = message?.data?.message || 'Please confirm a requesting action';
        const confirmDialog = this.shadow.querySelector('dialog-confirm');
        const confirmDialogResult = confirmDialog.openDialog({
            message: messageText,
        });
        const closedDialogResult = await confirmDialogResult.closed;
        const result = closedDialogResult === 'confirm' ? 'confirm' : 'reject';
        await actionRequestServiceInstance.sendActionRequestResult(message.token, result);
    }
}
