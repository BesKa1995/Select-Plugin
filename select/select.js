import { invertArrow } from "./utils"

const getTemplate = (data = [], placeholder) => {
  const text = placeholder ?? 'default Placeholder'


  return /*html*/`
  <div class="select__input" data-type="input">
    <span data-type="value">${text}</span>
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
    return /*html */`<${tag} class="select__item" data-type="item" data-id="${item.id}">${item.value}</${tag}>`
  })
}

export class Select {
  constructor(selector, options) {

    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = null
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
    this.$value = this.$el.querySelector('[data-type="value"]')
  }

  clickHandler(event) {
    const { type } = event.target.dataset

    if (['input', 'arrow'].includes(type)) {
      this.toggle()
    } else if (type === 'item') {
      const id = event.target.dataset.id
      this.select(id)
    }
  }


  get isOpen() {
    return this.$el.classList.contains('open')
  }

  get selectedElement() {
    return this.options.data.find(item => item.id === this.selectedId)
  }

  select(id) {
    this.selectedId = Number(id)
    this.$value.textContent = this.selectedElement.value
    this.close()
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