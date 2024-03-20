import { getToxicity } from "../../api"

export const FileUploader = ({setFiles, setIsLoading, setResults}) => {

    function handleUploadFile(event) {
        event.preventDefault()
        setIsLoading(true)
        setResults('')

        const reader = new FileReader()
        reader.readAsText(event.target.files[0])
        reader.onload = e => {
            setFiles(e.target.result)
        }
    }

    return (
        <div>
            <input id="file" type="file" onChange={handleUploadFile}></input>
        </div>
    )
}