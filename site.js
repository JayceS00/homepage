// 헤더 높이를 CSS 변수로 전달 (탭 메뉴 고정 위치·앵커 이동 보정용)
const header = document.querySelector('header');
const setHeaderHeight = () =>
  document.documentElement.style.setProperty('--hh', header.offsetHeight + 'px');
setHeaderHeight();
addEventListener('resize', setHeaderHeight);
addEventListener('load', setHeaderHeight);

// 아직 연결되지 않은 기능 안내
const toast = document.querySelector('.toast');
let toastTimer;
document.querySelectorAll('[data-soon]').forEach((el) =>
  el.addEventListener('click', () => {
    toast.textContent = el.dataset.soon;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  })
);

// 찜하기 토글
document.querySelectorAll('.wish').forEach((btn) =>
  btn.addEventListener('click', () => {
    const on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', on);
    btn.textContent = on ? '♥' : '♡';
  })
);

// 현재 보고 있는 구역의 탭 강조
const tabs = [...document.querySelectorAll('.tabs a')];
if (tabs.length) {
  const targets = tabs.map((a) => document.querySelector(a.getAttribute('href')));
  const mark = () => {
    const line = header.offsetHeight + 80;
    let current = 0;
    targets.forEach((t, i) => {
      if (t && t.getBoundingClientRect().top <= line) current = i;
    });
    tabs.forEach((a, i) => a.classList.toggle('on', i === current));
  };
  addEventListener('scroll', mark, { passive: true });
  mark();
}
