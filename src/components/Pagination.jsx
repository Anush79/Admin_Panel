import {
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";

export default function Pagination({ data, page, setPage }) {
  return (
    <>
      {data.length > 0 && (
        <div className="pagination p-2">
          {page !== 1 && (
            <button className="previous-page" onClick={() => setPage(page - 1)}>
              <ArrowBackIos />
            </button>
          )}{" "}
          <button className="nav-btn first-page" onClick={() => setPage(1)}>
            1
          </button>
          {[...Array(Math.floor(data.length / 10))].map((_, i) => {
            return (
              <button className="nav-btn" key={i} onClick={() => setPage(i + 2)}>
                {i + 2}
              </button>
            );
          })}
          {page !== Math.ceil(data.length / 10) && (
            <button className="next-page" onClick={() => setPage(page + 1)}>
              <ArrowForwardIos />
            </button>
          )}
        </div>
      )}
    </>
  );
}
