import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function Pagination({ data, page, setPage }) {
  const totalPage = Math.ceil(data?.length / 10); //total number of pages to represent all data

  return (
    <>
      {data.length > 0 && (
        <div className="pagination p-2">
          {page !== 1 && (
            <button
              className="previous-page "
              onClick={() => setPage(page - 1)}
            >
              <ArrowBackIos />
            </button>
          )}{" "}
          <button
            className={`nav-btn first-page ${
              page === 1 ? "page-selected" : ""
            }`}
            onClick={() => setPage(1)}
          >
            1
          </button>
          {totalPage > 1 &&
            [...Array(Math.floor(data?.length / 10 - 1))].map((_, i) => {
              //forming a new array with no content but index to dynamically show all pages according to data recieved from Api.
              return (
                <button
                  className={`nav-btn ${page === i + 2 ? "page-selected" : ""}`}
                  key={i}
                  onClick={() => setPage(i + 2)}
                >
                  {i + 2}
                </button>
              );
            })}
          {totalPage >= 2 &&
            <button
              className={`nav-btn last-page ${
                page === totalPage ? "page-selected" : ""
              }`}
              onClick={() => setPage(totalPage)}
            >
              {totalPage}
            </button>
          }
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
