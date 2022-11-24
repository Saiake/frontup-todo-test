import { useState, useEffect } from "react"
import ToDoForm from "./components/ToDoForm/ToDoForm"
import ToDos from "./components/ToDos/ToDos"
import { getTodosDB } from "./Firebase"

function App() {

    const [toDo, setToDo] = useState([])
    useEffect(()=> {
        getTodosDB().then(doc => {
            setToDo(doc)
        })
    }, [])

    const [addOrEdit, setAddOEdit] = useState(true)

    const takeToDo = () => {

    }

    return (
        <div className="App">
            <ToDoForm addOrEdit={addOrEdit}/>
            <ToDos toDo={toDo}/>
        </div>
    );
}
  
  export default App;
  