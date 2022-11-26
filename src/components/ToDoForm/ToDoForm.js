import {useState} from "react"
import {addTodoDB} from "../../Firebase" 


function ToDoForm({addOrEdit}) {

    const [isActive, setIsActive] = useState(false)
    const [inputs, setInputs] = useState({})

    const handleEntailmentRequest = (e) => {
        e.preventDefault();
        const todo = {
            title:"fg",
            description: "cc",
            date: "57",
            completed: false,
        };
        addTodoDB(todo)
        //fileL(inputs.title, inputs.files)
    }

    const handleInputChange = (e) => {
        console.log(e.target.name)
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
                    <input type="date" name="date" 
                    onChange={(e) => handleInputChange(e)} value={inputs.date || ''} required/>
                    <input type="file" name="files" 
                    onChange={(e) => handleInputChange(e)} files={inputs.files || ''}/>
                    <button type="submit">Сохранить</button>
                </form>
            }
        </div>
    )
}

export default ToDoForm