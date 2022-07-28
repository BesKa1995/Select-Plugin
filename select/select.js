const getTemplate = () => {
  return /*html*/`
  <div class="select__input" data-type="input">
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
    this.#setup()
  }

  #render() {
    this.$el.innerHTML = getTemplate()
    this.$el.classList.add('select')
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)

    this.$el.addEventListener('click', this.clickHandler)
  }

  clickHandler(event) {
    const { type } = event.target.dataset

    if (type === "input") {
      this.toggle()
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open')
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.$el.classList.add('open')
  }

  close() {
    this.$el.classList.remove('open')
  }
}


