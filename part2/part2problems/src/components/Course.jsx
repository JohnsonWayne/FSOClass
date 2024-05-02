const Content = ({ parts }) => {

    const total = parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        0,
    )

    return (
        <>
            {parts.map(part =>
                <Part key={part.id} part={part}/>
            )}            
            <strong>total of {total} exercises</strong>
        </>
    )
}

const Header = ({ header }) => {
    return (
        <h1>{header}</h1>
    )
}



const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}


const Course = ({ course }) => {
    return (
        <div>
            <Header key={course.id} header={course.name} />
            <Content parts={course.parts} />           
        </div>
    )
}


export default Course