import { useState, useEffect } from "react"
import ToDoForm from "./components/ToDoForm/ToDoForm"
import ToDos from "./components/ToDos/ToDos"

function App() {

    const [toDo, setToDo] = useState([])
    
    

    const [addOrEdit, setAddOEdit] = useState(true)

    const takeToDo = () => {

    }

    return (
        <div className="App">
            <ToDoForm addOrEdit={addOrEdit}/>
            <ToDos toDo={toDo}
                    setToDo={setToDo}/>
        </div>
    );
}
  
  export default App;
  