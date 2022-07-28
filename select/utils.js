export function invertArrow(arrow) {
  if (arrow.classList.value.includes('down')) {
    arrow.classList.remove('fa-chevron-down')
    arrow.classList.add('fa-chevron-up')
  } else {
    arrow.classList.remove('fa-chevron-up')
    arrow.classList.add('fa-chevron-down')
  }
}