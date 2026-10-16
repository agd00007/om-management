
import { blue, borderBlue } from "../styles/colors";

function ViewVersion({ selectService, setButtonView }) {
  const getInformationCompanies = selectService
    ? {
        "Prestador / Empresa": selectService.company,
        "Mesa operativa": selectService.table,
        Filial: selectService.branch,
        "Tipo de servicio": selectService.service,
        "%OM": `${selectService.om}%`,
        Desde: selectService.from,
        Hasta: selectService.to || "—",
        Estado: selectService.status,
        "N.º de versión": selectService.version,
      }
    : {};

  const newArrayInformationCompanies = Object.entries(
    getInformationCompanies
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 25, 55, 0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          width: "800px",
          maxWidth: "95vw",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* Cabecera */}
        <div
          className="d-flex justify-content-between align-items-center px-3"
          style={{
            backgroundColor: blue,
            backgroundImage:
              "linear-gradient(to bottom, #5DA5D3, #4389BC)",
            color: "white",
            borderRadius: "10px 10px 0 0",
            fontWeight: "700",
            fontSize: "15px",
            height: "45px",
          }}
        >
          <span>Ver registro de %OM</span>

          <button
            onClick={() => setButtonView(false)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "25px",
              fontWeight: "300",
              cursor: "pointer",
              padding: "0 4px",
              lineHeight: "1",
            }}
          >
            ×
          </button>
        </div>

        {/* Tabla */}
        <div
          className="px-3 pt-3 pb-3"
          style={{
            backgroundColor: "#FFFFFF",
          }}
        >
          <div
            style={{
              border: "1px solid #C8DDF0",
              borderRadius: "0px",
              overflow: "hidden",
            }}
          >
            {newArrayInformationCompanies.map((company, index) => {
              return (
                <div
                  className="row mx-0"
                  key={company[0]}
                  style={{
                    borderBottom:
                      index === newArrayInformationCompanies.length - 1
                        ? "none"
                        : "1px solid #C8DDF0",
                    fontSize: "13px",
                    color: "#30384B",
                    minHeight: "33px",
                    alignItems: "stretch",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  <div
                    className="col-3 px-3 d-flex align-items-center"
                    style={{
                      backgroundColor: "#EFF6FB",
                      fontWeight: "700",
                      borderRight: "1px solid #C8DDF0",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    }}
                  >
                    {company[0]}
                  </div>

                  <div
                    className="col-9 px-3 d-flex align-items-center"
                    style={{
                      backgroundColor: "#FFFFFF",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    }}
                  >
                    {company[1]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botón cerrar */}
          <div className="d-flex justify-content-start mt-3">
            <button
              className="rounded-1"
              onClick={() => setButtonView(false)}
              style={{
                backgroundColor: blue,
                backgroundImage:
                  "linear-gradient(to bottom, #5DA5D3, #4389BC)",
                color: "white",
                border: `1px solid ${borderBlue}`,
                fontWeight: "600",
                fontSize: "13px",
                padding: "8px 25px",
                minWidth: "99px",
                minHeight: "38px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewVersion;
