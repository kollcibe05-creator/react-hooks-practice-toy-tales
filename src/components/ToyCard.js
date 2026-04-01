import React, { useState } from "react";

function ToyCard({toy, onDelete, onLike}) {
  const {id, name, image, likes} = toy
  const [hasLiked, setHasLiked] = useState(false)

  function handleLike() {
    const nextLike = !hasLiked
    setHasLiked(!hasLiked)
    onLike(toy, nextLike)
  }
  function handleClick() {
    onDelete(id)
  }
  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>{hasLiked? "Unlike </3" : "Like <3" }</button>
      <button className="del-btn" onClick={handleClick}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
