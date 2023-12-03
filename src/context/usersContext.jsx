import {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from 'react-hot-toast'
const UsersContext = createContext();

export function UsersProvider({ children }) {
  const initialData = {
    //initial state of users data
    users: [],
    loading:false,
    error:false
  };

  const [usersState, dispatch] = useReducer(reducerFunc, initialData);
  const [selectedUsers, setSelectedUsers] = useState([]);

  function reducerFunc(state, action) {
    const { type, payload } = action;
    switch (type) {
      case "LOADING":
        return { ...state, loading:true };
      case "ADD":
        return { ...state, users: payload, loading:false };
      case "EDIT":
        return {...state,
          users: state.users.map((item) =>
            item.id === payload.id ? payload : item
          ),
          loading:false
        };

      case "DELETE":
        return { ...state,users: state.users.filter((item) => item.id !== payload) ,loading:false};

      default:
        break;
    }
  }
  const getUsers = async () => {
    //fetches the Users Data from Api
    try {
      dispatch({type:'LOADING'})
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
    dispatch({type:'LOADING'})
    // Deletes All the selected Users Data one by one
    selectedUsers.forEach((element) => {
      dispatch({ type: "DELETE", payload: element });
    });
    toast.success(`Deleted one or more users`)
  }

  useEffect(() => {
    //Fetches the Data each time the page renders.
    getUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        usersState,
        selectedUsers,
        dispatch,
        setSelectedUsers,
        deleteMultipleAtOnce,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext); //custom hook to for useContext which will provide the context to whole app.
