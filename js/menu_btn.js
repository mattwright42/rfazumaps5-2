// JavaScript Document

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector('.menu_btn_box');
  const menuBlank = document.querySelector('.menu_blank');
  const menuBox = document.querySelector('.menu_blank .box');

  // トグル処理（共通化）
  function toggleMenu() {
    const isOpen = menuBlank.classList.contains('on');

    if (isOpen) {
      // フェードアウトして非表示に
      menuBlank.classList.remove('on');
      menuBlank.classList.add('off');
      menuBtn.classList.remove('on');
      menuBtn.classList.add('off');

      menuBlank.style.transition = 'opacity 0.4s ease';
      menuBlank.style.opacity = 0;

      setTimeout(() => {
        menuBlank.style.display = 'none';
      }, 400);
    } else {
      // フェードインして表示
      menuBlank.classList.remove('off');
      menuBlank.classList.add('on');
      menuBtn.classList.remove('off');
      menuBtn.classList.add('on');

      menuBlank.style.display = 'flex';
      menuBlank.style.opacity = 0;
      menuBlank.style.transition = 'opacity 0.4s ease';

      requestAnimationFrame(() => {
        menuBlank.style.opacity = 1;
      });
    }
  }

  // ボタンをクリックしたら開閉
  menuBtn.addEventListener('click', function (e) {
    toggleMenu();
  });

  // .menu_blank の中で .box 以外をクリックしたら閉じる
  menuBlank.addEventListener('click', function (e) {
    if (!menuBox.contains(e.target)) {
      toggleMenu();
    }
  });
});


