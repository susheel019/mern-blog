import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Textarea } from "flowbite-react";
import Comment from "./Comment";
import {HiOutlineExclamationCircle} from 'react-icons/hi'

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [showModal ,setShowModal] = useState(false)
  const [commentToDelete , setComemntToDelete] = useState(null)
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    const res = await fetch("/api/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment,
        postId,
        userId: currentUser._id,
        likes: [],
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setComment("");
      setCommentError(null);
      setComments([data, ...comments]);
    }
  }

  useEffect(() => {
    async function getComments() {
      try {
        const res = await fetch(`/api/comment/getpostcomments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        }
        if (!res.ok) {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getComments();
  }, [postId]);

  async function handleLike(commentId) {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await fetch(`/api/comment/Likecomment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) => {
            return comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment;
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleEdit(comment, editedContent) {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  } //////

  //delete comment
  async function handleDeleteComment(commentId){
      try{
           if(!currentUser){
            navigate('/signin')
            return
           }
           const res = await fetch(`/api/comment/deletecomment/${commentId}` , {
            method:"DELETE"
           })
           if(res.ok){
            const data = await res.json()
           
                setComments(comments.filter((comment)=>comment._id !== commentId))
              setShowModal(false);
           }
      }catch(error){
        console.log(error.message);
      }
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-3 ">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link to="/dashboard?tab=profile" className="text-xs text-cyan-500">
            @{currentUser.userName}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be sign in to comment.
          <Link className="text-blue-500 hover:underline" to={"/signin"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Add a comment..."
            maxLength="200"
            rows="3"
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">200 characters remain</p>
            <Button outline gradientDuoTone="purpletoBlue" type="submit">
              Submit
            </Button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p> Comments </p>
            <div className="border border-gray-40 py-1 px-2 rounded-sm">
              <p> {comments.length} </p>
            </div>
          </div>
          {comments.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={ (commentId)=>{
                setShowModal(true)
                setComemntToDelete(commentId)
              }}
            />
          ))}
        </>
      )}

<Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this comment </h3>
            <div className="flex justify-center gap-12" >
              <Button color='failure' onClick={()=> handleDeleteComment(commentToDelete)}>Yes, I'm sure</Button>
              <Button color='gray' onClick={()=>setShowModal(false)}>No,cancel</Button>
            </div>
          </div>
        </Modal.Body>
          
      </Modal>
    </div>
    
  );
}
export default CommentSection;
