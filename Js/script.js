/* To resize Iframe to its content*/
function resizeIframe(e){
    e.style.height = e.contentWindow.document.body.scrollHeight + 'px';
    if(e.src.split('/')[4] === "header.html"){
        $(".carousel-control")[1].style.top = e.style.height;
        $(".carousel-control")[0].style.top = e.style.height;
    }
}