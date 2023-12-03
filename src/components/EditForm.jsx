import { useState } from "react";
import { useUsers } from "../context/usersContext";

export const EditForm = ({ data, formCloseFunction }) => {
  const { dispatch } = useUsers();
  const [formData, setFormData] = useState(data);
  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch({ type: "EDIT", payload: formData });
    formCloseFunction(false);
  }
  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder={data.name}
        onChange={onChangeHandler}
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder={data.email}
        onChange={onChangeHandler}
      />
      <select name="role" id="role" onChange={onChangeHandler}>
        <option value="">Select role</option>
        <option value="member">Member</option>
        <option value="Admin">Admin</option>
      </select>
      <button className="save">Save</button>
    </form>
  );
};
