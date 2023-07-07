wrapScroll  = document.getElementById("stickyMenu");
mainScroll  = document.getElementById("tableScroll");
mainScrollW = mainScroll.offsetWidth;
mainScroll  = document.getElementById("tableScroll");
elmSticky   = document.getElementById("stickyThead");
tdCol       = document.querySelector('tbody .body-title');
tdChild     = tdCol.children;
tdWidth     = tdChild[1].offsetWidth;
trHead      = elmSticky.children;
trChild     = trHead[0].children;

if(trChild.length <= 5){
    coltdW  = parseInt((mainScrollW - 280) / (trChild.length - 1));
    for(i=0; i<trChild.length; i++){
        if(i>0){
            trChild[i].style.width = coltdW + 'px';
        }
    }
}

mainScroll.onscroll = function(e) {
    hasSticky = hasClass(contentSticky, 'sticky');
    if(hasSticky == false){
        wrapScrollPOS = getAbsPosition(wrapScroll);
        hiddenLeft.style.top = wrapScrollPOS[0] + 'px';
        hiddenLeft.style.left = wrapScrollPOS[1] - 1 + 'px';
        hiddenLeft.classList.add('show');
    }
    horizontal = e.currentTarget.scrollLeft;
    newleft = horizontal - 20;
    styleLeft = '-' + newleft + 'px';
    if(newleft < 0){
        styleLeft = horizontal + 20 + 'px';
    }
    elmSticky.style.left = styleLeft;
    elmSticky.style.width = mainScrollW + horizontal - 1 + 'px';
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
