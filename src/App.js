import {useState, useEffect} from "react"
import ToDoForm from "./components/ToDoForm/ToDoForm"
import ToDos from "./components/ToDos/ToDos"
import {getTodosDB} from "./Firebase"
import './App.css'

function App() {

    const [toDo, setToDo] = useState([])
    
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
            <ToDoForm TLength={TLength}
                        setTLength={setTLength}/>
            <ToDos toDo={toDo}
                    setToDo={setToDo}
                    TLength={TLength}
                    setTLength={setTLength}/>
        </div>
    );
}
  
  export default App;
  