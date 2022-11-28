import dayjs from 'dayjs'
import {useState} from 'react';
import { getTodoFilesDB } from '../../Firebase';
import './ToDos.css'

function ToDos({toDo}) {

    const [isActive, setIsActive] = useState('');
    
    const handleDivClick = (id) => {
        isActive == id ? 
            setIsActive('') :
            setIsActive(id)
    }

    return (
        <div>
            {
                toDo.map(item => (
                    <div className="accordion" key={item.id}>
                        <div className="accordion-item">
                            <div className="accordion-title" onClick={() => handleDivClick(item.id)}>
                                <div>{item.title}</div>
                                <div>{isActive == item.id ? '-' : '+'}</div>
                            </div>
                            {isActive == item.id &&
                                <div className="accordion-content">
                                    <div className="description">{item.description}</div>
                                    <div className="date">
                                        Завершить до: {dayjs(item.date).format('YYYY-MM-DD HH:mm')}
                                    </div>
                                    {item.files &&
                                        <div className="files" id='img'>
                                            Прикрепленные файлы: {getTodoFilesDB(item.id, item.files)}
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