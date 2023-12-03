import {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const initialData = {
    users: [],
  };

  const [usersState, dispatch] = useReducer(reducerFunc, initialData);
  const [selectedUsers, setSelectedUsers] = useState([]);

  function reducerFunc(state, action) {
    const { type, payload } = action;
    switch (type) {
      case "ADD":
        return { ...state, users: payload };
      case "EDIT":
        return {
          users: state.users.map((item) =>
            item.id === payload.id ? payload : item
          ),
        };
      case "DELETE":
        return { users: state.users.filter((item) => item.id !== payload) };

      default:
        break;
    }
  }
console.log(usersState.users);
  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const users = await response.json();
      dispatch({ type: "ADD", payload: users });
    } catch (error) {
      console.error(error);
    }
  };

  function deleteMultipleAtOnce() {
    selectedUsers.forEach((element) => {
      dispatch({ type: "DELETE", payload: element });
    });
  }
  function selectAllAtOnce(e) {
    if (e.target.checked)
      setSelectedUsers(usersState?.users?.map((item) => item.id));
    else setSelectedUsers([]);
  }
  console.log(selectedUsers);
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        usersState,
        selectedUsers,
        dispatch,
        setSelectedUsers,
        selectAllAtOnce,
        deleteMultipleAtOnce,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
