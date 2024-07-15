import {BaseDialogComponent} from '../BaseDialogComponent.js';

const templateHtml = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <div class="modal" tabindex="-1" data-js-modal>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" data-js-title></h5>
            <button type="button" class="btn-close" data-js-dialog-close aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p data-js-message></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-js-dialog-close="cancel">Cancel</button>
            <button type="button" class="btn btn-primary" data-js-dialog-close="confirm">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    `;


export class DialogConfirmComponent extends BaseDialogComponent {
    getTemplateHTML() {
        return templateHtml;
    }

    openDialog({
                   title = 'Please confirm',
                   message = '',
               }) {
        const {modalElement} = this;
        modalElement.querySelector('[data-js-title]').textContent = title;
        modalElement.querySelector('[data-js-message]').textContent = message;
        return super.openDialog();
    }
}
