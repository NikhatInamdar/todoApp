import { useState } from "react";
const Todo = () =>{

    const [todos ,settodos] = useState([])  /* state to get data */
    const [item, setitem] = useState('')
    const [description ,setdescription] =useState('')
    const [date,setdate] =useState('')
    const [edititem , setEdititem] = useState(null)

   

    const dataHandler = () =>{
        if(item.trim() && description.trim() && date.trim()){
             

             if(edititem !== null){
                const updatetodo = [...todos]
                updatetodo[edititem] = {item,description,date}
                settodos(updatetodo)
                setEdititem(null)
             }else{
                settodos([...todos, {id : Date.now(), item,description,date}])
             }
              setitem('')
              setdescription('')
              setdate('')
        }
        else{
            alert('All fiels are important')
        }
    }

    const edititems = (index)=>{
        const todo = todos[index]
        setitem(todo.item)
        setdescription(todo.description)
        setdate(todo.date)
        setEdititem(index)

    }
           //Delete
           const deleteItems =(index)=>{
            const updatedTodo = [...todos]
            updatedTodo.splice(index,1)
            settodos(updatedTodo)

           }
           //completed
           const toggleCompleted = (index) => {
            const updated = [...todos];
            updated[index].completed = !updated[index].completed;
            settodos(updated)
        } 

                                                      
    return(
        <div>
        <h1>To-Do App</h1>

        <div className="w-50 bg-dark p-4 mx-auto rounded-3">
            <div className="mb-3">
                <input type="text" placeholder="Enter List"
                className="form-control"
                value={item}
                onChange={(e)=>setitem(e.target.value)}
                 />
            </div>

            <div  className="mb-3">
                <input type="text" 
                placeholder="Enter List Description"
                className="form-control"
                value={description}
                onChange={(e)=>setdescription(e.target.value)}/>
            </div>

            <div  className="mb-3">
                <input type="date" 
                className="form-control"
                value={date}
                onChange={(e)=>setdate(e.target.value)}
                />
            </div>
            <button className="btn btn-success" onClick={dataHandler}>
                {
                    edititem !== null ? 'Update Data' : 'Add List'
                }
            </button>
        </div>

          <div className="w-50 mx-auto mt-4">
            <table className="table">
                <thead> 
                     <tr>
                        <th>Sr.no</th>
                        <th>List Name</th>
                        <th>List Description</th>
                        <th>Date</th>
                        <th>Action</th>
                     </tr>
                </thead>
                <tbody>
                       {
                        todos.map((todo ,index)=>{
                            return(
                             <tr key={index}>
                                   <td>{index + 1}</td>

                                    
                                    <td style={{
                                        textDecoration: todo.completed
                                            ? "line-through"
                                            : "none", }}>
                                        {todo.item}</td>
                                    <td style={{
                                        textDecoration: todo.completed
                                            ? "line-through"
                                            : "none", }}>{todo.description}</td>
                                    <td style={{
                                        textDecoration: todo.completed
                                            ? "line-through"
                                            : "none", }}>{todo.date}</td>
                                    <td>
                                        <button onClick={()=>edititems(index)}
                                        className="btn btn-warning">Edit</button>

                                        <button className="btn btn-danger ms-2"
                                        onClick={()=>deleteItems(index)}>Delete</button>

                                       {/*  <button className="btn btn-primary ms-2">Completed</button> */}

                                       <button
                                        className="btn btn-primary ms-2"
                                        onClick={() =>toggleCompleted(index)} 
                                    >

                                    {todo.completed ? "Undo" : "Complete"}
                                    </button>
                                
                                    </td>
                                </tr>
                            )
                        })
                       }
                </tbody>
            </table>
          </div>
        </div>
    )
}
export default Todo;


