import { useState } from "react"
import {addTodoDB} from "../../Firebase" 
function ToDoForm({addOrEdit}) {

    const [isActive, setIsActive] = useState(false)

    const handleEntailmentRequest = (e) => {
        e.preventDefault();
        const todo = {
            title:"fg",
            description: "cc",
            date: "57",
            complete: false,
        };
        addTodoDB(todo)
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
                <form>
                    <input placeholder="Заголовок" type="text"/>
                    <textarea placeholder="Описание" type="text"/>
                    <input type="date"/>
                    <button onClick={(e) => handleEntailmentRequest(e)}>Сохранить</button>
                </form>
            }
        </div>
    )
}

export default ToDoForm