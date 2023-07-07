//script for new einvoice
var mainContent = document.getElementById("fullInner");
mainContent.onscroll = function() {myFunction()};
var contentSticky = document.getElementById("stickyRight");
function myFunction() {
    console.log(mainContent.scrollTop)
    if (mainContent.scrollTop > 195) {
        contentSticky.classList.add("sticky");
    } else {
        contentSticky.classList.remove("sticky");
    }
}
/*tooltip*/
function outTooltip(elm){
    var pos = getAbsPosition(elm);
    var posTop = pos[0];
    var posLeft = pos[1] + 10;
    var outTooltip = document.getElementById("tooltips");
    var title = elm.getAttribute("tooltiptitle");

    outTooltip.classList.add('op-tooltip-text','center');
    
    outTooltip.innerHTML = title;
    outTooltip.style.zIndex = 99;
    outTooltip.style.display = 'block';
    ttLeft = pos[1] + Math.floor((elm.offsetWidth / 2)) + 'px';
    mrLeft = '-' + Math.floor((outTooltip.offsetWidth / 2))  + 'px';
    ttTop = posTop - Math.floor(outTooltip.offsetHeight) - 8 + 'px';
    mrTop = 0;
    // if(arrow == 'arr-left'){
    //     ttLeft = posLeft + elm.offsetWidth + 'px';
    //     mrLeft = 0;
    //     ttTop = posTop + (elm.offsetHeight/2) + 'px';
    //     mrTop = '-' + (tooltip.offsetHeight / 2) + 'px';
    // }
    // else if(arrow == 'arr-right'){
    //     ttLeft = posLeft - (elm.offsetWidth + tooltip.offsetWidth) + 'px';
    //     mrLeft = 0;
    //     ttTop = posTop + (elm.offsetHeight/2) + 'px';
    //     mrTop = '-' + (tooltip.offsetHeight / 2) + 'px';
    // }
    // else if(arrow == 'arr-top'){
    //     ttLeft = (posLeft) - (tooltip.offsetWidth / 2)  + 'px';
    //     mrLeft = 0;
    //     ttTop = posTop + elm.offsetHeight + 5 + 'px';
    //     mrTop = 0;
    // }
    // else if(arrow == 'arr-bottom'){
    //     //ttLeft = (posLeft) - (tooltip.offsetWidth / 2)  + 'px';
    //     ttLeft = pos[1] + (elm.offsetWidth / 2) + 'px';
    //     mrLeft = '-' + (tooltip.offsetWidth / 2)  + 'px';
    //     ttTop = posTop - tooltip.offsetHeight - 5 + 'px';
    //     mrTop = 0;
    // }
    // else if(arrow == 'arr-top-right'){
    //     ttLeft = posLeft + (elm.offsetWidth / 2) - tooltip.offsetWidth + 'px';
    //     mrLeft = 0;
    //     ttTop = posTop + tooltip.offsetHeight + 5 + 'px';
    //     mrTop = 0;
    // }
    
    //tooltip.classList.add(arrow);
    outTooltip.style.left = ttLeft;
    outTooltip.style.top = ttTop;
    outTooltip.style.marginTop = mrTop;
    outTooltip.style.marginLeft = mrLeft;
}

function houtTooltip(){
    var outTooltip = document.getElementById("tooltips");
    outTooltip.className = '';
    outTooltip.style.display = 'none';
    outTooltip.innerHTML = '';
}

function toggleAppBox(elm) {
    var x = elm.parentElement;
    x.classList.toggle("show");
}
function toggleUDetail(elm){
    // var pos = getAbsPosition(elm);
    // var detail = elm.querySelectorAll('.approver-detail-pop');
    // var box = detail[0];
    // box.style.display = "block";
    // var boxH = box.offsetHeight;
    // box.style.position = "fixed";
    // box.style.top = (pos[0] - box.clientHeight + 38) +"px";
    // box.style.left = pos[1]+ 228 +"px";
    elm.classList.toggle("open");
}