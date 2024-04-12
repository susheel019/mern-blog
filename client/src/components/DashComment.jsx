import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck , FaTimes } from "react-icons/fa";

function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    async function fetchComment() {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false); 
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if (currentUser && currentUser.isAdmin) {
      fetchComment();
    }
  }, [currentUser._id]);
  async function handleShowMore() {
    const startIndex = comments.length;
    
    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 19) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async function handleDeleteComment() {
    try{
    const res = await fetch(`/api/comment/deletecomment/${commentIdToDelete}` , {
      method:'DELETE',
    });
    const data = await res.json();
    if(res.ok){
      setComments((prev)=> prev.filter((comment)=>comment._id !== commentIdToDelete))
      setShowModal(false);

    }else{
      console.log(data.message);
    }

    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
        {currentUser.isAdmin && comments.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Comment content</Table.HeadCell>
                <Table.HeadCell>Post id</Table.HeadCell>
                <Table.HeadCell>User id</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {comments.map((comment, index) => (
                <Table.Body key={index} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {comment.content}
                    </Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>
                    <Table.Cell>
                   {comment.numberOfLikes}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setCommentIdToDelete(comment._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <Button
                onClick={handleShowMore}
                className="w-full text-white self-center text-sm py-2 "
              >
                Show More
              </Button>
            )}
          </>
        ) : (
          <p>You have no comment yet</p>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this comment?
              </h3>
              <div className="flex justify-center gap-12">
                <Button color="failure" onClick={ handleDeleteComment}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No,cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default DashComments;
