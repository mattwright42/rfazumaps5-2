// JavaScript Document

const Swiper01 = new Swiper('.swiper_character', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  grabCursor: true,
	enabled: true,
	//autoHeight: true,

	pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // 前後の矢印
  navigation: {
    nextEl: ".swiperc-button-next",
    prevEl: ".swiperc-button-prev",
  },
  //observer: true,
  //observeParents: true,
	breakpoints: {
    1025: {
//      spaceBetween: 32,
    }
  },
});

//▼02//////////////////////////////////////
const Swiper02 = new Swiper('.swiper_pictx', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  grabCursor: true,
	enabled: true,
	
//	centeredSlides: true,
	slideToClickedSlide: true,  // ← これがポイント！
centeredSlidesBounds: true,

	pagination: {
    el: '.swiperpt-pagination',
    clickable: true,
  },
  // 前後の矢印
  navigation: {
    nextEl: ".swiperpt-button-next",
    prevEl: ".swiperpt-button-prev",
  },
  breakpoints: {
    768: {
			spaceBetween: 20,
			//	centeredSlides: true,

			centeredSlidesBounds: true,
    }
  },
});

////ナビゲーションクラスのバグを防ぐ、、、例えばモーダルを開いたタイミングとか
//document.querySelector('.open-swiper-btn').addEventListener('click', () => {
//  document.querySelector('.swiper-wrap').style.display = 'block';
//  // 表示されたあとに update！
//  setTimeout(() => {
//    Swiper01.update();
//    Swiper02.update();
//  }, 50);
//});

window.addEventListener('load', function () {
  Swiper01.update();
  Swiper02.update();
  // ... 全Swiperをここでまとめて更新
});

//document.querySelector('.tab-button').addEventListener('click', () => {
//  document.querySelector('.tab-content').style.display = 'block';
//
//  setTimeout(() => {
//  Swiper01.update();
//  Swiper02.update();
//  }, 50); // 表示直後に走らせる
//});

const images = document.querySelectorAll('.swiper-container img');
let loaded = 0;

images.forEach(img => {
  if (img.complete) {
    loaded++;
    if (loaded === images.length) {
      allLoaded();
    }
  } else {
    img.addEventListener('load', () => {
      loaded++;
      if (loaded === images.length) {
        allLoaded();
      }
    });
  }
});

function allLoaded() {
  Swiper01.update();
  Swiper02.update();
}