import { invertArrow, removeClassSelectFromEl } from "./utils"

const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'default Placeholder'
  data.forEach(item => item.id === Number(selectedId) ? text = item.value : null)

  return /*html*/`
  <div class="select__backdrop" data-type="backdrop"></div>
  <div class="select__input" data-type="input">
    <span data-type="value">${text}</span>
    <i class="fa-solid fa-chevron-down" data-type="arrow"></i>
  </div >
  <div class="select__dropdown">
    <ul class="select__list">
      ${genDataToHTML(data, 'li', selectedId).join('')}
    </ul>
  </div>

`
}

function genDataToHTML(data, tag, selectedId) {

  return data.map((item) => {
    let cls = ''
    if (item.id === Number(selectedId)) {
      cls = 'selected'
    }
    return /*html */`
    <${tag}
     class="select__item ${cls}" 
     data-type="item" 
     data-id="${item.id}">
     ${item.value}
     </${tag}>`
  })
}

export class Select {
  constructor(selector, options) {

    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId
    this.#render()
    this.#setup()
  }

  #render() {
    const { placeholder, data } = this.options
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
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
    } else if (type === 'backdrop') {
      this.close()
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
    this.options.onSelect && this.options.onSelect(this.selectedElement)
    removeClassSelectFromEl('selected', this.$el.querySelectorAll(`[data-type="item"]`))
    this.$el.querySelector(`[data-id="${this.selectedId}"]`).classList.add('selected')
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
  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML = ''
  }
}