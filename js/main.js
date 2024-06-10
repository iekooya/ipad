// js파일 가져와서 적용하기
// import 가져올스크립트 변수명 form '파일 경로'
import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'


// Header > 장바구니
const basketStarterEl = document.querySelector('header .basket-stater');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function(event){
  //click 이벤트를 상위요소로 전파시키지 않겠다는 의미
  event.stopPropagation();

  if (basketEl.classList.contains('show')) {
    //hide
    hideBasket();
  } else {
    //show
    showBasket();
  }
});

basketEl.addEventListener('click', function(event){
  //click 이벤트를 상위요소로 전파시키지 않겠다는 의미
  event.stopPropagation();
});


window.addEventListener('click', function(){
  hideBasket();
});

function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}



// Header > 검색
const headerEl = document.querySelector('header');
// [] 배열데이터를 의미
// ... 전개 연산자(Spread operator)를 통해 해체한 내용을 얕은 복사(Shallow Copy)해 배열에 담음
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-stater');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

// 요소 클릭시 showSearch 함수 실행(콜백함수실행)
searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  //document.documentElement 는 html 태그를 의미
  document.documentElement.classList.add('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  });
  searchDelayEls.forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  });
  setTimeout(function(){
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  });
  searchDelayEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  });
  //역순으로 된 searchDelayEls를 다시 정순으로 만들기
  searchDelayEls.reverse();
  searchInputEl.value = '';
}

//요소의 가시성 관찰
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show');
  });
});
const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function(el){
  io.observe(el);
});


// 비디오 재생!
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function(){
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});

pauseBtn.addEventListener('click', function(){
  video.pause();
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});


// '당신에게 맞는 iPad는?' 랜더링!
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach(function(ipad) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';

  // ipad.colors 안의 배열 갯수에 맞게 반복실행 됨
  ipad.colors.forEach(function(color){
    colorList += `<li style="background-color: ${color};"></li>`
  });

  // `` template literal 방식
  // comment tagged templates 확장프로그램 사용을 위해 /* html */를 추가
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">￦${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl);
});


// Footer / Navigations
const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach(function(nav){
  const mapEl = document.createElement('div');
  
  mapEl.classList.add('map');

  let mapList = '';
  nav.maps.forEach(function(map) {
    mapList +=  /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `
  navigationsEl.append(mapEl);
});


const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();

