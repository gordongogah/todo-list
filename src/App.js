import logo from './logo.svg';
import styled from 'styled-components';
import './App.css';
import React,{useState} from 'react';

const  Container = styled.div`
display:flex;
align-items:center;
flex-direction: column;
`;
const Button = styled.button`
display:inline-block;
flex:1;
border:none;
background-color:teal;
color:white;
height:30px;
width:50px;
border-radius:2px;
cursor:pointer;
`;
const Text = styled.input`
border:2px solid #000;
width:200px;
padding:5px;
border-radius:2px;
margin:5px;
`;
const TaskCount = styled.span`
margin:10px;
`;
const Task = styled.div`
`;
const LIST = styled.li`
listStyled:"none";
text-decoration:"line-through";
`;


function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const handleClick = ()=>{
    const id = todoList.length + 1;
    setTodoList((prev)=>[
      ...prev,
      {
        id:id,
        task:input,
        complete:false
      }
    ]);
    setInput("");
  };
const handleComplete = (id) =>{
  let list = todoList.map((task) =>{
    let item = {};
    if (task.id == id){
      if(!task.complete){
        setCompletedTaskCount(completedTaskCount + 1);
      }
      else{
        setCompletedTaskCount(completedTaskCount - 1);
      }
      item = {...task, complete:!task.complete};
    }else item = {...task};
    return item;
  });
  setTodoList(list)
}
const handleDelete = (id)=>{
  const newTask = todoList.filter((task)=> task.id !== id)
  setTodoList(newTask) 
}
  return (
    <Container>
      <div>
        <h2>Todo List</h2>
        <Text value={input} onInput={(e)=>setInput(e.target.value)}/>
        <Button onClick={()=> handleClick()}>Add</Button>
        <Task>
          <TaskCount>
            <b>Pending Task</b>
          </TaskCount>
          <TaskCount>
            <b>Completed Tasks</b>
          </TaskCount>
        </Task>
      
      <div>
        <ul>
          {todoList.map((todo)=>{
            return(
              <LIST
              complete={todo.complete}
              id={todo.id}
              onClick={()=>handleComplete(todo.id)}
              styled = {{
                listStyle:"none",
                textDecoration:todo.complete && "line-though",
              }}
              >
                {todo.task}
              </LIST>
            )
          })}
        </ul>
      </div>
      <Button onClick={(task)=> handleDelete(task.id)}>Clear</Button>
      </div>
    </Container>
  );
}

export default App;
