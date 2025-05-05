// JavaScript Document


//キャラクターの大画像を表示
document.addEventListener("DOMContentLoaded", function () {
  for (let i = 1; i <= 17; i++) {
    const num = String(i).padStart(2, '0');
    const btn = document.querySelector('.cbtn' + num);
    const cp = document.querySelector('.cp' + num);

    if (btn && cp) {
      const figure = cp.querySelector('figure');

      // 初期状態
      cp.style.display = 'none';
      cp.style.opacity = 0;
      if (figure) {
        figure.style.transform = 'scale(0.9)';
        figure.style.transition = 'transform 0.3s ease';
      }

      // ボタンをクリック → フェードイン + scale up
      btn.addEventListener('click', function () {
        cp.classList.add('on');
        cp.style.display = 'block';

        requestAnimationFrame(() => {
          cp.style.transition = 'opacity 0.3s ease';
          cp.style.opacity = 1;
          if (figure) {
            figure.style.transform = 'scale(1)';
          }
        });
      });

      // cp をクリック → フェードアウト + scale down
      cp.addEventListener('click', function () {
        cp.style.transition = 'opacity 0.2s ease';
        cp.style.opacity = 0;
        if (figure) {
          figure.style.transform = 'scale(0.9)';
        }

        setTimeout(() => {
          cp.style.display = 'none';
          cp.classList.remove('on');
        }, 400);
      });
    }
  }
});



//大見出しの演出（モダン版）
window.addEventListener('load', function () {
  const targets = document.querySelectorAll('.fadein');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target); // 一度だけ実行
      }
    });
  }, {
    root: null, // ビューポートが基準
    rootMargin: '0px 0px -25% 0px', // 画面の下から25%のラインで発動
    threshold: 0 // 1pxでも見えたら反応
  });

  targets.forEach(target => {
    observer.observe(target);
  });
});


//中見出しの演出（モダン版）
//window.addEventListener('load', function () {
//  const targets = document.querySelectorAll('.tit02');
//
//  const observer = new IntersectionObserver((entries, observer) => {
//    entries.forEach(entry => {
//      if (entry.isIntersecting) {
//        entry.target.classList.add('on');
//        observer.unobserve(entry.target); // 一度だけ実行
//      }
//    });
//  }, {
//    root: null, // ビューポートが基準
//    rootMargin: '0px 0px -12.5% 0px', // 画面の下から25%のラインで発動
//    threshold: 0 // 1pxでも見えたら反応
//  });
//
//  targets.forEach(target => {
//    observer.observe(target);
//  });
//});




