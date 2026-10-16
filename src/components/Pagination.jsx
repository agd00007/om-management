function Pagination({ page, setPage, filteredCompanies }) {
  const numButtonsCount = filteredCompanies.length;

  const totalButtons = Math.ceil(numButtonsCount / 5);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        gap: "4px",
        padding: "2px 0",
      }}
    >
      <div>
        <button
          disabled={page === totalButtons}
          onClick={() => setPage(totalButtons)}
        >
          «
        </button>

        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ‹
        </button>
      </div>
      {Array.from({ length: totalButtons }).map((_, index) => {
        const isActive = page === index + 1;

        return (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            style={{
              backgroundColor: isActive ? "#ffffff" : "#5794c2",
              color: isActive ? "#0c2b6e" : "#ffffff",
              border: "1px solid #D2E3F0",
              borderRadius: "4px",
              minWidth: "28px",
              height: "24px",
              padding: "2px 7px",
              fontSize: "12px",
              fontFamily: "Arial, sans-serif",
              fontWeight: isActive ? "700" : "400",
              lineHeight: "1",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        );
      })}

      <button
        disabled={page === totalButtons}
        onClick={() => setPage(page + 1)}
      >
        ›
      </button>
      <button
        disabled={page === totalButtons}
        onClick={() => setPage(totalButtons)}
      >
        »
      </button>
    </div>
  );
}

export default Pagination;
