import { invertArrow } from "./utils"

const getTemplate = (data = [], placeholder) => {
  const text = placeholder ?? 'default Placeholder'


  return /*html*/`
  <div class="select__input" data-type="input">
    <span>${text}</span>
    <i class="fa-solid fa-chevron-down" data-type="arrow"></i>
  </div >
  <div class="select__dropdown">
    <ul class="select__list">
      ${genDataToHTML(data, 'li').join('')}
    </ul>
  </div>

`
}

function genDataToHTML(data, tag) {
  return data.map((item) => {
    return /*html */`<${tag} class="select__item">${item.value}</${tag}>`
  })
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.#render()
    this.#setup()
  }

  #render() {
    const { placeholder, data } = this.options
    this.$el.innerHTML = getTemplate(data, placeholder)
    this.$el.classList.add('select')
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
  }

  clickHandler(event) {
    const { type } = event.target.dataset

    if (['input', 'arrow'].includes(type)) {
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
    invertArrow(this.$arrow)
    this.$el.classList.add('open')
  }

  close() {
    invertArrow(this.$arrow)
    this.$el.classList.remove('open')
  }
}