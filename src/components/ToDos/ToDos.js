import dayjs from 'dayjs'
import {useEffect} from 'react'
import {getTodosDB} from "../../Firebase" 

function ToDos({toDo, setToDo}) {

    useEffect(()=> {
        getTodosDB().then(doc => {
            setToDo(doc)
        })
    })

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