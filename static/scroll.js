const accent1 = [243, 217, 122];
const accent2 = [209, 241, 168];

function runOnScroll() {
  let offset = window.scrollY / (document.body.offsetHeight - window.innerHeight);
  offset = offset ** 3.5;
  const color = [
    accent1[0] + offset * (accent2[0] - accent1[0]),
    accent1[1] + offset * (accent2[1] - accent1[1]),
    accent1[2] + offset * (accent2[2] - accent1[2]),
  ];
  document
    .querySelector(':root')
    .style.setProperty(
    '--accent',
    `rgb(${color[0]},${color[1]},${color[2]})`
  );
}

window.addEventListener('scroll', () => runOnScroll(), {passive: true});