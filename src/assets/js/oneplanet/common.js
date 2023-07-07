var classToggleMenu = $('body,.hum-m-menu,.hum-m-overflow');

isMenu = (modal) => {
	var a = $("body")[0];
	var m = $(".hum-menu")[0];

	if (!modal){
		a.className = a.className == "" ? "freeze-scroll" : "";
		m.className = m.className == "hum-menu" ? "hum-menu hum-menu-open" : "hum-menu";
	}else{
		a.className = "";
		m.className = "hum-menu";
	}

	/*for (let i of classToggleMenu){
		if (i.nodeName == "BODY") {
			if (!modal) {
				i.className = i.className == "" ? "freeze-scroll" : "";
			}else{
				i.className = "";
			}
		}else{
			if (!modal) {
				if (i.className == "hum-m-menu") {
					//i.style.opacity = i.style.opacity == 1 ? 0 : 1;
				}
				//i.style.height = i.style.height == "100%" ? "0" : "100%";
			}else{
				if (i.className == "hum-m-menu") {
					//i.style.opacity = 0;
				}
				//i.style.height = "0";
			}
		}
	}*/
}

// on scroll to set fixed menu
var navbar = $('.header-wrap')[0];
var navbtn = $('.contact-sale')[1];
var content = $('.content-wrap')[0];
var sticky = navbar.offsetTop;

window.onscroll = function() {
	var displaywidth = $(document).width();
	var menuposition = $(document).scrollTop();
	if (displaywidth > 1024) {
		if (menuposition >= 70) {
	    	navbar.classList.add("navbar-fixed-top");
	    	navbtn.classList.add("contact-sale-blue");
	    	content.style.marginTop = '70px';
		}else{
	    	navbar.classList.remove("navbar-fixed-top");
	    	navbtn.classList.remove("contact-sale-blue");
	    	content.style.marginTop = '0';
		}
	}else{
		navbar.classList.remove("navbar-fixed-top");
    	content.style.marginTop = '0';
	}
};

//set button id on click to hide first modal
$("#sendMail").on( "click", function() {
    $('#salesModal').modal('hide'); 
});
//trigger next modal
$("#sendMail").on( "click", function() {
    $('#successModal').modal('show');  
});

// slide img
var count = 0;
var left = $('.left')[0];
var right = $('.right')[0];
var activeBar = $('#barActive')[0];
var activeBarDot = $('.ps-dot-steps')[0];
var mainProduct = $('.bu-wrap-product')[0];
var mainProductImg = $('.pro-img-wrap')[0];
var slide = [
	{
		id: 1,
		align: 'right',
		title: 'เลือกสินค้า',
		subtitle: 'ขอซื้อสินค้าและบริการได้ง่าย เพียงเพิ่มสินค้าที่ต้องการลงในใบขอซื้อ',
		list: [
				{name:'เลือกซื้อสินค้าจากแคตตาล็อก'},
				{name:'รองรับการจัดซื้อแบบพิเศษ'},
				{name:'รองรับการขอซื้อสินค้าทุกประเภท และไม่จำกัดจำนวน'},
				{name:'แนบไฟล์ได้ไม่จำกัดจำนวน'}
			],
		wrapClass: 'pro-img-wrap',
		img: '../../assets/images/oneplanet/product/step/Step1.png',
		class: 'pro-img sec-step1'
	},
	{
		id: 2,
		align: 'left',
		title: 'เพิ่มรายละเอียดทางบัญชี',
		subtitle: 'ระบุรายละเอียดทางบัญชีที่องค์กรของคุณต้องการ โดยรายละเอียดต่างๆนั้นสามารถระบุได้ตามประเภทการสั่งซื้อ',
		list: [{name:'ปรับแต่งให้เข้ากับระบบการจัดซื้อในทุกองค์กร'}],
		wrapClass: 'pro-img-wrap piw-size',
		img: '../../assets/images/oneplanet/product/step/Step2.png',
		class: 'pro-img sec-step2'
	},
	{
		id: 3,
		align: 'right',
		title: 'แสดงสายการอนุมัติใบขอซื้อ',
		subtitle: 'ใบขอซื้อจะถูกแสดงสายการอนุมัติตามที่ได้ตั้งค่าไว้ นอกจากนี้คุณยังสามารถเพิ่มผู้อนุมัติที่ต้องการได้ด้วยตนเอง',
		list: [
				{name:'แสดงลำดับของผู้อนุมัติ'},
				{name:'ส่งข้อความถึงผู้อนุมัติ'},
				{name:'ดูรายละเอียดผู้อนุมัติ'},
			],
		wrapClass: 'pro-img-wrap',
		img: '../../assets/images/oneplanet/product/step/Step3.png',
		class: 'pro-img sec-step1'
	},
	{
		id: 4,
		align: 'left',
		title: 'สรุปรายละเอียดการขอซื้อ',
		subtitle: 'ตรวจสอบรายละเอียดใบขอซื้อให้ถูกต้องอีกครั้งก่อนส่งไปยังผู้อนุมัติ นอกจากนี้คุณยังสามารถเพิ่มผู้อนุมัติที่ต้องการได้ด้วยตนเอง',
		list: [],
		wrapClass: 'pro-img-wrap piw-size',
		img: '../../assets/images/oneplanet/product/step/Step4.png',
		class: 'pro-img sec-step4'
	}
]

slideImg = (val) => {
	// add class for a fading
	addFadeClass();
	// start a count
	if (val == 'next') {
		count += 1;
	}else{
		count -= 1;
	}
	// active bar
	if(count == 0){
		width = 0;
	}else{
		width = (90 * count);
	}
	activeBar.style.width = width + 'px';
	for (var j = 0; j < activeBarDot.children.length; j++) {
		if (val == 'next') {
			if (j <= count-1) {
				activeBarDot.children[j].className = 'active';
			}else if (j == count) {
				activeBarDot.children[j].className = 'standby';
			}
		}else{
			if (count == j) {
				activeBarDot.children[j].className = 'standby';
			}else if (count <= j) {
				activeBarDot.children[j].className = '';
			}else if (count >= j) {
				activeBarDot.children[j].className = 'active';
			}
		}
	}
	// control arrow
	left.style.visibility = count < 1 ? 'hidden' : 'visible';
	right.style.visibility = count >= 3 ? 'hidden' : 'visible';
	// set content and alignment
	mainProduct.style.float = slide[count].align;
	mainProduct.children[0].innerHTML = slide[count].title;
	mainProduct.children[1].innerHTML = slide[count].subtitle;
	// create li element
	$('.bu-list').empty();
	for (var i = 0; i < slide[count].list.length; i++) {
		var buli = document.createElement('li');
		buli.innerHTML = slide[count].list[i].name;
		buli.className = 'green';
		mainProduct.children[2].appendChild(buli)
	}
	// set img
	mainProductImg.className = slide[count].wrapClass;
	mainProductImg.children[0].src = slide[count].img;
	mainProductImg.children[0].className = slide[count].class;

	// set timeout to remove class 
	setTimeout(function(){ removeFadeClass() }, 2000);
	// clear old interval
	clearInterval(timeInit);
	clearInterval(timerID);
	// setting new interval
	timerID = setInterval(function () { 
		removeFadeClass() 
		if (count >= 3 ) {
			count = 1;
			tVal = 'prev';
		}else{
			tVal='next';
		}
		slideImg(tVal);
	}, 14000);
}
// setp wizard when click
stepWi = val => {
	if(count > val){
		count = val+1;
		slideImg('prev');
	}else{
		count = val-1;
		slideImg('next');
	}
}

// to set auto slide run every 14 sec
// set a value to 'next' or 'prev'
var tVal;
// get a class of section
var productPage = $('.bg-img')[0] ? $('.bg-img')[0] : undefined;
// function to add and delete class
function addFadeClass() {
	if (productPage) {
    	productPage.children[0].classList.add('fade');
	}
}
function removeFadeClass() {
	if (productPage) {
    	productPage.children[0].classList.remove('fade');
	}
}
// set interval value
var timeInit;
var timerID;
timeInit = setInterval(function () { 
	removeFadeClass() 
}, 2000);
timerID = setInterval(function () { 
	if (count >= 3 ) {
		count = 1;
		tVal = 'prev';
	}else{
		tVal='next';
	}

	if (productPage) {
		slideImg(tVal);
	}
}, 14000);

function calcHeight(iframeElement){
	var yy = iframeElement.contentDocument || iframeElement.contentWindow.document;
    var the_height = yy.body.offsetHeight;
    iframeElement.height =  the_height;
}

	var player;    

function isPlay(){
	var closeTMB = document.getElementsByClassName('mock-video');
	var cover = document.getElementsByClassName('cover-u');
	var playU = document.createElement('div');
	playU.id = 'player';
	playU.className = 'if-ut';
	cover[0].appendChild(playU);
	onYouTubePlayerAPIReady();
	closeTMB[0].classList.toggle('close'); 
}

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'autohide': 0,
            'wmode': 'opaque',
            'showinfo': 0,
            'modestbranding': 1,
            'loop': 0,
            'mute': 0,
            'playlist': 'ASCVWoukVZk'
        },
        videoId: 'ASCVWoukVZk'
    });
}