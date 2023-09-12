class Select extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }
    connectedCallback(){

    }
    disconnectedCallback(){

    }
}

window.customElements.define("select-element",Select);