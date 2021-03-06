(async () => {
  const { writeFile } = require('fs').promises
  const alignment = require('./b5-300-120-alignment.json')
  const language = 'ur'
  const questions = require(`../data/${language}/questions.json`)
  const getAlignment = id => alignment.find(item => item['300'] === id)
  const alignedQuestions = questions.reduce((accumulator, current) => {
    const aligned = getAlignment(current.id)
    if (aligned) {
      current.id = aligned['120']
    }
    accumulator.push(current)
    return accumulator
  }, [])
  await writeFile(`data/${language}/questions.json`, JSON.stringify(alignedQuestions, null, 2), 'utf-8')
  console.log(`Aligned questions for ${language}`)
})()
