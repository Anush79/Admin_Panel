import {
  DeleteOutline,
  EditOutlined
} from "@mui/icons-material";

import { useState } from "react";
import { EditForm } from "../components/EditForm";
import { useUsers } from "../context/usersContext";
export const Row = ({ item }) => {
  const { dispatch, setSelectedUsers, selectedUsers } = useUsers();

  const [openModal, setOpenModal] = useState(false);

  const onChangeHandler = (e) => {
    const { checked, value } = e.target;
    setSelectedUsers((prev) =>
      checked ? [...prev, value] : prev.filter((item) => value !== item)
    );
  };
  const isSelected =  selectedUsers?.find((elem) => elem === item.id)
  return openModal ? (
  
      <EditForm data={item} formCloseFunction={setOpenModal} />
 
  ) : (
    <li key={item.id} className={`grid grid-row ${isSelected ? "selected": ""}`}>
      <input
        type="checkbox"
        name="user"
        id="user"
        aria-label="select user"
        value={item.id}
        checked={isSelected}
        onChange={onChangeHandler}
      />
      <span>{item.name}</span>
      <span>{item.email}</span>
      <span>{item.role}</span>
      <span className="flex flex-row action-btn">
        <button
          className="edit"
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          <EditOutlined />
        </button>
        <button
          className="delete"
          onClick={() => dispatch({ type: "DELETE", payload: item.id })}
        >
          <DeleteOutline />
        </button>
      </span>
    </li>
  );
};
