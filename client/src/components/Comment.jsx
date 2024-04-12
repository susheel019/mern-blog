import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Textarea } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";



function Comment({ comment, onLike, onEdit , onDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, seteditedContent] = useState(comment.content);
  if (!comment) {
    return null;
  }

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        }
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if (comment.userId) {
      getUser();
    }
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    seteditedContent(comment.content);
  };

  async function handleSave() {
    try {
      const res = await fetch(`/api/comment/editedcomment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className=" flex p-4 border-b dark:border-gray-500 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user ? `${user.profilePicture}` : "loading"}
          alt={user ? `${user.userName}` : "loading"}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.userName}` : "anonymous user"}{" "}
          </span>
          {comment.createdAt && (
            <span className="text-gray-500 text-xs">
              {moment(comment.createdAt).fromNow()}
            </span>
          )}
        </div>
        {isEditing ? (
          <>
            <Textarea
              value={editedContent}
              className="mb-3"
              onChange={(e) => seteditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-sm">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            {comment.content && (
              <p className="text-gray-500 pb-2">{comment.content}</p>
            )}
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500
           ${
             currentUser &&
             comment.likes.includes(currentUser._id) &&
             "!text-blue-500"
           }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-500">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      onClick={handleEdit}
                      type="button"
                      className="text-gray-500 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(comment._id)}
                      type="button"
                      className="text-gray-500 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
