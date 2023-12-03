import { useState } from "react";
import "./App.css";
import { useUsers } from "./context/usersContext";
import { Row } from "./components/UserListRow";
import { DeleteForever } from "@mui/icons-material";
import Pagination from "./components/Pagination";

function App() {
  const [searchInput, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { usersState, deleteMultipleAtOnce, selectAllAtOnce } = useUsers();

  const searchHandler = (e) => {
    const { value } = e.target;
    setSearch(() => value.toLowerCase());
    setPage(1);
  };

  const usersToDisplay = searchInput
    ? usersState?.users.filter(
        (item) =>
          item.id === searchInput ||
          item.name.toLowerCase().includes(searchInput) ||
          item.email.toLowerCase().includes(searchInput) ||
          item.role.toLowerCase().includes(searchInput)
      )
    : usersState.users;
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
              name="user"
              id="user"
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
          usersToDisplay
            .slice(page * 10 - 10, page * 10)
            .map((item) => <Row key={item.id} item={item} />)
        ) : (
          <h5>No Data Found</h5>
        )}
      </main>
      <Pagination data={usersToDisplay} page={page} setPage={setPage} />
    </div>
  );
}

export default App;
