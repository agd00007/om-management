function Filter({ filters, setPage }) {
  const inputStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #7FA6C9",
    borderRadius: "4px",
    color: "#0c2b6e",
    fontSize: "12px",
    height: "28px",
    padding: "3px 6px",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div
      className="container-fluid px-1 py-1"
      style={{
        backgroundColor: "#4D92C5",
        borderBottom: "1px solid #7FA6C9",
      }}
    >
      <div className="row gx-1">
        <div className="col">
          <input
            className="form-control form-control-sm"
            style={inputStyle}
            type="text"
            value={filters.table}
            onChange={(event) => {
              filters.setTable(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col">
          <input
            className="form-control form-control-sm"
            style={inputStyle}
            type="text"
            value={filters.branch}
            onChange={(event) => {
              filters.setBranch(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col">
          <input
            className="form-control form-control-sm"
            style={inputStyle}
            type="text"
            value={filters.service}
            onChange={(event) => {
              filters.setService(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col">
          <input
            className="form-control form-control-sm"
            style={inputStyle}
            type="text"
            value={filters.employ}
            onChange={(event) => {
              filters.setEmploy(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col">
          <input
            className="form-control form-control-sm"
            style={inputStyle}
            type="text"
            value={filters.om}
            onChange={(event) => {
              filters.setOm(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col">
          <input
            className="form-control form-control-sm"
            style={inputStyle}
            type="text"
            value={filters.from}
            onChange={(event) => {
              filters.setFrom(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col">
          <input
            className="form-control form-control-sm"
            style={inputStyle}
            type="text"
            value={filters.to}
            onChange={(event) => {
              filters.setTo(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col">
          <input
            className="form-control form-control-sm"
            style={inputStyle}
            type="text"
            value={filters.status}
            onChange={(event) => {
              filters.setStatus(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col">
          <input
            className="form-control form-control-sm"
            style={inputStyle}
            type="text"
            value={filters.version}
            onChange={(event) => {
              filters.setVersion(event.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
