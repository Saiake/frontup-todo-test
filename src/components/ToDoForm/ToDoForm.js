import {useState} from "react"
import {addTodoDB, addTodoFileDB} from "../../Firebase" 
import dayjs from 'dayjs'

function ToDoForm({addOrEdit, TLength, setTLength}) {

    const [isActive, setIsActive] = useState(false)
    const [inputs, setInputs] = useState({date: dayjs().format('YYYY-MM-DDTHH:mm')})

    const handleEntailmentRequest = (e) => {
        e.preventDefault();
        const todo = {
            title: inputs.title,
            description: inputs.description,
            date: inputs.date,
            completed: false,
        };
        addTodoDB(todo)
        if (inputs.files)
            addTodoFileDB(inputs.title, inputs.files)
        setTLength(TLength + 1)
    }

    const handleInputChange = (e) => {
        if (e.target.name == "files")
            setInputs({...inputs, [e.target.name]: e.target.files})
        else setInputs({...inputs, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <div onClick={() => setIsActive(!isActive)}>
                {addOrEdit ? 
                    <div>Добавить</div> :
                    <div>Редактировать</div>
                }
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && 
                <form onSubmit={(e) => handleEntailmentRequest(e)}>
                    <input placeholder="Заголовок" type="text" name="title" 
                    onChange={(e) => handleInputChange(e)} value={inputs.title || ''} required/>
                    <textarea placeholder="Описание" type="text" name="description" 
                    onChange={(e) => handleInputChange(e)} value={inputs.description || ''} required/>
                    <input type="datetime-local" name="date" 
                    onChange={(e) => handleInputChange(e)} value={inputs.date} required/>
                    <input type="file" name="files" 
                    onChange={(e) => handleInputChange(e)} files={inputs.files || ''}/>
                    <button type="submit">Сохранить</button>
                </form>
            }
        </div>
    )
}

export default ToDoForm