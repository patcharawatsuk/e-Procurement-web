/*tooltip*/
function showTooltip(elm,arrow){
    var pos = getAbsPosition(elm);
    var posTop = pos[0];
    var posLeft = pos[1] + 10;
    var tooltip = document.getElementById("tooltips");
    var title = elm.getAttribute("tooltiptitle");
    var subtitle = elm.getAttribute("tooltipsup");
    tooltip.style.width = 'auto';

    tooltip.classList.add('eform-tooltip');
    
    tooltip.innerHTML = '<div class="title">' + title + '</div>';
    if(subtitle){
        tooltip.innerHTML = tooltip.innerHTML + '<div class="subtitle">' + subtitle + '</div>';
    }
    if(title == 'Calculations' && subtitle.length > 23){
        tooltip.style.width = '300px';
    }
    tooltip.style.display = 'block';
    if(tooltip.offsetWidth < 45){
        tooltip.style.width = '45px';
        tooltip.style.textAlign = "center";
    }else{
        tooltip.style.textAlign = "left";
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
    else if(arrow == 'arr-top-right'){
        ttLeft = posLeft + (elm.offsetWidth / 2) - tooltip.offsetWidth + 'px';
        mrLeft = 0;
        ttTop = posTop + tooltip.offsetHeight + 5 + 'px';
        mrTop = 0;
    }
    
    tooltip.classList.add(arrow);
    tooltip.style.left = ttLeft;
    tooltip.style.top = ttTop;
    tooltip.style.marginTop = mrTop;
    tooltip.style.marginLeft = mrLeft;
}

function hideTooltip(){
    var tooltip = document.getElementById("tooltips");
    tooltip.className = '';
    tooltip.style.display = 'none';
    tooltip.innerHTML = '';
}

// show/hide submenu
function showSubmenu(){
    document.getElementById("fullHeightModal").classList.toggle("open");
}

// left menu hint
function showHint(elm,hint){
    var pos = getAbsPosition(elm);
    var posTop = pos[0] + 5;
    var posLeft = pos[1] + elm.offsetWidth + 10;
    var tooltip = document.getElementById(hint);
    tooltip.style.display = 'block';
    tooltip.style.top = posTop + 'px';
    tooltip.style.left = posLeft + 'px';
}
function hideHint(hint){
    var tooltip = document.getElementById(hint);
    tooltip.style.display = 'none';
}

function toggleEl(elm) {
    el = document.getElementById(elm).classList;
    if (el.contains('open')) {
        el.remove('open');
    }else{
        el.add('open');
    }
}

// avl 
function showcontact(){
    var contactID = document.getElementById("appContact");
    var contactPos = getAbsPosition(contactID);
    var contactPosTop = contactPos[0];
    var contactPosLeft = contactPos[1];
    var contactH = contactID.offsetHeight;

    contactID.classList.add('show');
    boxContactDetail.style.left = contactPosLeft - 1 + 'px';
    boxContactDetail.style.top = contactPosTop - contactH - 5 + 'px';
    boxContactDetail.style.display = 'block';
}