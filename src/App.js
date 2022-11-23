import { useState } from "react"
import ToDoForm from "./components/ToDoForm/ToDoForm"
import firebase from "./Firebase"

function App() {

    const [toDo, setToDo] = useState([])

    const [addOrEdit, setAddOEdit] = useState(true)

    const takeToDo = () => {
        firebase
    }

    return (
        <div className="App">
            <ToDoForm addOrEdit={addOrEdit}/>
        </div>
    );
}
  
  export default App;
  