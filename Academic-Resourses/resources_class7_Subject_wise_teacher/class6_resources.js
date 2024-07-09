
function openNav() {
  document.getElementById("mySidenav").style.width = "500px";
  document.getElementById("main").style.marginLeft = "450px";
  document.body.style.backgroundColor = "rgba(0,0,0,0)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
}

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
// document.body.style.backgroundColor="#A1BCFB";

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}