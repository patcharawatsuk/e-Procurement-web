// sticky
var mainContent = document.getElementById("fullInner");
mainContent.onscroll = function() {stickyFunction()};
var contentSticky = document.getElementById("stickyQtn");
var setSiicky = contentSticky.getAttribute("sticky");
var scrollSticky = 60;
function stickyFunction() {
    if(setSiicky) 
        scrollSticky = setSiicky;
    console.log(setSiicky);
    if (mainContent.scrollTop > scrollSticky) {
        contentSticky.classList.add("sticky");
    } else {
        contentSticky.classList.remove("sticky");
    }
}