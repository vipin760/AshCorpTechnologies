import React from "react";

const ListItems = ({ list, handleDelete, handleEdit, handleLineThrough }) => {
  return (
    <div className="flex flex-col items-center">
      <ul className="flex flex-wrap max-w-sm bg-yellow-400">
        {list.map((items) => (
          <div key={items._id}>
            <li
              className={`px-3 border border-white p-2 m-1 overflow-auto flex justify-between`}
              onDoubleClick={() => handleLineThrough(items)}
            >
              <p className={`${!items.completed ? "" : "line-through"}`}>
                {items.title}
              </p>{" "}
              <i
                className="fa-solid fa-pen-to-square w-8 mx-2 text-end"
                onClick={() => handleEdit(items)}
              ></i>{" "}
              <i
                className="fa-solid fa-trash w-8 mx-2 text-end"
                onClick={() => handleDelete(items._id)}
              ></i>{" "}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
