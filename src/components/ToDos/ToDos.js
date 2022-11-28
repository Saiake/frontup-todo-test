import dayjs from 'dayjs'
import {useEffect, useState} from 'react'
import {getTodosDB, getTodoFilesDB, deleteTodoDB, addTodoDB, addTodoFilesDB, updateTodoDB} from '../../Firebase'
import './ToDos.css'

function ToDos({toDo, setToDo, TLength, setTLength}) {

    useEffect(()=> {
        toDo.forEach(item => {
            if (dayjs(item.date).diff(dayjs().format('YYYY-MM-DDTHH:mm')) > 0) {
                closeToDo(item.id, item.completed)
                item.completed = false
            }
        })
    }, [])

    const [isActive, setIsActive] = useState('');
    
    const [edit, setEdit] = useState('')

    const [inputs, setInputs] = useState({})
    
    const handleDivClick = (id) => {
        isActive == id ? 
            setIsActive('') :
            setIsActive(id)
    }

    const deleteToDo = (id) => {
        deleteTodoDB(id)
        getTodosDB().then(doc => {
            setToDo(doc)
            setTLength(TLength - 1)
        })
    }

    const changeToDo = (id, title, description, date) => {
        setEdit(id)
        setInputs({
            title: title,
            description: description,
            date: date,
        })
    }

    const saveToDo = (id, completed) => {
        let fileNames = []
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
            completed: completed,
            files: fileNames
        }
        addTodoDB(id, todo, {merge: true})
        getTodosDB().then(doc => {
            setToDo(doc)
        })
        setEdit('')
    }

    const closeToDo = async (id, completed) => {
        await updateTodoDB(id, {completed: !completed})
        getTodosDB().then(doc => {
            setToDo(doc)
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name == "files")
            setInputs({...inputs, [e.target.name]: e.target.files})
        else setInputs({...inputs, [e.target.name]: e.target.value})
    }

    return (
        <div>
            {
                toDo.map(item => (
                    <div className="accordion" key={item.id}>
                        <div className="accordion-item" >
                            <div className={item.completed ? "accordion-title-true" : "accordion-title-false"} 
                            onClick={() => handleDivClick(item.id)}>
                                <div>{item.title}</div>
                                <div>{isActive == item.id || edit == item.id ? '-' : '+'}</div>
                            </div>
                            {edit == item.id ?
                                <button onClick={() => saveToDo(item.id, item.completed)}>
                                    Сохранить
                                </button> :
                                <div className="accordion-buttons">
                                    <button onClick={() => changeToDo(item.id, item.title, item.description, item.date)}>
                                        Редактировать
                                    </button>
                                    <button onClick={() => closeToDo(item.id, item.completed)}>Закрыть</button>
                                    <button onClick={() => deleteToDo(item.id)}>Удалить</button>
                                </div>
                            }
                            {edit == item.id ?
                                <form className={item.completed ? "accordion-content-true" : "accordion-content-false"}>
                                    <input placeholder="Заголовок" type="text" name="title" 
                                    onChange={(e) => handleInputChange(e)} value={inputs.title} required/>
                                    <textarea placeholder="Описание" type="text" name="description" 
                                    onChange={(e) => handleInputChange(e)} value={inputs.description} required/>
                                    <input type="datetime-local" name="date" 
                                    onChange={(e) => handleInputChange(e)} value={inputs.date} required/>
                                    <input type="file" name="files" multiple
                                    onChange={(e) => handleInputChange(e)} files={inputs.files || ''}/>
                                </form> : isActive == item.id &&
                                <div className={item.completed ? "accordion-content-true" : "accordion-content-false"}>
                                    <div className="description">{item.description}</div>
                                    <div className="date">
                                        Завершить до: {dayjs(item.date).format('YYYY-MM-DD HH:mm')}
                                    </div>
                                    {item.files.length != 0 &&
                                        <div className="files">
                                            Прикрепленные файлы: {item.files.map(file => (
                                                <p key={item.id}>
                                                    <a id="fileURL" download target="_blank">
                                                        {getTodoFilesDB(item.id, file, "fileURL")}</a>
                                                </p>
                                            ))}
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ToDos