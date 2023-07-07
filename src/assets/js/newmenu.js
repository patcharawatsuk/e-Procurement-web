var userBrowser = function() {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
};
//console.log(userBrowser());
var mainBody = document.getElementsByTagName('body')[0];
var body = document.getElementById('bodyContainer');
var navLeft = document.getElementById('navSlide');
var mainContent = document.getElementById('pageContent');
var boxOverlay = document.getElementById('boxOverlay');

function showModal(modalID) {
    document.getElementById(modalID).style.display = 'block';
    //console.log(mainBody);
    mainBody.classList.add('body-fixed');
}

function hideModal(modalID) {
    var elements = document.getElementsByClassName('modal');
    if (modalID == null) {
        for (var i = 0, length = elements.length; i < length; i++) {
            if (elements[i].style.display == 'block') {
                elements[i].style.display = 'none';
            }
        }
    } else {
        document.getElementById(modalID).style.display = 'none';
    }

    mainBody.classList.remove('body-fixed');
}

function ctrlNav() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (navLeft.classList.contains("close")) {
        navLeft.classList.remove('close');
        navLeft.classList.add('open');
        mainContent.classList.remove('full');
        if (width < 769) {
            boxOverlay.classList.add('show');
            // add listener to disable scroll
            mainBody.classList.add('body-fixed');
        }
    } else {
        navLeft.classList.remove('open');
        navLeft.classList.add('close');
        mainContent.classList.add('full');
        if (boxOverlay.classList.contains("show")) {
            boxOverlay.classList.remove('show');
            // Remove listener to disable scroll
            mainBody.classList.remove('body-fixed');
        }
    }
}


// V2
// menu set
var at = navLeft.getElementsByClassName("active");
var ath = navLeft.getElementsByClassName("active-hover");
var ulList = document.getElementById("ul-left-list");
var boxOver = document.getElementById('overlay-box');
var menuOver = document.getElementById('overlay-menu');
var subMenuOver = document.getElementById('header-submenu');
var headMenuOver = document.getElementsByClassName('header-menu'); 

var em = [
            // {name : 'EASY QUOTE',isHead : true},
            {name : 'Request for Quotation',isHead : false},
            {name : 'Manage RFQ',isHead : false}
         ];
var pm = [
            {name : 'PR/PO/GR',isHead : false},
            {name : 'Approve & Review',isHead : false}
         ];
var im = [
            {name : 'Invoice Receipt',isHead : false},
            {name : 'Approve',isHead : false}
         ];
var sm = [
            {name : 'Dashboard',isHead : false},
            {name : 'Transaction Report',isHead : false},
            {name : 'Budget',isHead : false}
         ];

var ulHead = ulList.getElementsByClassName("head");
var ulAction = ulList.getElementsByClassName("take-action");
var ulMenu = ['erfx','purc','invo','spen'];
// when click burger expand menu
function ctrlNavIcon() {
    if (width > 1160) {
        if(navLeft.classList.length == 1){
            clearIconMenu();
            clearHidden('list-item');
            navLeft.classList.add('open');
            mainContent.classList.add('full');
            for (var i = 0; i < ulHead.length; i++) {
                ulHead[i].setAttribute( "onClick", 'toggleSubMenu("sub-' + ulMenu[i] + '",[true,this])' );
            }
        }else{
            clearHidden('none');
            navLeft.classList.remove('open');
            mainContent.classList.remove('full');
            for (var i = 0; i < ulHead.length; i++) {
                ulHead[i].setAttribute( "onClick", 'toggleSubMenu(this,false)' );
            }
        }
    }else{
        navLeft.style.display = navLeft.style.display == '' || navLeft.style.display == 'none' ? 'block' : 'none';
        boxOver.style.display = boxOver.style.display == '' || boxOver.style.display == 'none' ? 'block' : 'none';
    }
}

function toggleSubMenu(val,val2){
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
        // start click on icon
        // set active in sub-menu
        // if(at.length == 0){
        //     val.classList.add("active");
        // }else{
        //     at[0].classList.remove("active");
        //     val.classList.add("active");
        // }
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
            createMenuElement(em);
        }else if (isHeader == "PURCHASE") {
            createMenuElement(pm);
        }else if (isHeader == "INVOICE") {
            createMenuElement(im);
        }else if (isHeader == "SPEND ANALYSIS") {
            createMenuElement(sm);
        }else{
            clearIconMenu(true);
        }
    }
}
// to set element of li
function createMenuElement(val){
    if (subMenuOver.children.length > 0) {
        while (subMenuOver.hasChildNodes()) {
            subMenuOver.removeChild(subMenuOver.firstChild);
        }
    }
    for (var i = 0; i < val.length; i++) {
        // set li
        var li = document.createElement("li");
        if(val[i].isHead){
            li.setAttribute("class", "list-menu-head");
        }else{
            li.setAttribute("class", "list-menu");
        }
        // set a
        var a = document.createElement("a");
        a.href="#";
        a.innerHTML= val[i].name;
        // add a to li
        li.appendChild(a);
        // add li to ul
        subMenuOver.appendChild(li);
    }  

    // hide and show menu
    boxOver.style.display = 'block';
    menuOver.style.display = 'block';
}
// when click burger always clear menu from hide to show all
function clearHidden(val){
    var hid = document.getElementsByClassName('hided');
    for (var i = 0; i < hid.length; i++) {
        hid[i].style.display=val;
    }
}
// when click burger or click other icon there will be close
function clearIconMenu(val){
    boxOver.style.display = 'none';
    menuOver.style.display = 'none';
    if (!val) {
        // debugger
        // if (at.length > 0) {
        //     at[0].classList.remove("active");
        // } 
        if (ath.length > 0) {
            ath[0].classList.remove("active-hover");
        } 
    }
    if (width < 769) {
        navLeft.style.display = 'none';
    }
}
// END V2

var hideMenu = function() {
    boxOverlay.classList.remove('show');
    navLeft.classList.remove('open');
    navLeft.classList.add('close');
    mainBody.classList.remove('body-fixed');
}

function ctrlDropdown(el) {
    // show/hide dropdown
    el.parentElement.classList.toggle("open");
    if (boxOverlay.classList.contains("show")) {
        hideMenu();
    }
}

var hideDDMenu = function(target, el, cls) {
    var othersDiv = document.getElementsByClassName(el);
    var targetSelector = getSelector(target);
    var elSelector;

    if (target.parentElement.className != 'box-input-dropdown-search') {
        for (var i = 0; i < othersDiv.length; i++) {
            elSelector = getSelector(othersDiv[i]);
            if (target.parentElement.className === othersDiv[i].parentElement.className) {
                if (targetSelector != elSelector) {
                    othersDiv[i].parentElement.classList.remove(cls);
                }
            } else {
                othersDiv[i].parentElement.classList.remove(cls);
            }

            /*if(targetName != othersDiv[i].className && othersDiv[i].parentElement.classList.contains(cls)) {
                othersDiv[i].parentElement.classList.remove(cls);
            }*/
        }
    }

}

function getSelector(_context) {
    var index, localName, pathSelector, that = _context,
        node;
    if (that == 'null') throw 'not an  dom reference';
    index = getIndex(that);

    while (that.tagName) {
        pathSelector = that.localName + (that.className ? '.' + that.className : '') + (pathSelector ? '>' + pathSelector : '');
        that = that.parentNode;
    }
    pathSelector = pathSelector + ':nth-of-type(' + index + ')';

    return pathSelector;
}

function getIndex(node) {
    var i = 1;
    var tagName = node.tagName;

    while (node.previousSibling) {
        node = node.previousSibling;
        if (node.nodeType === 1 && (tagName.toLowerCase() == node.tagName.toLowerCase())) {
            i++;
        }
    }
    return i;
}

function addListenerMulti(el, eventNames, listener) {
    var events = eventNames.split(' ');
    for (var i = 0, iLen = events.length; i < iLen; i++) {
        el.addEventListener(events[i], listener, false);
    }
}

addListenerMulti(mainBody, 'mouseup touchend', function(event) {
    var target = event.target || event.srcElement;
    hideDDMenu(target, 'box-dropdown-title', 'open');
});

//for mobile overlay menu
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//change window size
window.addEventListener('resize', function(event) {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 769) {
        navLeft.style.display = 'none';
    } else {
        navLeft.style.display = 'block';
    }
});

var tabMenu = document.getElementsByClassName('frontend-tab-menu');
// onload
function r(f) {
    /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f()
    if (tabMenu.length != 0 && tabMenu[0].children.length <= 2) {
        tabMenu[0].classList.add('only-one-tab')
    }
}

// use like
r(function() {
    //alert('DOM Ready!');
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //console.log(width);
    if (width < 769) {
        navLeft.classList.remove('open');
        navLeft.classList.add('close');
        if (userBrowser() === 'MSIE 8' || userBrowser() === 'MSIE 9') {
            mainContent.style.marginLeft = '0px';
            mainContent.classList.add('bodyfix');
        }
    }
});
/*tooltip*/
var tooltips = document.querySelectorAll('.op-tooltip');
var tooltip = '',
    html_org = '',
    html_calc = '',
    text = '';

window.onmousemove = function(event) {
    var target = event.target || event.srcElement;
    var tooltip = target.parentElement.className.indexOf("op-tooltip");
    /*if (document.getElementById("opTooltip")) {
        mainBody.removeChild(document.getElementById("opTooltip"));
    }*/
    removeTooltip();
    
    if (tooltip != -1) {
        showTooltip(target.parentElement);
    }
};

function showTooltip(tooltip) {

    var html_org = tooltip.innerHTML;
    var text = tooltip.getAttribute("tooltip");
    var html_calc = '<div id="textWidth" style="white-space:nowrap;position:absolute;font-size:11px;">' + text + '</div>';
    tooltip.innerHTML = html_calc;
    var width = document.getElementById('textWidth').offsetWidth + 20;
    //console.log(width);
    tooltip.innerHTML = html_org;
    if (width > 150) {
        width = 180;
    }

    tooltip.innerHTML = html_org;

    if (document.getElementById("opTooltip")) {
        mainBody.removeChild(document.getElementById("opTooltip"));
    }

    var node = document.createElement("SPAN");
    var textnode = document.createTextNode(text);
    var w = window.innerWidth;
    var posX = getOffsetLeft(tooltip);
    var textW = tooltip.offsetWidth;
    var checkRight = posX + width;
    var tooltipPos = getAbsPosition(tooltip);
    //console.log(tooltipPos);
    //console.log(w + '-' + posX);
    node.classList.add("op-tooltip-text");
    node.setAttribute("id", "opTooltip");
    node.appendChild(textnode);
    node.style.width = width + 'px';
    node.style.height = '30px';
    node.style.top = (tooltipPos[0] - 40) + 'px';
    node.style.left = (tooltipPos[1] + (textW / 2)) + 'px';

    if (checkRight > w) {
        node.style.marginLeft = 0;
        node.classList.add("right");
        node.style.left = (tooltipPos[1] + textW + 10 - width) + 'px';
    } else {
        node.style.marginLeft = '-' + (width / 2) + 'px';
        node.classList.add("center");
    }
    node.style.display = 'block';
    node.style.zIndex = 99;

    //tooltip.appendChild(node);
    mainBody.appendChild(node);

}

function removeTooltip() {
    if(document.getElementById("opTooltip")){
      document.getElementById("opTooltip").remove();
    }
}

function getAbsPosition(el) {
    var el2 = el;
    var curtop = 0;
    var curleft = 0;
    if (document.getElementById || document.all) {
        do {
            curleft += el.offsetLeft - el.scrollLeft;
            curtop += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
            el2 = el2.parentNode;
            while (el2 != el) {
                curleft -= el2.scrollLeft;
                curtop -= el2.scrollTop;
                el2 = el2.parentNode;
            }
        } while (el.offsetParent);

    } else if (document.layers) {
        curtop += el.y;
        curleft += el.x;
    }
    return [curtop, curleft];
}

function getOffsetLeft(elem) {
    var offsetLeft = 0;
    do {
        if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
        }
    } while (elem = elem.offsetParent);
    return offsetLeft;
}

// start new calendar
function toggleSearhCalendar(val) {
    el = document.getElementById('calendarPopup');

    if (val != undefined) {
        var posTop = val.offsetParent.offsetTop;
        var posLeft = val.offsetParent.offsetLeft;
        el.style.top = (posTop + 27) + 'px';
        el.style.left = posLeft + 'px';
        el.classList.toggle("open");
    } else {
        el.classList.toggle("open");
    }
}

function checkVal(val) {
    var groupCal1 = document.getElementById("calendar-group1");
    var groupCal2 = document.getElementById("calendar-group2");
    if (val.value == "c") {
        groupCal1.style.display = "block";
        groupCal2.style.display = "none";
    } else if (val.value == "d") {
        groupCal1.style.display = "none";
        groupCal2.style.display = "block";
    } else {
        groupCal1.style.display = "none";
        groupCal2.style.display = "none";
    }
    calendarClose();
}

var from1 = document.getElementById("box-calendar-from1");
var from2 = document.getElementById("box-calendar-from2");
var to1 = document.getElementById("box-calendar-to1");
var to2 = document.getElementById("box-calendar-to2");

function calendarVal(val1, val2) {
    if (val2 == 'from1') {
        from1.style.display = "block";
        from2.style.display = "none";
    } else if (val2 == 'from2') {
        from1.style.display = "none";
        from2.style.display = "block";
    } else if (val2 == 'to1') {
        to1.style.display = "block";
        to2.style.display = "none";
    } else if (val2 == 'to2') {
        to1.style.display = "none";
        to2.style.display = "block";
    }
}

function calendarClose() {
    from1.style.display = "none";
    from2.style.display = "none";
    to1.style.display = "none";
    to2.style.display = "none";
}

function boxDropdown(val) {
    var bs = document.getElementsByClassName("box-search");
    if (val == 'buyer' || val == 'payment') {
        bs[0].style.display = bs[0].style.display != 'block' ? 'block' : 'none';
    } else if (val == 'currency') {
        bs[1].style.display = bs[1].style.display != 'block' ? 'block' : 'none';
    }
}

// start e-invoice
// count item when checked einvoice
var numCount = 0;
var cbFirst = document.getElementById('cbein');
var cbFirst2 = document.getElementById('cbein2');
var cbMain = document.getElementById('cbMain');
var numShow = document.getElementsByClassName('num');
var boxRate = document.getElementsByClassName('price-rate-box');
var btnAddInv = document.getElementsByClassName('btn-add-invoice');
var btnAddItem = document.getElementsByClassName('ein-add-item');

function isCheckedEitem(val) {
    if (val.checked == true) {
        val.parentElement.parentElement.style.background = '#CCECFE';
        numCount++;
    } else {
        val.parentElement.parentElement.style.background = '';
        numCount--;
    }

    if (numCount > 0) {
        btnAddInv[0].classList.remove('btn-op-disabled');
        for (var i = 0; i < btnAddItem.length; i++) {
            btnAddItem[i].style.opacity = 1;
            btnAddItem[i].parentElement.parentElement.classList.add('add-hover');
        }
    } else {
        btnAddInv[0].classList.add('btn-op-disabled');
        for (var i = 0; i < btnAddItem.length; i++) {
            btnAddItem[i].style.opacity = 0;
            btnAddItem[i].parentElement.parentElement.classList.remove('add-hover');
        }
    }
    numShow[0].innerHTML = numCount + " ";
}

// onload count start
function einOnload() {
    if (numShow[0] != undefined) {
        numShow[0].innerHTML = numCount + " ";
    }

    // checked check box
    if (cbFirst != undefined && cbFirst.checked == true) {
        cbFirst.parentElement.parentElement.style.background = '#CCECFE';
        numCount++;
        numShow[0].innerHTML = numCount + " ";
        if (btnAddItem.length > 0) {
            btnAddItem[0].style.opacity = 1;
        }
        btnAddInv[0].classList.remove('btn-op-disabled');
    }
    if (cbFirst2 != undefined && cbFirst2.checked == true) {
        cbFirst2.parentElement.parentElement.style.background = '#CCECFE';
        numCount++;
        numShow[0].innerHTML = numCount + " ";
        btnAddInv[0].classList.remove('btn-op-disabled');
    }

    checkAll();
}

function checkAll() {
    var inputCheckbox = document.getElementsByTagName('input');
    if (cbMain != undefined && cbMain.checked == true) {
        for (var i = 0; i < inputCheckbox.length; i++) {
            if (i != 0) {
                inputCheckbox[i].checked = true;
                inputCheckbox[i].parentElement.parentElement.style.background = '#CCECFE';
                numCount = 3;
                numShow[0].innerHTML = numCount + " ";
            }
        }
    } else if (cbMain.checked == false) {
        for (var i = 0; i < inputCheckbox.length; i++) {
            if (i != 0) {
                inputCheckbox[i].checked = false;
                inputCheckbox[i].parentElement.parentElement.style.background = '';
                numCount = 0;
                numShow[0].innerHTML = numCount + " ";
            }
        }
    }
}

function toggleBoxRate(type) {
    var wordRate = document.getElementsByClassName('word-wrap');

    var posTop = wordRate[0].offsetParent.offsetTop;
    var posLeft = wordRate[0].offsetParent.offsetLeft;


    if (type == 'create') {
        boxRate[0].style.left = (posLeft - 345) + 'px';
    } else {
        boxRate[0].style.left = posLeft + 'px';
    }

    boxRate[0].style.top = (posTop + 50) + 'px';
    boxRate[0].style.display = boxRate[0].style.display == 'none' || boxRate[0].style.display == '' ? 'block' : 'none';
}

function clearSerachEcat() {
    var val = document.getElementsByClassName('search-box');
    val[0].defaultValue = "";
}

var popupContent = document.getElementsByClassName('full-popup-inner');
var boxSelectItem = document.getElementsByClassName('box-select-item');
var stop = boxSelectItem[0].offsetTop;

function isScroll() {
    var newInvTable = document.getElementById('newInv').children[1].children.length;
    if (newInvTable > 9) {
        var maxScroll = popupContent[0].scrollHeight - popupContent[0].clientHeight - 20;
        if (popupContent[0].scrollTop >= stop) {
            boxSelectItem[0].classList.add('stick');
            boxSelectItem[0].style.height = popupContent[0].scrollTop < maxScroll ? 'calc(100% - 180px)' : 'calc(100% - 234px)';
        } else {
            if (boxSelectItem[0].classList.contains('stick')) {
                boxSelectItem[0].classList.remove('stick');
                boxSelectItem[0].style.height = '509px';
            }
        }
    }
};

var isOpen = true;
var thDetail = ["No.", "Item Name", "Unit", "Unit Price", "Ordered", "Received", "Received Amount (THB)"];
var trDetail = [];

function toggleColDetail(val, type) {
    var newInvTable = document.getElementById('newInv');
    var trIndex = val.parentNode.parentNode.rowIndex;

    if (val.classList.contains("icon-arrow-right-page")) {
        val.classList.remove('icon-arrow-right-page');
        val.classList.add('icon-arrow-down-page');
        isOpen = true;
    } else {
        val.classList.remove('icon-arrow-down-page');
        val.classList.add('icon-arrow-right-page');
        var parent = document.getElementById("newInv");
        parent.parentNode.children[0].children[1].children[trIndex].remove();
        isOpen = false;
    }

    if (type != undefined || type == "return") {
        trDetail = [{
                no: "1",
                itemName: "RAN Site Material",
                unit: "ACT",
                unitPrice: "1,000.00",
                order: "3",
                received: "3",
                receivedAmount: "3,000.00",
                data: [{
                        itemName: 'GR Number: 971791 (Returned)',
                        received: '-1',
                        receivedAmount: '-1,000.00'
                    },
                    {
                        itemName: 'GR Number: 971792 (Returned)',
                        received: '-1',
                        receivedAmount: '-1,000.00'
                    }
                ]
            },
            {
                no: "2",
                itemName: "RAN Site Material",
                unit: "ACT",
                unitPrice: "3,757.50",
                order: "1",
                received: "1",
                receivedAmount: "7,515.00",
                data: [{
                    itemName: 'GR Number: 971792 (Returned)',
                    received: '-1',
                    receivedAmount: '-3,757.50'
                }]
            }
        ];
    } else {
        trDetail = [{
                no: "1",
                itemName: "RAN Site Material",
                unit: "ACT",
                unitPrice: "1,000.00",
                order: "1",
                received: "1",
                receivedAmount: "1,000.00"
            },
            {
                no: "2",
                itemName: "RAN Site Material",
                unit: "ACT",
                unitPrice: "3,757.50",
                order: "1",
                received: "1",
                receivedAmount: "1,000.00"
            }
        ];
    }

    if (isOpen === true) {
        var row = newInvTable.insertRow(trIndex + 1);
        row.className = "col-detail";
        var cell = row.insertCell(0);
        cell.colSpan = 10;
        cell.id = "inCol" + trIndex;
        var inNewInvTable = document.createElement('table');
        var newCol = document.getElementById("inCol" + trIndex).appendChild(inNewInvTable);
        newCol.className = "in-col-detail"
        var rowH = newCol.insertRow(-1);
        for (var i = 0; i < thDetail.length; i++) {
            var header = document.createElement("th");
            header.innerHTML = thDetail[i];
            if (i == 1) {
                header.className = "mw-170";
            } else if (i >= 2) {
                header.className = "text-right";
            }
            rowH.appendChild(header);
        }
        for (var i = 0; i < trDetail.length; i++) {
            var rowD = document.createElement('tr');
            rowD.innerHTML = '<td>' + trDetail[i].no + '</td>' +
                '<td>' + trDetail[i].itemName + '</td>' +
                '<td class="text-right">' + trDetail[i].unit + '</td>' +
                '<td class="text-right">' + trDetail[i].unitPrice + '</td>' +
                '<td class="text-right">' + trDetail[i].order + '</td>' +
                '<td class="text-right">' + trDetail[i].received + '</td>' +
                '<td class="text-right">' + trDetail[i].receivedAmount + '</td>'
            newCol.appendChild(rowD);
            if (trDetail[i].data != undefined) {
                var dtLength = trDetail[i].data.length;
                for (var q = 0; q < dtLength; q++) {
                    var rowD1 = document.createElement('tr');
                    rowD1.className = 'col-detail-return';
                    rowD1.innerHTML = '<td></td>' +
                        '<td>' + trDetail[i].data[q].itemName + '</td>' +
                        '<td class="text-right"></td>' +
                        '<td class="text-right"></td>' +
                        '<td class="text-right"></td>' +
                        '<td class="text-right">' + trDetail[i].data[q].received + '</td>' +
                        '<td class="text-right">' + trDetail[i].data[q].receivedAmount + '</td>'
                    newCol.appendChild(rowD1);
                }
            }
        }
    }
}

function isIconHeadCol(val){
    val.children[0].children[0].style.display = val.children[0].children[0].style.display == "block" ? "none" : "block";
}
