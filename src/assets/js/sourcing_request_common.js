window.addEventListener("load", checkTableScroll);
window.addEventListener("resize", checkTableScroll);
function checkTableScroll() {
    var tableFreeze = document.querySelector('.table-freeze-scroll');
    if (tableFreeze != null) {
        if (tableFreeze.scrollWidth > tableFreeze.clientWidth || window.innerWidth <= 812) {
            tableFreeze.querySelector('.table-freeze-right').classList.add("has-scroll");
        }
        else {
            tableFreeze.querySelector('.table-freeze-right').classList.remove("has-scroll");
        }
    }
}

window.addEventListener('load', (event) =>{
    let itemCut2 = document.querySelectorAll(".text-limit-2");
    for (let i=0; i<itemCut2.length; i++) {
        if(itemCut2[i].offsetHeight > 38) {
            itemCut2[i].classList.add("limit-2-line");
            itemCut2[i].setAttribute("tooltiptitle", itemCut2[i].textContent);
            itemCut2[i].setAttribute("onmouseover", "stooltip(this,'limit-2')");
            itemCut2[i].setAttribute("onmouseout", "htooltip()");
        }
    }
    let itemCut4 = document.querySelectorAll(".text-limit-4");
    for (let i=0; i<itemCut4.length; i++) {
        if(itemCut4[i].offsetHeight > 75) {
            itemCut4[i].classList.add("limit-4-line");
            itemCut4[i].setAttribute("tooltiptitle", itemCut4[i].textContent);
            itemCut4[i].setAttribute("onmouseover", "stooltip(this,'limit-4')");
            itemCut4[i].setAttribute("onmouseout", "htooltip()");
        }
    }
});

function toggleSubMenuAit(val, val2){
    var data = document.getElementsByClassName(val);
    if(val2[0]){
        // start when click on burger
        for (var i = 0; i < data.length; i++) {
            if(data[i].style.display == 'none'){
                data[i].style.display = 'list-item';
            }else{
                data[i].style.display = 'none';
            }
        }
        // start to watch toggle arrow icon
        val2[1].className == 'head' ? toggleArrowMenu(val2[1].parentElement.children[1].classList) : toggleArrowMenu(val2[1].classList);
        function toggleArrowMenu(ele){
            if (ele.contains('icon-arrow-menu-active')) {
                ele.remove('icon-arrow-menu-active');
                ele.add('icon-arrow-menu-top');
            }else{
                ele.add('icon-arrow-menu-active');
                ele.remove('icon-arrow-menu-top');
            }
        }
    }else{
        if(at.length == 0){
            val.classList.add("active");
        }else{
            if (ath.length >= 1) {
                ath[0].classList.remove("active-hover");
                val.classList.add("active-hover");
            }else{
                val.classList.add("active-hover");
            }
        }

        // set header in sub-menu
        var isHeader = val.children[1].innerHTML;
        menuOver.children[0].innerHTML = isHeader;

        // set cross in sub-menu
        var cross = document.createElement("i");
        cross.setAttribute("class", "icon-cross");
        cross.setAttribute("onClick", "clearIconMenu()");
        headMenuOver[0].appendChild(cross);

        // set child in sub-menu
        if (isHeader == "SOURCE") {
            createMenuElement(sr);
        }else if (isHeader == "REPORT") {
                createMenuElement(rp);
        }else{
            clearIconMenu(true);
        }
    }
}