


function sidebarhide() {
    if (document.getElementById("sidebar") != null) {

        var sidebar = document.getElementById("sidebar"); //.style.display = "none"; //Remove Sidebar
        sidebar.parentNode.removeChild(sidebar);
        var mblesidebar = document.getElementById("btnSideBarToggle"); //.style.display = "none"; //Remove Sidebar Button on Mobile
        mblesidebar.parentNode.removeChild(mblesidebar);

        document.getElementById("imgPoweredByCpanel").style.display = "none"; //


    } else {
        setTimeout(sidebarhide, 100);
    }
}



setTimeout(sidebarhide, 100);
