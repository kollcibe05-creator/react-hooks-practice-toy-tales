import React, { useState } from "react";

function ToyForm({onSubmission}) {
  const [formData, setForm] = useState({
    name: "", 
    image:""
  })
  function handleChange(e) {
    setForm({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit(e) {
    e.preventDefault()
    onSubmission({
      ...formData,
      likes: "0"
    })
    setForm({
      name: '',
      image:''
    })
  }
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value= {formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
