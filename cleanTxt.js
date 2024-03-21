// import * as fs from 'node:fs'
// const data = fs.readFileSync('./data/niceConversation.txt', 'utf8')

export function cleanTxt (data) {
    let allSentences = []
    let sentencesByPerson = {}

    try {
      let lines = data.split('\n')

      for (const line of lines) {
        let name = line.slice(23).split(':')[0]
        let message = line.slice(25 + name.length)

        if (sentencesByPerson[name]) {
            sentencesByPerson[name].push(message)
        } else {
            sentencesByPerson[name] = [message]
        }

        allSentences.push(message)
      }
      
    } catch (error) {
      console.log(error)
    }

    return {
        "allSentences": allSentences,
        "sentencesByPerson": sentencesByPerson
    }
}