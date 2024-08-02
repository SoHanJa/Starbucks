console.log('hello');
const searchEl = document.querySelector('.search');
const searchInputEl = document.querySelector('.search input');

console.log(searchEl);
console.log(searchInputEl);

searchEl.addEventListener('click', function(){
    searchInputEl.focus();
    searchInputEl.setAttribute('placeholder','통합검색');
    searchEl.classList.add('focused');
});

searchInputEl.addEventListener('blur',function(){
    searchInputEl.setAttribute('placeholder','');
    searchEl.classList.remove('focused');
});


// 순서대로 요소 나타내기
// 나타날 요소 찾기
const fadeEls = document.querySelectorAll('.banner .fade-in'); // 배열
// console.log(fadeEls);
fadeEls.forEach(function(fadeEl,index){
    // console.log(fadeEl);
    // console.log(index);
    gsap.to(fadeEl,1,{
        delay:(index+1)*0.5,
        opacity:1
    })
});

const swiper = new Swiper(`.notice_line`, {
    // Optional parameters
    direction: `vertical`,
    loop: true,
    autoplay:{
        delay:5000
    }
});

const promoSwiper = new Swiper('.promotion .swiper-container',{
    slidesPerView:3, // 한번에 몇개씩?
    spaceBetween:10, // 슬라이드 사이 여백 >> css에서 2분의 1값으로 마진 준거랑 같다.
    centeredSlides:true, // 보여질 슬라이드가 가운데로 오게
    loop:true,
    autoplay:{
        delay:5000 // 5초
    },
    pagination:{
        el:'.promotion .swiper-control .swiper-pagination',
        clickable:true
    },
    navigation:{
        prevEl:'.promotion .swiper-prev',
        nextEl:'.promotion .swiper-next'
    }
});

const swiperControlBtn = document.querySelector('.swiper-control-btn');
swiperControlBtn.addEventListener('click', function(){
    let isSwiperOn = swiperControlBtn.classList.contains('on');
    if(isSwiperOn){
        //stop
        swiperControlBtn.classList.remove('on');
        promoSwiper.autoplay.stop();
        swiperControlBtn.textContent='play_arrow';
    }else{
        //start
        swiperControlBtn.classList.add('on');
        promoSwiper.autoplay.start();
        swiperControlBtn.textContent='pause';
    }
});
//프로모션 영역, 프로모션 영역 토글버튼
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.nbtn');

console.log(promotionEl);
console.log(promotionToggleBtn);
// 프로모션 영역숨김여부
let isHidePromotion = false;
// 토글버튼을 클릭하면?
promotionToggleBtn.addEventListener('click',function(){
    // 프로모션 영역 숨김여부 'hide' 확인
    let isHidePromotion = promotionEl.classList.contains('hide');
    if(!isHidePromotion){
        promotionEl.classList.add('hide');
        promotionToggleBtn.classList.remove('opened');
    }else{
        promotionEl.classList.remove('hide');
        promotionToggleBtn.classList.add('opened');
    }
});
// 감지할 요소 검색
const spyEls = document.querySelectorAll('#body_layout .scroll-spy');
//console.log(spyEls)
// 각 요소들의 기능 처리
spyEls.forEach(function(spyEl){
    //console.log(spyEl);
    new ScrollMagic.Scene({
        triggerElement: spyEl //보여짐 여부를 감지할 요소
        ,triggerHook : 0.8 // 화면 맨위가 0, 맨 아래가 1, 그 사이 인식선 만들기
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 감지되면 show 클래스 추가
    .addTo(new ScrollMagic. Controller()); // 코드 내부에 기능 할당(필수!)
});

const awardsSwiper = new Swiper('.awards .inner .swiper-container',{
    slidesPerView:5, // 한번에 몇개씩?
    centeredSlides:true, // 보여질 슬라이드가 가운데로 오게
    loop:true,
    autoplay:{
        delay:5000 // 5초
    },
    navigation:{
        prevEl:'.awards .swiper-prev',
        nextEl:'.awards .swiper-next'
    }
});

const badgeEl = document.querySelector('#head_layout .badges')
//console.log(badgeEl);

window.addEventListener('scroll', _.throttle(function(){
    //console.log(window.scrollY);
    if(window.scrollY > 600){
        // 1. 배지 숨길거야
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display:'none'
        });
        // 상단보튼보이기
        gsap.to('#to-top',0.3,{
            x:0
        });
    }else{
        // 2. 배지 보이기
        gsap.to(badgeEl,.6,{
            opacity : 1,
            display: 'block'
        })
        badgeEl.style.display = 'block';
        // 상단버튼 숨기기
        gsap.to('#to-top',0.3,{
            x:100
        });
    };
},300));

const toTopEl = document.querySelector('#to-top');
toTopEl.addEventListener('click', function(){
    gsap.to(window,0.7,{
        scrollTo:0
    })
});