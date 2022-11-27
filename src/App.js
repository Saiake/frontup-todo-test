import {useState, useEffect} from "react"
import ToDoForm from "./components/ToDoForm/ToDoForm"
import ToDos from "./components/ToDos/ToDos"
import {getTodosDB} from "./Firebase"

function App() {

    const [toDo, setToDo] = useState([])

    const [addOrEdit, setAddOEdit] = useState(true)
    
    const [TLength, setTLength] = useState(0)

    useEffect(()=> {
        getTodosDB().then(doc => {
            setToDo(doc)
            if (TLength == 0)
                setTLength(doc.length)
        })
    }, [TLength])

    return (
        <div className="App">
            <ToDoForm addOrEdit={addOrEdit}
                        TLength={TLength}
                        setTLength={setTLength}/>
            <ToDos toDo={toDo}
                    setToDo={setToDo}/>
        </div>
    );
}
  
  export default App;
  