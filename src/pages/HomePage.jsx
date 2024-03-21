import { FileUploader } from "../components/FileUploader"
import { Results } from "../components/Results"
import { useState, useEffect } from "react"
import { getConversationToxicity } from "../../getConversationToxicity"
import { getMostToxicPerson } from "../../getMostToxicPerson"

export const HomePage = () => {
    const [files, setFiles] = useState('')
    const [results, setResults] = useState({
        conversation: {},
        people: [],
    })
    const [isLoading, setIsLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('')

    useEffect(() => {
        
        if (files) {
            setLoadingMessage('Analysing toxicity...')
            let conversationResults = {}

            getConversationToxicity(files)
            .then((response) => {
                conversationResults = response
            })

            let peopleToxicity = getMostToxicPerson(files)

            peopleToxicity[0]
            .then((response) => {
                let peopleArr = []

                for (let i = 0; i < peopleToxicity[1].length; i++) {
                    let personObj = {}

                    personObj['name'] = peopleToxicity[1][i]
                    personObj['results'] = response[i]

                    peopleArr.push(personObj)
                }
                setResults((results) => ({...results, conversation: conversationResults, people: peopleArr}))
            })
            .finally(() => {
                setLoadingMessage('')
                setIsLoading(false)
            })
        }
    }, [files])

    return (
        <section>
            <h1>Toxicity Calculator</h1>
            <FileUploader setFiles={setFiles} setIsLoading={setIsLoading} setLoadingMessage={setLoadingMessage} setResults={setResults}/>
            {isLoading ? <p>{loadingMessage}</p> : null}
            {results ? <Results results={results} /> : null}
        </section>
    )
}