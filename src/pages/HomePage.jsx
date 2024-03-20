import { FileUploader } from "../components/FileUploader"
import { Results } from "../components/Results"
import { useState, useEffect } from "react"
import { getToxicity } from "../../api"

export const HomePage = () => {
    const [files, setFiles] = useState('')
    const [results, setResults] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        
        if (files) {
            getToxicity(files)
            .then((results) => {
                setResults(results)
                setIsLoading(false)
            })
        }

    }, [files])

    return (
        <section>
            <h1>Toxicity Calculator</h1>
            <FileUploader setFiles={setFiles} setIsLoading={setIsLoading} setResults={setResults}/>
            {isLoading ? <p>Loading...</p> : null}
            {results ? <Results results={results} /> : null}
        </section>
    )
}