import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([])
  const [showForm, setShowForm] = useState(false);
  

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() => {
    fetch(" http://localhost:3001/toys")
    .then(r => r.json())
    .then(data => setToys(data))
  }, [])
  function handleSubmission(formData) {
      fetch("http://localhost:3001/toys", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
          "Accept": "application/json", 
        }, 
        body: JSON.stringify(formData)
      })
      .then(r => r.json())
      .then(data => setToys([...toys, data]))
  }
  function handleDeletion(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then( () => {
      const updatedToys = toys.filter(toy => toy.id !== id)
      setToys(updatedToys)
    })
  }
  function patchLike(item, hasLiked) {
      const newLikes = hasLiked? Number(item.likes) + 1 : Number(item.likes) - 1 
      fetch(`http://localhost:3001/toys/${item.id}`, {
          method:"PATCH", 
          headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
          }, 
          body: JSON.stringify({likes: newLikes})
      })
      .then(r => r.json())
      .then(data => { 
      const updatedToys = toys.map (toy => {
        if (toy.id === data.id) {
          return data
        }else{
          return toy
        }
      }) 
      setToys(updatedToys)
  })
  }   
  return (
    <>
      <Header />
      {showForm ? <ToyForm onSubmission={handleSubmission}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDelete={handleDeletion} onLike={patchLike}/>
    </>
  );
}

export default App;
