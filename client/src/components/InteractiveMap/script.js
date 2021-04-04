const imap = document.getElementById("imap");
console.log(imap);

imap.onmousedown = e => {
    e.preventDefault();
    alert("you just clicked");
};