import { cleanTxt } from './cleanTxt.js';
import { getToxicity } from './api.js';

export function getConversationToxicity (data) {
    const allSentences = cleanTxt(data).allSentences
    return getToxicity(allSentences)
}
