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
  <li className="grid">
      <EditForm data={item} formCloseFunction={setOpenModal} />
 </li>
  ) : (
    <li key={item.id} className={`grid grid-row ${isSelected ? "selected": ""}`}>
     <span> <input
        type="checkbox"
        name="user"
        id="user"
        value={item.id}
        aria-label="select user"
        checked={isSelected}
        onChange={onChangeHandler}
      /></span>
      <span>{item.name}</span>
      <span>{item.email}</span>
      <span>{item.role}</span>
      <span className="flex flex-row action-btn">
        <button
          className="edit"
          title="Edit"
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          <EditOutlined />
        </button>
        <button
          className="delete"
          title="Delete this row"
          onClick={() => dispatch({ type: "DELETE", payload: item.id })}
        >
          <DeleteOutline />
        </button>
      </span>
    </li>
  );
};
