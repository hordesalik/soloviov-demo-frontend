export class BaseComponent extends HTMLElement {
    /**
     * @returns {string}
     */
    getTemplateHTML() {
        throw new Error('"getTemplateHTML" method to be implemented');
    }

    initShadow() {
        const shadow = this.attachShadow({mode: "open"});
        const template = document.createElement('template');
        template.innerHTML = this.getTemplateHTML();
        shadow.append(template.content);
        this.shadow = shadow;
        return Promise.resolve();
    }

    async connectedCallback() {
        await this.initShadow();
    }
}
