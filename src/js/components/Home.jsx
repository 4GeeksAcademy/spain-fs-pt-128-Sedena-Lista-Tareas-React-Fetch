import React, { useEffect, useState } from "react";
import { renderToNodeStream } from "react-dom/server";
import Swal from "sweetalert2";


const Home = () => {


  const API_URL = "https://playground.4geeks.com/todo"
  const USER = "Cabra"
 
  const [tarea, setTarea] = useState ("")
  const [lista, setLista] = useState ([])


  const handleInputChange = (e) => {

    console.log(e);
  
    setTarea(e.target.value)
  }


const handleSubmit = async (e) => {
  e.preventDefault();

  if (tarea.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No puedes crear una tarea vacía"
    });
    return;
  }

  await createTarea();
  setTarea("");
};

  const getTareas = async () => {

    const response = await fetch(`${API_URL}/users/${USER}`)

    if (!response.ok) {
     
      await createUser ()
      getTareas()
      return
     
    }
   
    const data = await response.json()
    setLista(data.todos)
   
  }


    const createUser = async () => {

    const response = await fetch(`${API_URL}/users/${USER}`,{
      method: "POST"
    })
  }


const createTarea = async () => {

  const nuevaTarea = {
    label: tarea, 
    is_done: false
  };

  const response = await fetch(`${API_URL}/todos/${USER}`, {
    method: "POST",
    body: JSON.stringify(nuevaTarea),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok) {

    getTareas()
    
  }

};

const deleteTarea = async (id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    getTareas(); 
  } else {
    console.log("Error al borrar la tarea");
  }
};
 




  useEffect (() => {


    getTareas();


  },[])


  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1 className="display-3">Lista de Tareas</h1>


      <form  onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu tarea"
          value={tarea}
          onChange={handleInputChange}
         
        />


        <ul>
          {lista.map((item, index) => {
          return <li key={index}>{item.label}<button type="button" onClick={() => deleteTarea(item.id)}>X</button></li>
          }
          )}
        </ul>
   
      </form>


 
    </div>
  );
};


export default Home;
