function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav(event) {
    console.log("CLOSE NAV");
    navbar = document.getElementById("mySidenav");
    mainContent = document.getElementById("main");
    navopenarea = document.getElementById("opennavarea");
    clickTarget = event.target;
    closebutton = document.getElementById("closebtn");

    console.log(clickTarget);
    if (clickTarget === navopenarea) {
        console.log("CLICKED OPEN");
        openNav();
    } else if (clickTarget === closebutton || (clickTarget !== navbar && !navbar.contains(clickTarget))) {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";


    }
}