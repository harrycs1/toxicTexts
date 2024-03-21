// import * as tf from '@tensorflow/tfjs-node';
// import * as toxicity from '@tensorflow-models/toxicity';
// import * as fs from 'node:fs'
import { cleanTxt } from './cleanTxt.js';
import { getToxicity } from './api.js';

// const data = fs.readFileSync('./data/niceConversation.txt', 'utf8')

export function getMostToxicPerson (data) {
  const sentencesByPerson = cleanTxt(data).sentencesByPerson
  let promises = []
  let people = []

  for (let person in sentencesByPerson) {
    people.push(person)
    promises.push(getToxicity(sentencesByPerson[person]))
  }

  return [Promise.all(promises), people]
}

// getMostToxicPerson(data)