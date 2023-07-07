var compareHeader = document.getElementsByClassName('cpw-header');
var compareTable = document.getElementsByClassName('cpwc-table');
var wrapper = document.getElementsByClassName('ct-wrapper');
var arrow = document.getElementsByClassName('arrow');
var boxHead = document.getElementsByClassName('box-header');
var boxContent = document.getElementsByClassName('box-content');
var isRow = document.getElementsByClassName('b-row');
var isCol = document.getElementsByClassName('b-col');
var headLeft = document.getElementsByClassName('head-left');
var boxArrowCpwc = document.getElementsByClassName('box-arrow-cpwc');
var cpwLeft = document.getElementsByClassName('cpw-left');
var cpwLine = document.getElementsByClassName('cpw-line');
var circleRound = document.getElementsByClassName('circle-round');

var colCal = 0;
var totalScroll = 0;
var arrowH = 0;
var count = 0;
var countData = 0;

var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var widthW = compareTable[0].clientWidth - 250;
var lineTop = cpwLeft[0].clientHeight + 30;

// onload for set the height of arrow
window.onload = function() {
	// to check screen width
	if (width > 1024) {
		colCal = widthW / 4;
		countData = isRow[0].children.length - 5;
	}
	if(width <= 1024){
		colCal = widthW / 3;
		countData = isRow[0].children.length - 4;
	}
	if(width <= 768){
		colCal = widthW / 2;
		countData = isRow[0].children.length - 3;
	}
	if(width <= 414){
		colCal = widthW + 63;
		widthW = widthW + 65;
		cpwLine[0].style.top = lineTop + 'px';
		countData = isRow[0].children.length - 2;
	}
	
	//console.log(isRow[0].children.length);
	//console.log(colCal);
	//console.log(countData);

	// to set arrow height
	for (var h = 0; h < arrow.length; h++) {
		arrowH = boxHead[0].clientHeight - 1;
		arrow[h].style.height = arrowH + 'px';
		arrow[h].style.paddingTop = ( arrowH / 2 - 16) + 'px';
	}

	// to set content and head width
	for (var k = 0; k < isRow.length; k++) {
		for (var kl = 0; kl < isRow[k].children.length; kl++) {
			if (kl > 0) {
				isRow[k].children[kl].style.width = colCal + 'px';
				if (k == isRow.length-1) {
					isRow[k].children[kl].style.borderBottom = '1px solid #E6E8EB';
				}
			}
		}
	}

	// to set Head col height
	for (var i = 0; i < headLeft.length; i++) {
		var height = isRow[i].clientHeight;
		headLeft[i].style.height = height + 'px';
		if (i == headLeft.length-1) {
			headLeft[i].style.borderBottom = '1px solid #E6E8EB';
		}
	}

	// to set width of wrapper data
	for (var j = 0; j < wrapper[0].children.length; j++) {
		if (width <= 414) {
			wrapper[0].children[j].style.width = widthW + 'px';
		}else{
			wrapper[0].children[j].style.width = widthW + 'px';
		}
	}

	// hide arrow left
	arrow[0].style.visibility = 'hidden';

	// hide arrow when is less than 4
	if (isRow[0].children.length - 1 <= 4) {
		arrow[1].style.visibility = 'hidden';
	}
};


// to set active table when you checked
function isCheckedShortList(val,key){
	// this for icon
	circleRound[key-1].classList.toggle("active");
	// this for content
	for (var i = 0; i < isRow.length; i++) {
		isRow[i].children[key].classList.toggle("active");
		if (i == 0) {
			isRow[i].children[key].style.padding = isRow[i].children[key].style.padding ? '' : '0px';
			isRow[i].children[key].style.borderTop = isRow[i].children[key].style.borderTop ? '' : 'none';

			isRow[i].children[key].children[0].style.height = isRow[i].children[key].children[0].style.height ? '' : '48px';
			isRow[i].children[key].children[0].style.padding = isRow[i].children[key].children[0].style.padding ? '' : '14px 25px 8px';
			isRow[i].children[key].children[0].style.borderTop = isRow[i].children[key].children[0].style.borderTop ? '' : '2px solid #297CBB';
			isRow[i].children[key].children[1].style.padding = isRow[i].children[key].children[1].style.padding ? '' : '8px 25px 15px';
		}
		if (i == isRow.length - 1) {
			isRow[i].children[key].style.borderBottom = isRow[i].children[key].style.borderBottom == "1px solid rgb(230, 232, 235)" ? '1px solid #297CBB' : '1px solid #E6E8EB';
		}
	}
}

// to set arrow for scrolling
function isArrow(val){
	// scroll left and right
	totalScroll = val === "next" ? boxHead[0].scrollLeft + colCal : boxHead[0].scrollLeft - colCal;
	totalScroll = val === "next" ? boxContent[0].scrollLeft + colCal : boxContent[0].scrollLeft - colCal;
	boxHead[0].scrollLeft = totalScroll;
	boxContent[0].scrollLeft = totalScroll;

	if (val == "next") {
		count += 1;
	}else{
		count -= 1;
	}

	arrow[0].style.visibility = boxHead[0].scrollLeft > 0 ? 'visible' : 'hidden';
	arrow[1].style.visibility = count == countData ? 'hidden' : 'visible';
}

// when scroll header will be freeze
function isScrollCompare(val) {
	var currentTable = compareHeader[0].clientHeight + 104;
	//console.log(compareHeader[0].clientHeight)
	//console.log(currentTable);
	//console.log(val.target.scrollTop);

	// To add a class for freezing a head 
    if (val.target.scrollTop >= currentTable) {
    	boxHead[0].classList.add('freezer')
    	boxContent[0].style.marginTop = arrowH + 'px';
    	boxArrowCpwc[0].style.position = 'fixed';
    	boxArrowCpwc[0].style.top = '60px';
    	boxArrowCpwc[0].style.left = '270px';
    	if(width <= 414){
    		boxArrowCpwc[0].style.left = '185px';
    	}
    	boxArrowCpwc[0].style.width = widthW + 'px';
		for (var i = 0; i < arrow.length; i++) {
			arrow[i].classList.add('freezer');
		}
    }

	// To remove a class for freezing a head 
    if (val.target.scrollTop <= currentTable) {
    	boxHead[0].classList.remove('freezer')
    	boxContent[0].style.marginTop = '0px';
    	boxArrowCpwc[0].style.position = 'relative';
    	boxArrowCpwc[0].style.top = '0px';
    	boxArrowCpwc[0].style.left = '0px';
    	boxArrowCpwc[0].style.width = '100%';
		for (var i = 0; i < arrow.length; i++) {
			arrow[i].classList.remove('freezer');
		}
    }
}