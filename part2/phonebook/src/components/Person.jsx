
const Person = (props) => {
    return (
        <p>{props.name} {props.number} <button onClick={() => props.deletePerson(props.name)}>Delete</button></p>
    )
} 

export default Person