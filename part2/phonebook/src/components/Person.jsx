
const Person = (props) => {
    return (
        <p>{props.name} {props.number} <button onClick={props.deletePerson}>delete</button></p>
    )
} 

export default Person