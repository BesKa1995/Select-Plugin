const button = document.getElementsByTagName('button')[0]
button.addEventListener('click', (e) => {
  console.log(e.target)
})



const idToUserMap = {
  123: {
    firstName: '',
    lastName: 'John',
    age: 30
  }
}

console.log(idToUserMap[123]?.firstName?.substring(0, 1))
