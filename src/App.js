// import { Route, Routes } from 'react-router';
// import { Link } from 'react-router-dom';
import './App.css';
import Todolist from './components/TodoList';


function App() {
  return (
    <div className="App">
      {/* <div>This is Home Page</div>
      <Link to= "todoList">Todolist</Link>
      <Link to= "home">Home</Link>
      <Routes>
        <Route path="/todoList" element={<Todolist/>}/>
        <Route path="/home" element={<Home/>}/>
    </Routes> */}
    <Todolist/>
    </div>
  );
}

export default App;
