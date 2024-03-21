// import * as tf from '@tensorflow/tfjs-node';
import * as toxicity from '@tensorflow-models/toxicity';
import * as fs from 'node:fs'
import { cleanTxt } from './cleanTxt.js';
import { getToxicity } from './api.js';

const data = fs.readFileSync('./data/niceConversation.txt', 'utf8')
const sentencesByPerson = cleanTxt(data).sentencesByPerson

export function getMostToxicPerson (data) {
  let result = []

  for (let person in sentencesByPerson) {
    getToxicity(sentencesByPerson[person])
      .then((response) => {
        result[person] = response
      })
  }

  return result
}

getMostToxicPerson(data)