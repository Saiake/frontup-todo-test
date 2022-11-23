import { useState } from "react"

function ToDoForm({addOrEdit}) {

    const [isActive, setIsActive] = useState(false)

    const saveToDo = () => {

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
                    <button onClick="">Сохранить</button>
                </form>
            }
        </div>
    )
}

export default ToDoForm