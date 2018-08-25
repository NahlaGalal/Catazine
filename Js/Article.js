const english = /^[A-Za-z0-9?]*$/;

let article = document.querySelector("main section p");
let string = Array.from(document.querySelector("main section p").textContent.split(' '));
article.innerHTML = ""; 
let inHtml = "";
for(word of string){
    if(english.test(word) && word!=''){
        inHtml = "<span class='eng'>";
        inHtml += ' ' + word + "</span>";
        article.innerHTML += inHtml ;
    }
    else{
        article.innerHTML += ' ' + word;
    }
}