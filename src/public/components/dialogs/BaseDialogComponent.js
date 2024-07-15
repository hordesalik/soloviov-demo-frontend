import {BaseComponent} from '../common/BaseComponent.js';

export class BaseDialogComponent extends BaseComponent {
    disposables = [];

    initModal() {
        this.modalElement = this.shadow.querySelector('[data-js-modal]');
        this.modal = new window.bootstrap.Modal(this.modalElement);
        return Promise.resolve();
    }

    async connectedCallback() {
        await super.connectedCallback();
        await this.initModal();
    }

    closeDialog() {
        this.modal.hide();
    }

    openDialog() {
        this.dialogResult = undefined;
        const {modalElement, modal, disposables} = this;
        const removeDisposables = () => disposables.forEach(disposable => disposable());
        const closedPromise = new Promise((resolve) => {
            const resolveWithResult = () => resolve(this.dialogResult);
            modalElement.addEventListener('hide.bs.modal', resolveWithResult);
            const removeHideBsModalListener = () => modalElement.removeEventListener('hide.bs.modal', resolveWithResult);
            this.disposables.push(removeHideBsModalListener);
        });

        const dialogCloseAttribute = 'data-js-dialog-close';
        const dialogCloseElements = modalElement.querySelectorAll(`[${dialogCloseAttribute}]`);
        Array.from(dialogCloseElements).forEach((item) => {
            const onDialogCloseClick = () => {
                this.dialogResult = item.getAttribute(dialogCloseAttribute);
                this.closeDialog();
            };
            item.addEventListener('click', onDialogCloseClick);
            const removeOnDialogCloseClick = () => item.removeEventListener('click', onDialogCloseClick);
            this.disposables.push(removeOnDialogCloseClick);
        });

        closedPromise.then(() => removeDisposables());
        modal.show();

        return {
            closed: closedPromise,
        };
    }
}
