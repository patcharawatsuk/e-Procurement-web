
var mainScroll = document.getElementById("tableScroll");
var mainBox = document.getElementById("mainBox");
var mainScrollW = mainScroll.offsetWidth;
var mainBoxW = mainBox.offsetWidth;
mainBox.onscroll = function() {funcSticky()};

var mainTable = document.getElementById("mainTable");
var mainTableW = mainTable.offsetWidth;
var stickyOffset = offset(mainTable);
var stickyT = stickyOffset.top - 60;

var thead = document.getElementById("theadSticky");
var sticky = thead.scrollTop;

var ctrlBack = document.getElementById("colBack");
var ctrlNext = document.getElementById("colNext");
var hiddenSpace1 = document.getElementById("hiddenSpace1");
var hiddenSpace2 = document.getElementById("hiddenSpace2");

window.onload = function() {
    if(mainTableW > mainScrollW ){
        document.getElementById("colNext").style.display = "block";
    }
    setFixW();
    hiddenSpace.style.height = thead.offsetHeight;
}

function setFixW(){
    var elements = document.getElementsByClassName('fix-row-wrap');
    for (var i = 0, length = elements.length; i < length; i++) {
        elements[i].style.width = mainScrollW + 'px';
    }
}

function funcSticky(){
    if(mainBox.scrollTop > stickyT){
        thead.classList.add("thead-sticky");
        ctrlBack.classList.add("ctrl-col-sticky");
        ctrlNext.classList.add("ctrl-col-sticky");
        hiddenSpace1.style.display = "block";
        hiddenSpace2.style.display = "block";
        setThead();
    }else{
        thead.classList.remove("thead-sticky");
        ctrlBack.classList.remove("ctrl-col-sticky");
        ctrlNext.classList.remove("ctrl-col-sticky");
        hiddenSpace1.style.display = "none";
        hiddenSpace2.style.display = "none";
    }
}
function ctrlCol(act){
    var style = window.getComputedStyle(mainTable);
    var mgLeft = style.getPropertyValue('margin-left');
    var nextMargin = Math.abs(parseInt(mgLeft));
    var nextCol = nextMargin + 210;
    var chkCol = checkCol();
    var nbCol = chkCol.allCol - 5;
    var maxCol = nbCol * 210;
    var theadClass = thead.className;
    
    if(act == "next" && nextCol <= maxCol){
        if(nextMargin >= 210){
            nextColLeft = nextCol;
            theadColLeft = nextCol + 210;
        }
        else{
            nextColLeft = 210;
            theadColLeft = 0;
        }
        mainTable.style.marginLeft = '-'+nextColLeft+'px';

        if(theadClass == 'thead-sticky'){
            thead.style.width = (thead.offsetWidth + 210) + "px";
            thead.style.marginLeft = '-'+nextColLeft+'px';
        }
        if(ctrlBack.style.display == "none" || ctrlBack.style.display == false){
            ctrlBack.style.display = "block";
        }
        if(nextCol == maxCol){
            ctrlNext.style.display = "none";
        }
        
        
    }
    if(act == "back"){
        backMargin = nextMargin - 210;
        mainTable.style.marginLeft = '-'+backMargin+'px';
        if(theadClass == 'thead-sticky'){
            thead.style.width = (thead.offsetWidth - 210) + "px"
            thead.style.marginLeft = '-'+backMargin+'px';
        }
        ctrlNext.style.display = "block";
        if(backMargin == 0){
            ctrlBack.style.display = "none";
        }
    }
    
}
function setThead(){
    var style = window.getComputedStyle(mainTable);
    var mgLeft = style.getPropertyValue('margin-left');
    var nextMargin = Math.abs(parseInt(mgLeft));
    var theadW = nextMargin + mainScrollW - 192;
    if(nextMargin == 0){
        mgLeft = '-1px';
    }
    thead.style.marginLeft = mgLeft;
    thead.style.width = theadW + 'px';
    //- if(mgLeft > 0){
    //- 	theadW = mainScrollW - 192;
    //- 	setLeft = 0;
    //- }
    //- else{
    //- 	theadW = mainScrollW + 210;
    //- 	setLeft = 0;
    //- }

    //- console.log(colNow +'---'+ setLeft);
    //- thead.style.width = theadW+'px';
    //- thead.style.marginLeft = '-'+setLeft+'px';
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function checkCol(){
    allCol = Math.ceil((mainTableW - 190) / 210);
    return {allCol};
}

function ctrlAdditional(elm){
    document.getElementById("ctrlMore").classList.toggle("show");
    document.getElementById("additionalId").classList.toggle("show");
}

function hideGroup(par,elm,sub){
    document.getElementById(par).classList.toggle("no-expand");
    document.getElementById(elm).classList.toggle("close");
    if(sub){
        document.getElementById(elm).classList.toggle(sub);
    }
}