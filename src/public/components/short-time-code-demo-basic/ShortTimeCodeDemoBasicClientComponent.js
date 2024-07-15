import {BaseShortTimeCodeDemoClient} from '../common/BaseShortTimeCodeDemoClient.js';

const templateHtml = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <div>
        <fieldset>
            <div class="mb-3">
                <short-time-code-demo-client-code-generate></short-time-code-demo-client-code-generate>
    
                <div>
                    <small class="text-muted">
                        Click "Generate Code" to generate a new short time code which can be used to receive a message
                    </small>
                </div>
            </div>
    
            <div class="mb-3">
                <label for="receiver-message" class="form-label">Received message text:</label>
                <textarea id="receiver-message" class="form-control" readonly></textarea>
            </div>
        </fieldset>
    </div>
`;

export class ShortTimeCodeDemoBasicClientComponent extends BaseShortTimeCodeDemoClient {
    getTemplateHTML() {
        return templateHtml;
    }

    onMessageReceived(message) {
        console.log('Message received', message);
        const receiverMessageInput = this.shadow.getElementById('receiver-message');
        receiverMessageInput.value = message;
    }
}
