export const Results = ({ results }) => {
    return (
        <section>
            <p>{results.conversation.toxicity}</p>
            <ul>
                {results.people.map((person) => {
                    return (
                        <li key={person.name}>{person.name}: {person.results.toxicity}</li>
                    )
                })}
            </ul>
        </section>
    )
}