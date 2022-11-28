import {useRef, useState} from "react"
import {addTodoDB, addTodoFilesDB} from "../../Firebase" 
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid';
import "./ToDoForm.css"

function ToDoForm({TLength, setTLength}) {

    const [isActive, setIsActive] = useState(false)

    const [inputs, setInputs] = useState({date: dayjs().format('YYYY-MM-DDTHH:mm')})

    const ref = useRef()

    const handleEntailmentRequest = (e) => {
        e.preventDefault();
        let fileNames = []
        const id = uuidv4()
        if (inputs.files) {
            Array.from(inputs.files).forEach(file => {
                fileNames = [...fileNames, file.name]
            })
            addTodoFilesDB(id, inputs.files)
        }
        const todo = {
            title: inputs.title,
            description: inputs.description,
            date: inputs.date,
            completed: false,
            files: fileNames
        }
        addTodoDB(id, todo, {merge: false}) 
        setTLength(TLength + 1)
        setInputs({date: dayjs().format('YYYY-MM-DDTHH:mm')})
        ref.current.value = ''
    }

    const handleInputChange = (e) => {
        if (e.target.name == "files")
            setInputs({...inputs, [e.target.name]: e.target.files})
        else setInputs({...inputs, [e.target.name]: e.target.value})
    }

    return (
        <div className="form">
            <div className="form-item">
                <div className="form-title" onClick={() => setIsActive(!isActive)}>
                    <div>Добавить</div>
                    <div>{isActive ? '-' : '+'}</div>
                </div>
                {isActive && 
                    <form className="form-content" onSubmit={(e) => handleEntailmentRequest(e)}>
                        <input placeholder="Заголовок" type="text" name="title" 
                        onChange={(e) => handleInputChange(e)} value={inputs.title || ''} required/>
                        <textarea placeholder="Описание" type="text" name="description" 
                        onChange={(e) => handleInputChange(e)} value={inputs.description || ''} required/>
                        <input type="datetime-local" name="date" 
                        onChange={(e) => handleInputChange(e)} value={inputs.date} required/>
                        <input type="file" name="files" multiple ref={ref}
                        onChange={(e) => handleInputChange(e)} files={inputs.files || ''}/>
                        <button type="submit">Сохранить</button>
                    </form>
                }
            </div>
        </div>
    )
}

export default ToDoForm