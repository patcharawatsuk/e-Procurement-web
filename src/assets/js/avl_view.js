// sticky
var mainContent = document.getElementById("fullInner");
mainContent.onscroll = function() {myFunction()};
var contentSticky = document.getElementById("stickyMenu");
var hiddenLeft  = document.getElementById("hiddenSpace1");
function myFunction() {
    if (mainContent.scrollTop > 360) {
        contentSticky.classList.add("sticky");
        hiddenLeft.classList.remove("show");
        hiddenLeft.style.top = 60 + 'px';
        hiddenLeft.style.left = 20 + 'px';
    } else {
        contentSticky.classList.remove("sticky");
        wrapScrollPOS = getAbsPosition(contentSticky);
        hiddenLeft.style.top = wrapScrollPOS[0] + 'px';
        hiddenLeft.style.left = wrapScrollPOS[1] - 1 + 'px';
        hiddenLeft.classList.add('show');
    }
}
function showDetail(el){
    var contactPos = getAbsPosition(el);
    var contactPosTop = contactPos[0] + mainContent.scrollTop;
    var contactPosLeft = contactPos[1];
    var contactH = el.offsetHeight;

    el.classList.add('show');
    boxContactDetail.style.left = contactPosLeft - 1 + 'px';
    boxContactDetail.style.top = contactPosTop + 5 + 'px';
    boxContactDetail.style.display = 'block';
}

let mainNavLinks = document.querySelectorAll(".menu-link");
let mainSections = document.querySelectorAll(".content-section");
mainContent.addEventListener("scroll", event => {
    let fromTop = mainContent.scrollTop;
    console.log('s' + mainNavLinks[2]);
    mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        
        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            link.classList.add("current");
        } else if (mainNavLinks[2] == link && mainContent.offsetHeight + mainContent.scrollTop >= mainContent.scrollHeight) {
            mainNavLinks[1].classList.remove("current");
            link.classList.add("current");
        } else {
            link.classList.remove("current");
        }
    });
});