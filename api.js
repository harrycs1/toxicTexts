// import * as tf from '@tensorflow/tfjs-node';
import * as toxicity from '@tensorflow-models/toxicity';

export function getToxicity (sentences) {
  return new Promise((resolve, reject) => {
    // The minimum prediction confidence.
    const threshold = 0.99;

    // Load the model. Users optionally pass in a threshold and an array of
    // labels to include.
    toxicity.load(threshold).then(model => {
      // const sentences = ['you suck', 'no you', 'why not', 'suck your mum'];

      model.classify(sentences).then(predictions => {
        // `predictions` is an array of objects, one for each prediction head,
        // that contains the raw probabilities for each input along with the
        // final prediction in `match` (either `false` or `true`).
        // If neither prediction exceeds the threshold, `match` is `null`.

        // console.log(predictions);
        /*
        prints:
        {
          "label": "identity_attack",
          "results": [{
            "probabilities": [0.9659664034843445, 0.03403361141681671],
            "match": false
          }]
        },
        {
          "label": "insult",
          "results": [{
            "probabilities": [0.08124706149101257, 0.9187529683113098],
            "match": true
          }]
        },
        ...
        */

        let results = {}

        predictions.forEach((prediction) => {
          let label = prediction.label
          let combinedProbability = prediction.results.map((result) => {
            return result.probabilities[1]
          }).reduce((a, b) => a + b) / prediction.results.length

          results[label] = combinedProbability.toFixed(2)
        })

        let maxToxicity = Math.max(...predictions[6].results.map((result) => {
          return result.probabilities[1]
        }))

        results['max'] = maxToxicity
        // console.log(results)
        resolve(results)
      });
    });
  })
}

// getToxicity(data)