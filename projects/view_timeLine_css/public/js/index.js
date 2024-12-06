window.addEventListener("load", function () {
    const navBar = document.querySelector(".navbar");
    const height = navBar.offsetHeight + 15;
    document.querySelector("main").style.marginTop = `${height}px`;

    // AVISO TOAST
    $('.toast').toast("show");
})
