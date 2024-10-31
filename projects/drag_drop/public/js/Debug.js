export default class Debug {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    show_msg(txt) {
        this.container.style.display = "block";
        this.container.innerText = txt;
    }

    hide_msg() {
        this.container.style.display = "none";
        this.container.innerText = "";
    }

}