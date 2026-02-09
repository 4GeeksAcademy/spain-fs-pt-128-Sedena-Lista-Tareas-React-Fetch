import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";


const Home = () => {


  const API_URL = "https://playground.4geeks.com/todo"
  const USER = "Troglodita"
 
  const [tarea, setTarea] = useState ("")
  const [lista, setLista] = useState ([])


  console.log(lista);


  const handleInputChange = (e) => {


    console.log(e);
   


    setLista({
      ...lista,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = (e) => {
  e.preventDefault();


  if (!lista) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No tienes nada en la lista",
    });
    return;
  }


  createTarea();
};
 


  const getCharacter = async () => {


    const response = await fetch(`${API_URL}/users/${USER}`)
    console.log(response);


    if (!response.ok) {
      console.log("Debes crear un Usuario");
      createUser ()
      return
     
    }
   
    const data = await response.json()
    console.log(data);
    setTarea(data)
   
  }


    const createUser = async () => {


    const response = await fetch(`${API_URL}/users/${USER}`,{
      method: "POST"
    })
    console.log(response);


    if (!response.ok) {
      console.log("Debes crear un Usuario");
      return
    }
    const data = await response.json()
    console.log(data);
  }


const createTarea = async () => {
  const nuevaTarea = {
    label: lista,
    is_done: false
  };


  const response = await fetch(`${API_URL}/todos/${USER}`, {
    method: "POST",
    body: JSON.stringify(nuevaTarea),
    headers: {
      "Content-Type": "application/json"
    }
  });


  const data = await response.json();
  console.log(data);
};
 




  useEffect (() => {


    getCharacter();


  },[])


  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1 className="display-3">Lista de Tareas</h1>


      <form  onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu tarea"
          value={lista}
          onChange={handleInputChange}
         
        />


        <ul>
          {lista.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
   
      </form>


 
    </div>
  );
};


export default Home;
