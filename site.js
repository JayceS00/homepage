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

// 스크롤 시 헤더 축소
const root = document.documentElement;
root.classList.add('js');
const onScroll = () => root.classList.toggle('scrolled', scrollY > 80);
addEventListener('scroll', onScroll, { passive: true });
onScroll();
header.addEventListener('transitionend', setHeaderHeight);

// 스크롤에 맞춰 요소가 떠오르는 연출
const fadeTargets = document.querySelectorAll(
  '.section-title, .card, .ingredient-item, .how-item, .words, .official-box, .shop-grid a, .related-grid a, ' +
  '.manifesto blockquote p, .manifesto .more, .origin > *, .logo-story-grid > *, .band:not(.home-hero) > *, ' +
  '.info-table, .empty, .policy article, .editorial h2, .editorial .caption, .disclaimer'
);
const imageTargets = document.querySelectorAll('.poster, .split img, .guide');
fadeTargets.forEach((el) => {
  el.classList.add('reveal');
  const i = [...el.parentElement.children].indexOf(el);
  el.style.setProperty('--d', Math.min(i, 5) * 0.09 + 's');
});
imageTargets.forEach((el) => el.classList.add('reveal-img'));
// 화면에 들어온 요소를 표시한다. 위치를 직접 계산해 어떤 브라우저에서도 내용이 숨은 채 남지 않게 한다.
let pending = [...fadeTargets, ...imageTargets];
const showVisible = () => {
  const limit = innerHeight * 0.94;
  pending = pending.filter((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < limit && r.bottom > 0) {
      el.classList.add('in');
      return false;
    }
    return r.bottom > 0 || (el.classList.add('in'), false);
  });
  if (!pending.length) {
    removeEventListener('scroll', showVisible);
    removeEventListener('resize', showVisible);
  }
};
addEventListener('scroll', showVisible, { passive: true });
addEventListener('resize', showVisible);
addEventListener('load', showVisible);
showVisible();
