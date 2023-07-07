// sticky
var mainContent = document.getElementById("fullInner");
var contentSticky = document.getElementById("stickyMenu");
var mainH = mainContent.offsetHeight;
var rightContent = document.querySelectorAll('.responses-table');
var leftContent = document.querySelectorAll('.supplier-list-inner');
var topContentH = 340;
var rightH = rightContent[0].offsetHeight;
var clearRightH = rightH + 100;
var leftH = leftContent[0].offsetHeight;

window.onload = function() {
    setLeft();
}
mainContent.onscroll = function() {stickyFunction()};

//console.log(mainH + ' -----' + rightH + ' -----' + clearRightH);

function stickyFunction(){
    if(mainH < clearRightH){
        //console.log('sticky')
        if (mainContent.scrollTop > topContentH) {
            contentSticky.classList.add("sticky");
            if(mainH > rightH){
                rightContent[0].style.height = mainH + 'px';
                rightContent[0].classList.add("add-pad");
            }
            setLeft();
        } else {
            contentSticky.classList.remove("sticky");
        }
    }else{
        //console.log('no sticky');
        contentSticky.classList.remove("sticky");
    }
    if((mainH < leftH) && (mainH > clearRightH)){
        setLeft();
    }
}

function setLeft(){
    var boxLeft = document.querySelectorAll('.supplier-list-wrap');
    var listLeft = document.querySelectorAll('.list-items-wrap');
    boxLeft[0].style.height = mainH - 60 + 'px';
    listLeft[0].style.height = mainH - 92 + 'px';
}