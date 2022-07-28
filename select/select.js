const getTemplate = () => {
  return /*html*/`
  <div class="select__input">
    <span>Heloo</span>
    <i class="fa-solid fa-chevron-down"></i>
  </div>
  <div class="select__dropdown">
    <ul class="select__list">
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
    </ul>
  </div>
  
  `
}
export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.#render()
  }

  #render() {
    this.$el.innerHTML = getTemplate()
    this.$el.classList.add('select')
  }
  open() {
    this.$el.classList.add('open')
  }
  close() {
    this.$el.classList.remove('open')
  }
}


