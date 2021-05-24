// Estas funciones desactivan y activan el scroll respectivamente cuando se activa la ventana modal

let element = document.getElementById("main-container");

const hideOverflow = () => (element.style.overflow = "hidden");

const setOverflow = () => (element.style.overflow = "auto");
