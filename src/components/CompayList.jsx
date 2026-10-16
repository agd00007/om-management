
function CompanyList({ visibleCompanies, setSelectService }) {
  return (
    <div className="container-company">
      {visibleCompanies.map((company, index) => {
        return (
          <div
            className="row mx-0 py-1"
            key={`${company.company}-${company.service}`}
            onClick={() => {
              setSelectService(company);
            }}
            style={{
              backgroundColor:
                index % 2 === 0 ? "#FFFFFF" : "#EAF3FA",
              color: "#0C2340",
              borderBottom: "1px solid #D5E3EF",
              textAlign: "center",
              alignItems: "center",
              fontFamily: "Arial, sans-serif",
              fontSize: "13px",
              fontWeight: "400",
              minHeight: "40px",
              cursor: "pointer",
            }}
          >
            <div className="col">{company.table}</div>
            <div className="col">{company.branch}</div>
            <div className="col">{company.service}</div>
            <div className="col">{company.company}</div>
            <div className="col">{company.om}%</div>
            <div className="col">{company.from}</div>
            <div className="col">{company.to} - </div>
            <div className="col">{company.status}</div>
            <div className="col">{company.version}</div>
          </div>
        );
      })}
    </div>
  );
}

export default CompanyList;
