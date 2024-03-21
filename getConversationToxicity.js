// import * as tf from '@tensorflow/tfjs-node';
import * as toxicity from '@tensorflow-models/toxicity';
import * as fs from 'node:fs'
import { cleanTxt } from './cleanTxt.js';
import { getToxicity } from './api.js';

const data = fs.readFileSync('./data/niceConversation.txt', 'utf8')
const allSentences = cleanTxt(data).allSentences

export function getMostToxicPerson (data) {

  getToxicity(allSentences)
  .then((response) => {
    return response
  })

}

getMostToxicPerson(data)