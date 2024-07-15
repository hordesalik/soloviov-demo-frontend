const templateHtml = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <div class="input-group">
            <label for="receiver-code" class="input-group-text">Your code is</label>
            <input type="text" readonly class="form-control" id="receiver-code"/>
            <button type="button" id="receiver-code-copy" class="btn btn-secondary">Copy</button>
            <button type="button" id="receiver-code-generate" class="btn btn-primary">Generate Code</button>
        </div>
    `;

export class ShortTimeCodeDemoClientCodeGenerateComponent extends HTMLElement {
    setSTCClient(client) {
        this.stcClient = client;
    }

    async connectedCallback() {
        const shadow = this.attachShadow({mode: "open"});
        const template = document.createElement('template');
        template.innerHTML = templateHtml;
        shadow.append(template.content);

        const receiverCodeInput = shadow.getElementById('receiver-code');
        const copyCodeButton = shadow.getElementById('receiver-code-copy');
        const generateCodeButton = shadow.getElementById('receiver-code-generate');

        async function onGenerateCodeButtonClick() {
            receiverCodeInput.value = await this.stcClient.generateCode();
        }
        generateCodeButton.addEventListener('click', onGenerateCodeButtonClick.bind(this));

        function onCopyCodeButtonClick() {
            receiverCodeInput.select();
            receiverCodeInput.setSelectionRange(0, 99999); // For mobile devices
            navigator.clipboard.writeText(receiverCodeInput.value);
        }
        copyCodeButton.addEventListener('click', onCopyCodeButtonClick);
    }
}
