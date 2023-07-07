function stooltip(elm,arrow){

    var pos = getAbsPosition(elm);
    var posTop = pos[0];
    var posLeft = pos[1] + 10;
    var tooltip = document.getElementById("tooltips");
    var title = elm.getAttribute("tooltiptitle");
    var subtitle = elm.getAttribute("tooltipsup");
    tooltip.style.width = 'auto';

    tooltip.classList.add('tooltip-sub');
    
    if(arrow == 'limit-2' || arrow == 'limit-4'){
        tooltip.innerHTML = '<div class="title title-nowrap">' + title + '</div>';
        tooltip.style.width = '230px';
        tooltip.style.textAlign = "center";
    }
    else {
        tooltip.innerHTML = '<div class="title">' + title + '</div>';
    }
    if(subtitle){
        tooltip.innerHTML = tooltip.innerHTML + '<div class="subtitle">' + subtitle + '</div>';
    }
    tooltip.style.display = 'block';
    if(tooltip.offsetWidth < 45){
        tooltip.style.width = '45px';
        tooltip.style.textAlign = "center";
    }else{
        if(arrow == 'limit-2' || arrow == 'limit-4'){
            tooltip.style.textAlign = "center";
        }
        else{
            tooltip.style.textAlign = "left";
        }
    }
    if(arrow == 'arr-left'){
        ttLeft = posLeft + elm.offsetWidth + 'px';
        mrLeft = 0;
        ttTop = posTop + (elm.offsetHeight/2) + 'px';
        mrTop = '-' + (tooltip.offsetHeight / 2) + 'px';
    }
    else if(arrow == 'arr-right'){
        ttLeft = posLeft - (elm.offsetWidth + tooltip.offsetWidth) + 'px';
        mrLeft = 0;
        ttTop = posTop + (elm.offsetHeight/2) + 'px';
        mrTop = '-' + (tooltip.offsetHeight / 2) + 'px';
    }
    else if(arrow == 'arr-top'){
        ttLeft = (posLeft) - (tooltip.offsetWidth / 2)  + 'px';
        mrLeft = 0;
        ttTop = posTop + elm.offsetHeight + 5 + 'px';
        mrTop = 0;
    }
    else if(arrow == 'arr-bottom'){
        //ttLeft = (posLeft) - (tooltip.offsetWidth / 2)  + 'px';
        ttLeft = pos[1] + (elm.offsetWidth / 2) + 'px';
        mrLeft = '-' + (tooltip.offsetWidth / 2)  + 'px';
        ttTop = posTop - tooltip.offsetHeight - 5 + 'px';
        mrTop = 0;
    }
    else if(arrow == 'arr-bottom-left'){
        ttLeft = pos[1] + 'px';
        mrLeft = '-6px';
        ttTop = posTop - tooltip.offsetHeight - 20 + 'px';
        mrTop = 0
    }
    else if(arrow == 'arr-top-right'){
        ttLeft = posLeft + (elm.offsetWidth / 2) - tooltip.offsetWidth + 'px';
        mrLeft = 0;
        ttTop = posTop + tooltip.offsetHeight + 5 + 'px';
        mrTop = 0;
    }
    else if(arrow == 'action'){
        ttLeft = pos[1] + (elm.offsetWidth / 2) + 'px';
        mrLeft = '-' + (tooltip.offsetWidth / 2)  + 'px';
        ttTop = posTop - tooltip.offsetHeight - 10 + 'px';
        mrTop = 0;
        arrow = 'arr-bottom';
    }
    else if(arrow == 'limit-2' || arrow == 'limit-4'){
        ttLeft = pos[1] + (elm.offsetWidth / 2) + 'px';
        mrLeft = '-' + (tooltip.offsetWidth / 2)  + 'px';
        ttTop = posTop - tooltip.offsetHeight - 10 + 'px';
        mrTop = 0;
        arrow = 'arr-bottom';
    }
    else if(arrow == 'disable-button-right'){
        ttLeft = posLeft - (elm.offsetWidth + tooltip.offsetWidth) + (elm.offsetWidth - 20) + 'px';
        mrLeft = 0;
        ttTop = posTop + (elm.offsetHeight/2) + 'px';
        mrTop = '-' + (tooltip.offsetHeight / 2) + 'px';
        arrow = 'arr-right';
    }
    
    tooltip.classList.add(arrow);
    tooltip.style.left = ttLeft;
    tooltip.style.top = ttTop;
    tooltip.style.marginTop = mrTop;
    tooltip.style.marginLeft = mrLeft;
}

function htooltip(){
    var tooltip = document.getElementById("tooltips");
    tooltip.className = '';
    tooltip.style.display = 'none';
    tooltip.innerHTML = '';
}
