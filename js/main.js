// const hero = document.querySelector('.hero');
// const video = document.querySelector('.hero-video');
// const skipBtn = document.querySelector('.skip-btn');

// const FALLBACK_DURATION = 8; // 動画の実際の長さ(秒)に合わせて調整
// const FADE_DURATION = 3000; // ミリ秒。CSSのtransitionの秒数と合わせる

// let savedScrollY = 0;

// function lockScroll() {
//     savedScrollY = window.scrollY;
//     document.body.style.position = 'fixed';
//     document.body.style.top = `-${savedScrollY}px`;
//     document.body.style.width = '100%';
// }

// function unlockScroll() {
//     document.body.style.position = '';
//     document.body.style.top = '';
//     document.body.style.width = '';
//     window.scrollTo(0, savedScrollY); // 元のスクロール位置に戻す
// }

// lockScroll(); // ページ読み込み時点(動画再生中)からスクロールを禁止しておく

// function showContent() {
//     if (hero.classList.contains('is-loaded')) return; // 二重発火防止
//     hero.classList.add('is-loaded');
//     unlockScroll();

//     setTimeout(() => {
//         video.pause();
//     }, FADE_DURATION);
// }

// video.addEventListener('timeupdate', () => {
//     const duration = isFinite(video.duration) ? video.duration : FALLBACK_DURATION;
//     const remaining = duration - video.currentTime;
//     if (remaining <= 3) {
//         showContent();
//     }
// });

// video.addEventListener('ended', () => {
//     showContent();
// });

// skipBtn.addEventListener('click', showContent);



// //ハンバーガーメニュー
// const body = document.body;
// const burger = document.getElementById('js-burger');
// const mask = document.getElementById('mask');

// function toggleMenu() {
//     body.classList.toggle('menu-active');
//     burger.classList.toggle('open');
//     // syncNavBgPos();
// }

// burger.addEventListener('click', toggleMenu);
// mask.addEventListener('click', toggleMenu);
// //window.addEventListener('resize', syncNavBgPos);




// function showContent() {
//     if (hero.classList.contains('is-loaded')) return;

//     // ① 先にspanを作る(この時点では --opacity がまだ無いので透明)
//     const line1 = "北海道を、美しく折りたたむ";
//     const line2 = "食べるアート、誕生。";

//     const chars1 = Array.from(line1);
//     const chars2 = Array.from(line2);

//     const spans1 = chars1.map((char, index) => {
//         return `<span class="char" style="--char-index: ${index}">${char}</span>`;
//     });

//     const spans2 = chars2.map((char, index) => {
//         return `<span class="char" style="--char-index: ${index + chars1.length}">${char}</span>`;
//     });

//     const line1HTML = `<span class="line">${spans1.join('')}</span>`;
//     const line2HTML = `<span class="line">${spans2.join('')}</span>`;

//     const textEl = document.querySelector('.hero-cont-wrap h2');
//     textEl.innerHTML = `
//       <span class="visuallyHidden">${line1}${line2}</span>
//       <span aria-hidden="true">${line1HTML}<br>${line2HTML}</span>
//     `;

//     // ② その後で is-loaded を付ける(--opacity: 1 が伝わり、変化が起きる)
//     requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//             hero.classList.add('is-loaded');
//         });
//     });
//     unlockScroll();

//     setTimeout(() => {
//         video.pause();
//     }, FADE_DURATION);
// }



const hero = document.querySelector('.hero');
const video = document.querySelector('.hero-video');
const skipBtn = document.querySelector('.skip-btn');

const FALLBACK_DURATION = 8;
const FADE_DURATION = 3000;

let savedScrollY = 0;

function lockScroll() {
    savedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = '100%';
}

function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, savedScrollY);
}

// ★動画がある(=トップページ)時だけ、動画まわりの処理を実行する
if (video) {
    lockScroll();

    function showContent() {
        if (hero.classList.contains('is-loaded')) return;

        const line1 = "北海道を、美しく折りたたむ";
        const line2 = "食べるアート、誕生。";

        const chars1 = Array.from(line1);
        const chars2 = Array.from(line2);

        const spans1 = chars1.map((char, index) => {
            return `<span class="char" style="--char-index: ${index}">${char}</span>`;
        });

        const spans2 = chars2.map((char, index) => {
            return `<span class="char" style="--char-index: ${index + chars1.length}">${char}</span>`;
        });

        const line1HTML = `<span class="line">${spans1.join('')}</span>`;
        const line2HTML = `<span class="line">${spans2.join('')}</span>`;

        const textEl = document.querySelector('.hero-cont-wrap h2');
        if (textEl) {
            textEl.innerHTML = `
              <span class="visuallyHidden">${line1}${line2}</span>
              <span aria-hidden="true">${line1HTML}<br>${line2HTML}</span>
            `;
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                hero.classList.add('is-loaded');
            });
        });
        unlockScroll();

        setTimeout(() => {
            video.pause();
        }, FADE_DURATION);
    }

    video.addEventListener('timeupdate', () => {
        const duration = isFinite(video.duration) ? video.duration : FALLBACK_DURATION;
        const remaining = duration - video.currentTime;
        if (remaining <= 3) {
            showContent();
        }
    });

    video.addEventListener('ended', () => {
        showContent();
    });

    if (skipBtn) {
        skipBtn.addEventListener('click', showContent);
    }
}

// ★ハンバーガーメニューは動画の有無に関係なく、どのページでも動くようにする
const body = document.body;
const burger = document.getElementById('js-burger');
const mask = document.getElementById('mask');

function toggleMenu() {
    body.classList.toggle('menu-active');
    burger.classList.toggle('open');
}

if (burger && mask) {
    burger.addEventListener('click', toggleMenu);
    mask.addEventListener('click', toggleMenu);
}