function hamburger() {
    let x = document.getElementById("df-nav");
    if (x.className === "df-nav") {
        x.className += " responsive";
    } else {
        x.className = "df-nav";
    }
} 