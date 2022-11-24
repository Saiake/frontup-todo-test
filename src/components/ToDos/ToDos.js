function ToDos({toDo}) {
    return (
        <div>
            {
                toDo.map(item => (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <div>{item.description}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default ToDos