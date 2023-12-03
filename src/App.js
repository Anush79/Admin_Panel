import { DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import { Row } from "./components/UserListRow";
import { useUsers } from "./context/usersContext";
import ToastContainer from "./components/ToastContainer";
import { Loader } from "./components/Loader";


function App() {
  const [searchInput, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { usersState, deleteMultipleAtOnce, setSelectedUsers } = useUsers();

  const searchHandler = (e) => {
    const { value } = e.target;
    setSearch(() => value.toLowerCase());
    setPage(1);
  };

  const filteredData = searchInput
    ? usersState?.users?.filter(
        (item) =>
          item.id === searchInput ||
          item.name.toLowerCase().includes(searchInput) ||
          item.email.toLowerCase().includes(searchInput) ||
          item.role.toLowerCase().includes(searchInput)
      )
    : usersState.users;

  const usersToDisplay = filteredData?.slice(page * 10 - 10, page * 10);
  // Selects Users using checkboxes and add them to the selected users array.
  function selectAllAtOnce(e) {
    if (e.target.checked)
      setSelectedUsers(usersToDisplay.map((item) => item.id));
    else setSelectedUsers([]);
  }

  return (
    <div className="App">
      <main>
        <div className="heading">Admin Dashboard</div>

        <header className="flex flex-row">
          <input
            className="search-icon"
            type="text"
            placeholder="Search for id, name, email, role"
            onChange={searchHandler}
          />
         {usersState?.loading && <Loader />}
          <button
            onClick={deleteMultipleAtOnce}
            title="Delete Selected"
            className="delete"
          >
            <DeleteForever />
          </button>
        </header>
        <li className={`heading grid grid-row `}>
          <span>
            {" "}
            <input
              className=""
              type="checkbox"
              name="all_user"
              id="all_users"
              aria-label="select all user"
              onChange={selectAllAtOnce}
            />
          </span>

          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span></span>
        </li>

        {usersToDisplay.length > 0 ? (
          usersToDisplay.map((item) => <Row key={item.id} item={item} />)
        ) : (
          <h5>No Data Found</h5>
        )}
      </main>
      <Pagination data={filteredData} page={page} setPage={setPage} />
      <ToastContainer />
    </div>
  );
}

export default App;
