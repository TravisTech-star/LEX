import React from 'react';
import axios from 'axios';

function PostCard({post}){
  const handleLike=async()=>{
    await axios.put(`http://localhost:5000/api/posts/${post._id}/like`,{userId:'123'});
  }
  return(
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <p>{post.content}</p>
      {post.media && <img src={post.media} alt="media" className="rounded mt-2 w-full"/>}
      <button onClick={handleLike} className="mt-2 bg-blue-600 px-3 py-1 rounded">
        Like ({post.likes.length})
      </button>
    </div>
  )
}
export default PostCard;
