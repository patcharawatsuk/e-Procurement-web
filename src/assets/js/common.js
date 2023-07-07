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

let screenH = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

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

//filter dashboard
var elements = document.getElementsByClassName('full-popup-wrap');
function hideFullPop() {   
    for (var i = 0, length = elements.length; i < length; i++) {
        if (elements[i].style.display == 'block') {
            elements[i].style.display = 'none';
        }
    }
    mainBody.classList.remove('body-fixed');
}
function openFullPop() {
    for (var i = 0, length = elements.length; i < length; i++) {
        if (elements[i].style.display == 'none') {
            elements[i].style.display = 'block';
        }
    }
    mainBody.classList.add('body-fixed');
}
//end filter dashboard


var hideMenu = function() {
    navLeft.classList.remove('open');
    navLeft.classList.add('close');
}

function ctrlDropdown(el) {
    // show/hide dropdown
    el.parentElement.classList.toggle("open");
    el.classList.toggle("active");
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
                    othersDiv[i].classList.remove(cls);
                    hideOutDropdown();
                }
            } else {
                othersDiv[i].parentElement.classList.remove(cls);
                othersDiv[i].classList.remove(cls);
                hideOutDropdown();
            }
        }
    }
}

var hideCalendar = function(target, el, cls) {
    var othersDiv = document.getElementsByClassName(el);
    var targetSelector = getSelector(target);
    var elSelector;

    for (var i = 0; i < othersDiv.length; i++) {
        elSelector = getSelector(othersDiv[i]);
        if (target.parentElement.className === othersDiv[i].parentElement.className) {
            if (targetSelector != elSelector) {
                othersDiv[i].nextElementSibling.classList.remove(cls);
            }
        } else {
            othersDiv[i].nextElementSibling.classList.remove(cls);
        }
        //console.log(othersDiv[i]);
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
    hideDDMenu(target, 'box-dropdown-title', 'active');
    hideCalendar(target, 'box-calendar', 'open');
});

function calendarLess(el) {
    el.parentNode.nextElementSibling.classList.toggle("open");
}

var tabMenu = document.getElementsByClassName('frontend-tab-menu');
// onload
function r(f) {
    /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f()
    if (tabMenu.length != 0 && tabMenu[0].children.length <= 2) {
        tabMenu[0].classList.add('only-one-tab')
    }
}

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
    var html_calc = '<div id="textWidth" style="white-space: nowrap; position: absolute; font-size: 11px;">' + text + '</div>';
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
    node.style.top = (-40) + 'px';
    //node.style.height = '30px';
    //node.style.top = (tooltipPos[0] - 40) + 'px';
    //node.style.left = (tooltipPos[1] + (textW / 2)) + 'px';

    if (checkRight > w) {
        node.style.marginLeft = 0;
        node.classList.add("right");
        //node.style.left = (tooltipPos[1] + textW + 10 - width) + 'px';
    } else {
        node.style.marginLeft = '-' + (width / 2) + 'px';
        node.classList.add("center");
    }
    node.style.display = 'block';
    node.style.zIndex = 99;

    //tooltip.appendChild(node);
    tooltip.appendChild(node);

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

function toggleSearhCalendar(el) {
    el = document.getElementById('calendarPopup');
    el.parentElement.parentElement.classList.add("open");
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

const btnRadio = document.getElementsByClassName("radio");
for (var i = 0; i < btnRadio.length; i++) {
    btnRadio[i].addEventListener("click", function(){
        if (this.classList.contains("custom")) {
            document.getElementById("radio-calendar").classList.add('open');
        } else {
            document.getElementById("radio-calendar").classList.remove('open');
        }
    });
}

r(function() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 1160) {
        navLeft.style.display = 'none';
        navLeft.classList.remove('open');
        navLeft.classList.add('close');
        mainContent.classList.add('full');
    }
});

// V2
// menu set
if (navLeft) {
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
                //{name : 'Dashboard',isHead : false},
                {name : 'Transaction Report',isHead : false}
            ];
    var eform = [
                {name : 'Questionnaire',isHead : false}
            ];
    var avl = [
                {name : 'AVL',isHead : false},
                {name : 'Approval',isHead : false}
    ];
    var eva = [
        //{name : 'Create Evaluation',isHead : false},
        //{name : 'Manage Evaluation',isHead : false},
        {name : 'Supplier Evaluation',isHead : false},
        //{name : 'Approve',isHead : false},
        {name : 'Report',isHead : false}
    ];
    var sup = [
        {name : 'Request Form',isHead : false},
        {name : 'Approve',isHead : false}
    ];
    var sr = [
        {name : 'Sourcing Request',isHead : false},
        {name : 'Approve',isHead : false}
    ];

    var ulHead = ulList.getElementsByClassName("head");
    var ulAction = ulList.getElementsByClassName("take-action");
    var ulMenu = ['erfx','purc','invo','eva','spen'];

    // when click burger expand menu
    function ctrlNav() {
        //navLeft.classList.remove('close');
        //navLeft.classList.add('open');
        navLeft.style.display = 'block';
        mainContent.classList.remove('full');
        boxOver.style.display = boxOver.style.display == '' || boxOver.style.display == 'none' ? 'block' : 'none';
    }

    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    //change window size
    window.addEventListener('resize', function(event) {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (width < 1160) {
            navLeft.style.display = 'none';
            mainContent.classList.add('full');
            navLeft.classList.remove('open');
            navLeft.classList.add('close');
            /*if (navLeft.classList.contains('open')) {
                navLeft.classList.remove('open');
                navLeft.classList.add('close');
            }*/
        } else {
            navLeft.style.display = 'block';
            mainContent.classList.remove('full');
            navLeft.classList.remove('close');
            navLeft.classList.add('open');
            /*if (!mainContent.classList.contains('full')) {
                navLeft.classList.remove('close');
                navLeft.classList.add('open');
            }*/
        }
        boxOver.style.display = 'none';
        menuOver.style.display = 'none';
    });

    function toggleSubMenu(val, val2){
        var data = document.getElementsByClassName(val);;
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
            }else if (isHeader == "FORM") {
                createMenuElement(eform);
            }else if (isHeader == "AVL") {
                createMenuElement(avl);
            }else if (isHeader == "SUPPLIER EVALUATION") {
                createMenuElement(eva);
            }else if (isHeader == "SUPPLIER INFORMATION") {
                createMenuElement(sup);
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
        if (navLeft.classList.contains("close")) {
            navLeft.style.display = 'none';
            mainContent.classList.add('full');
        }
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
    }
    // END V2
}


window.addEventListener("scroll", function(event) {
    var left = this.scrollX;
}, false);


/*document.getElementsByClassName("table-freeze-inner")[0].children[0].scrollY = function(){
    console.log(this.scrollY); //check the number in console
}*/

function approvalExpand(el) {
    var h = document.documentElement.clientHeight;

    if(el.nextElementSibling.style.display === 'none') {
      el.nextElementSibling.style.display = 'block';
      el.nextElementSibling.style.height = h - 100 + 'px';
    } else {
      el.nextElementSibling.style.display = 'none';
      el.nextElementSibling.style.height = null;
    }
  
    var iRowExpand = el.firstElementChild
    if (iRowExpand.classList.contains("icon-arrow-right-page")) {
      iRowExpand.classList.remove("icon-arrow-right-page");
      iRowExpand.classList.add("icon-arrow-down-page");
    } else {
      iRowExpand.classList.add("icon-arrow-right-page");
      iRowExpand.classList.remove("icon-arrow-down-page");
    }
}

function toggleUserDetail2(el) {
    var ApproverUserDetail = document.getElementsByClassName('user-detail')
    
        if (el.firstElementChild.classList.contains("open")) {
            for (var i = 0; i < ApproverUserDetail.length; i++) {
                ApproverUserDetail[i].classList.remove("open");
            }
            el.firstElementChild.classList.remove("open");
        } else {
            for (var i = 0; i < ApproverUserDetail.length; i++) {
                ApproverUserDetail[i].classList.remove("open");
            }
            el.firstElementChild.classList.add("open");
        }
}

function toggleNote(el) {
    if(el.nextElementSibling.style.display === 'none') {
        el.nextElementSibling.style.display = 'block';
    } else {
        el.nextElementSibling.style.display = 'none';
    }
    var iRowExpand = el.firstElementChild
    if (iRowExpand.classList.contains("icon-arrow-right-page")) {
      iRowExpand.classList.remove("icon-arrow-right-page");
      iRowExpand.classList.add("icon-arrow-down-page");
    } else {
      iRowExpand.classList.add("icon-arrow-right-page");
      iRowExpand.classList.remove("icon-arrow-down-page");
    }
}


function equalHeight() {
    var elements = document.querySelectorAll(".row>.col-6>.information-bar"),
        heights = [];

    [].forEach.call(elements, function(each) {
        heights[heights.length] = getComputedStyle(each, null).getPropertyValue("height");
    });

    heights.sort(function(a, b) {
        return parseFloat(b) - parseFloat(a);
    });

    [].forEach.call(elements, function(each) {
        each.style.height = heights[0];
    });
}
equalHeight();

function toggleElSearch(elm) {
    el = document.getElementById(elm).classList;
    if (el.contains('open')) {
        el.remove('open');
    }else{
        el.add('open');
    }
}

function contentDropdown(el,ac){
    // show/hide dropdown
    parElm = el.parentElement;
    parElm.classList.toggle("open");
    parElmClass = parElm.className + " out-dropdown";
    parPos = getAbsPosition(parElm);
    ddElm = parElm.querySelectorAll('.box-dropdown-list');
    ddElm[0].style.display = "none";
    boxTop = parPos[0] + 35;
    if(ac === 'action'){
        console.log('action');
        boxLeft = parPos[1] - 155;
        boxWidth = 200;
        parElmClass = "box-dropdown out-dropdown";
        ddClass = "box-dropdown-list dropdown-action";
    }
    else if(ac === 'actable'){
        console.log('actable');
        boxLeft = parPos[1] - 135;
        boxWidth = 180;
        boxTop = parPos[0] + 42;
        ddClass = "box-dropdown-list";
    }
    else if(ac === 'actableMiddle'){
        console.log('actableMiddle');
        boxLeft = parPos[1] - 155;
        boxWidth = 200;
        boxTop = parPos[0] + 42;
        ddClass = "box-dropdown-list";
    }
    else if(ac === 'actableLong'){
        console.log('actableLong');
        boxLeft = parPos[1] - 185;
        boxWidth = 230;
        boxTop = parPos[0] + 42;
        ddClass = "box-dropdown-list";
    }
    else if(ac === 'lang'){
        console.log('lang');
        boxLeft = parPos[1] - 175;
        boxWidth = 230;
        ddClass = "box-dropdown-list lang-dropdown-list";
    }
    else if(ac === 'org'){
        console.log('org');
        boxLeft = parPos[1] - 80;
        boxWidth = 100;
        ddClass = "box-dropdown-list";
    }
    else if(ac === 'formCurrency'){
        console.log('currency');
        boxLeft = parPos[1];
        boxWidth = parElm.closest(".form-dropdown-currency").previousElementSibling.offsetWidth;
        ddClass = "box-dropdown-list";
    }
    else if(ac === 'tableDropdown'){
        console.log('currency');
        boxLeft = parPos[1];
        boxWidth = 400;
        ddClass = "box-dropdown-list";
    }
    else{
        console.log('normal');
        boxLeft = parPos[1] + 1;
        boxWidth =  parElm.offsetWidth;
        ddClass = ddElm[0].getAttribute("class");
    }
    htmlDD = ddElm[0].innerHTML;
    outDD = document.getElementById('outDropdown');
    if (outDD.classList.contains('out-dropdown')) {
        hideOutDropdown(outDD)
    }
    else{
        outDD.setAttribute("class", parElmClass);
        outDD.innerHTML = '<div class="'+ ddClass +' form-dropdown-list">'+ htmlDD +'</div>';
        outDD.style.left = boxLeft+"px";
        childH = outDD.querySelector('.box-dropdown-list');
        if(screenH < (boxTop + childH.offsetHeight + 50)){
            boxBottom = boxTop - (childH.offsetHeight + 5) - (parElm.offsetHeight + 5);
            outDD.style.top = boxBottom+"px";
        }else{
            outDD.style.top = boxTop+"px";
        }
        //outDD.style.top = boxTop+"px";
        outDD.style.width = boxWidth+"px";
        //outDD.style.height = childH.offsetHeight+"px";
    }
}
function hideOutDropdown(){
    outDD = document.getElementById('outDropdown')
    outDD.classList.remove('out-dropdown');
    outDD.removeAttribute("style");
    outDD.innerHTML = '';
}

function contentDropCalendar(el) {
    const nextElm = el.nextElementSibling;
    if (nextElm.classList.contains("show-calendar")) {
        nextElm.classList.remove("show-calendar");
        outDD = document.getElementById('outDropdown')
        outDD.classList.remove('out-dropdown');
        outDD.removeAttribute("style");
        outDD.innerHTML = '';
    }
    else {
        let drop = document.querySelectorAll(".box-calendar-pop");
        for (let i=0; i<drop.length; i++) {
            drop[i].classList.remove("show-calendar");
        }
        nextElm.classList.add("show-calendar");
        nextElm.style.display = "none";
        let rectPos = el.getBoundingClientRect();
        let boxLeft = rectPos.x;
        let boxTop = rectPos.y + 30;
        const ddClass = nextElm.getAttribute("class");
        const htmlDD = nextElm.innerHTML;
        outDD = document.getElementById('outDropdown');
        outDD.setAttribute("class", "out-dropdown");
        outDD.innerHTML = '<div class="'+ ddClass +'">'+ htmlDD +'</div>';
        let childH = outDD.querySelector('.box-calendar-pop');
        if (screenH < (boxTop + childH.offsetHeight)) {
            let boxBottom = boxTop - (childH.offsetHeight + 5) - (el.offsetHeight + 5);
            outDD.style.top = boxBottom + "px";
        }else {
            outDD.style.top = boxTop + "px";
        }
        outDD.style.left = boxLeft + "px";
    }
}

function boxShowContact(el,ac){
    parElm = el;
    parElm.classList.add("open");
    parPos = getAbsPosition(parElm);
    ElmCB = parElm.querySelectorAll('.approver-detail-pop');
    ElmCB[0].style.display = "none";
    if (ac === 'showContact'){
        boxTop = parPos[0] + 2;
        boxLeft = parPos[1] - 30;
        boxWidth = 270;
        classCB = "approver-detail-pop";
    }
    htmlCB = ElmCB[0].innerHTML;
    outCB = document.getElementById('outContactbox');
    if (outCB.classList.contains('out-contact-box')) {
        parElm.classList.remove("open");
        hideOutContactBox(outCB)
    }
    else {
        outCB.setAttribute("class", "out-contact-box");
        outCB.innerHTML = '<div class="'+ classCB +'">'+ htmlCB +'</div>';
        outCB.classList.add("open");
        outCB.style.left = boxLeft+"px";
        outCB.style.top = boxTop+"px";
        outCB.style.width = boxWidth+"px";
    }
}
function hideOutContactBox(){
    outCB = document.getElementById('outContactbox')
    outCB.classList.remove('out-contact-box');
    outCB.removeAttribute("style");
    outCB.innerHTML = '';
}

function showBudget(elm,id){
    var budgetInfo = document.getElementById(id);
    var pos = getAbsPosition(elm);
    var h = budgetInfo.offsetHeight;
    var w = budgetInfo.offsetWidth;
    var posTop = pos[0] - 122;
    var posLeft = pos[1] - 280;
    //console.log('top = ' + posTop + ' h= ' + h)

    budgetInfo.style.left = posLeft+"px";
    budgetInfo.style.top = posTop+"px";
    budgetInfo.style.display = 'block';
}
function hideBudget(id){
    //console.log('innnnnnn')
    document.getElementById(id).style.display = 'none';
}

function showDetail(elm, name, email, phone, noteType='Note', note=null){
    const body = document.body;
    const pos = getAbsPosition(elm);
    const posTop = pos[0];
    console.log(posTop);
    const posLeft = pos[1] + elm.offsetWidth - 10;

    if(body.contains(document.getElementById('UserDetail'))){
        //alert('Element exists!');
        removeDetail(elm);
    } else{
        elm.classList.add('open');
        const id = "'UserDetail'";
        const detail = document.createElement('div');
        detail.setAttribute('id', 'UserDetail');
        detail.style.cssText = 'position :absolute; z-index:999;';
        detail.style.left = posLeft+"px";
        detail.style.top = posTop+"px";
        if (note==null) {
            detail.innerHTML = '<ul class="approval-detail user-detail"><li><strong class="font-menu">' + name + '</strong><br><i class="icon-email"></i>' + email + '<br><i class="icon-mobile"></i>' + phone + '</li></ul>';
        }
        else {
            detail.innerHTML = '<ul class="approval-detail user-detail"><li><strong class="font-menu">' + name + '</strong><br><i class="icon-email"></i>' + email + '<br><i class="icon-mobile"></i>' + phone + '<br><div class="mt-15"><strong class="font-menu">'+ noteType + ':</strong><br>'+ note +'</div></li></ul>';
        }
        body.appendChild(detail);
    }
    
}
function removeDetail(elm){
    const body = document.body;
    const pop = document.getElementById("UserDetail");
    pop.parentNode.removeChild(pop);
    const open = body.querySelector('.open');
    open.classList.remove('open');
}

function showDetailMulti(elm, name){
    const pos = getAbsPosition(elm);
    const posTop = pos[0];
    const pageScrollTop = document.getElementById("fullInner").pageYOffset || document.getElementById("fullInner").scrollTop;
    const posLeft = pos[1] + elm.offsetWidth - 10;
    const detailContent = document.getElementById(name);
    
    if(elm.classList.contains("open")) {
        elm.classList.remove('open');
        detailContent.classList.remove('show');
        detailContent.style = "";
    }
    else {
        elm.classList.add('open');
        detailContent.classList.add('show');
        detailContent.style.cssText = 'position :absolute; z-index:999;';
        detailContent.style.top = posTop + (pageScrollTop - 60) + "px";
        detailContent.style.left = posLeft + "px";
    } 
}