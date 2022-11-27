import dayjs from 'dayjs'

function ToDos({toDo}) {

    return (
        <div>
            {
                toDo.map(item => (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <div>{item.description}</div>
                        <div>{dayjs(dayjs.unix(item.date.seconds)).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default ToDos