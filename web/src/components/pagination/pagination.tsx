interface PaginationProps {
  page: number;
  perPage: number;
  totalPages: number;
}

export default function Pagination({
  page,
  perPage,
  totalPages,
}: PaginationProps) {

  const pageItems = Array(11).fill(null).map((item, index) => {
    const pageNumber = page + index - 1;

    if (pageNumber === 0 || pageNumber >= totalPages + 1 || index === 11) {
      return
    }

    return (
      <li key={pageNumber} className="page-item">
        <a className={`page-link ${pageNumber === page ? "active": ""}`} href={`?page=${pageNumber}&perPage=${perPage}`}>
          {pageNumber}
        </a>
      </li>
    );
  })

  const prevLink = page > 1 ? `?page=${page - 1}&perPage=${perPage}` : ""
  const nextLink = page < totalPages ? `?page=${page + 1}&perPage=${perPage}` : "";

  const toFirstLink = page > 1 ? `?page=1&perPage=${perPage}` : ""
  const toLastLink = page < totalPages ? `?page=${totalPages}&perPage=${perPage}` : "";


  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
      <li className="page-item">
          <a className={`page-link ${!toFirstLink && "disabled" }`} href={toFirstLink}>
            {"<<"}
          </a>
        </li>
        <li className="page-item">
          <a className={`page-link ${!prevLink && "disabled" }`} href={prevLink}>
            {"<"}
          </a>
        </li>
        {pageItems}
        <li className="page-item">
          <a className={`page-link ${!nextLink && "disabled" }`} href={nextLink}>
            {">"}
          </a>
        </li>
        <li className="page-item">
          <a className={`page-link ${!toLastLink && "disabled" }`} href={toLastLink}>
            {">>"}
          </a>
        </li>
      </ul>
    </nav>
  );
}
