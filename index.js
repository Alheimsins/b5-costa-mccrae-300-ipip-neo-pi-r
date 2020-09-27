const { knuthShuffle } = require('knuth-shuffle')
const languages = require('./data/languages.json')

function languageSort (a, b) {
  if (a.text < b.text) {
    return -1
  }
  if (a.text > b.text) {
    return 1
  }
  return 0
}

languages.sort(languageSort)

module.exports.getItems = (lang = 'en', shuffle = false) => {
  let choices, questions
  try {
    questions = require(`./data/${lang}/questions.json`)
    choices = require(`./data/${lang}/choices`)
  } catch (error) {
    throw new Error('Inventory not found. Try another language input.')
  }

  const inventory = shuffle === true ? knuthShuffle(questions) : questions
  return inventory.map((question, i) => Object.assign(question, { num: ++i, choices: choices[question.keyed] }))
}

module.exports.getInfo = () => {
  return {
    name: 'Costa and McCrae\'s 300 IPIP-NEO-PI-R',
    id: 'b5-costa-mccrae-300-ipip-neo-pi-r',
    shortId: 'b5-300',
    time: 20,
    questions: 300,
    note: 'Recommended',
    languages
  }
}

module.exports.getChoices = (lang = 'en') => {
  let choices
  try {
    choices = require(`./data/${lang}/choices`)
  } catch (error) {
    throw new Error('Choices not found. Try another language input.')
  }
  return choices
}

module.exports.getQuestions = (lang = 'en') => {
  let questions
  try {
    questions = require(`./data/${lang}/questions`)
  } catch (error) {
    throw new Error('Questions not found. Try another language input.')
  }
  return questions
}
