
import { useState } from "react";

function DeleteVersion({
  companiesData,
  setCompaniesData,
  setOpenDeleteVersion,
}) {
  const [information, setInformation] = useState(false);
  const [modalInformation, setModalInformation] = useState(false);

  // Obtener las versiones disponibles
  const version = companiesData.map((company) => company.version);
  const onlyVersion = [...new Set(version)];

  const [selectVersion, setSelectVersion] = useState(onlyVersion[0] ?? "");

  // Registros de la versión seleccionada
  const getCompany = companiesData.filter(
    (company) => company.version === Number(selectVersion),
  );


  const totalServices = getCompany.length;

  // Registros que quedarán después de eliminar
  const remainingCompanies = companiesData.filter(
    (company) => company.version !== Number(selectVersion),
  );

  // Empresas y servicios que se quedarían sin versión
  const withoutVersion = getCompany.filter((company) => {
    return !remainingCompanies.some(
      (remaining) =>
        remaining.company === company.company &&
        remaining.service === company.service,
    );
  });

  // Función para sacar la información del banner
  const banner = [
    ...new Set(
      withoutVersion.map(
        (company) => `${company.company} (${company.service})`,
      ),
    ),
  ].join(", ");

  // Registros que se conservarán al eliminar la versión
  const deleteVersion = companiesData.filter((version) => {
    return version.version !== Number(selectVersion);
  });

  const blue = "#5794c2";
  const lightBlue = "#D9EAF7";
  const borderBlue = "#7FA6C9";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "12px",
      }}
    >
      {/* VENTANA PRINCIPAL */}
      <div
        className="bg-white rounded-2 overflow-hidden"
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${borderBlue}`,
          boxShadow: "0 5px 18px rgba(0,0,0,0.12)",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
        }}
      >
        {/* CABECERA PRINCIPAL */}
        <div
          className="d-flex align-items-center justify-content-between px-3 text-white"
          style={{
            backgroundColor: blue,
            backgroundImage:
              "linear-gradient(to bottom, #5CA4D2, #4186B9)",
            position: "relative",
            flexShrink: 0,
            height: "38px",
            fontSize: "13px",
          }}
        >
          <strong>BORRAR VERSIÓN COMPLETA DE %OM</strong>

          <div className="d-flex align-items-center justify-content-center gap-2">
            <button
              type="button"
              className="border-0 text-white fw-bold"
              style={{
                backgroundColor: "transparent",
                fontSize: "14px",
                padding: "2px 5px",
              }}
              onClick={() => setInformation(!information)}
            >
              ?
            </button>

            <button
              type="button"
              className="border-0 text-white fw-bold"
              style={{
                backgroundColor: "transparent",
                fontSize: "17px",
                padding: "2px 5px",
              }}
              onClick={() => setOpenDeleteVersion(false)}
            >
              ✕
            </button>
          </div>

          {information && (
            <div
              style={{
                position: "absolute",
                top: "38px",
                right: "30px",
                width: "min(360px, 90vw)",
                padding: "10px",
                backgroundColor: "#f0f4ff",
                color: "#35466f",
                border: "1px solid #c5d5ee",
                borderRadius: "5px",
                zIndex: 1100,
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                fontSize: "12px",
                fontWeight: "normal",
                lineHeight: "1.5",
              }}
            >
              Se eliminan de una sola vez <strong>todos los registros</strong> que
              comparten ese N° de versión, en todas las empresas donde se haya
              cargado. Si alguna empresa se queda sin ninguna versión de %OM
              cargada, se avisa antes de confirmar. Podés darle de alta una
              versión nueva desde "Nueva Versión".
            </div>
          )}
        </div>

        {/* CONTENIDO */}
        <div
          className="p-2 d-flex flex-column"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          {/* SELECCIÓN DE VERSIÓN */}
          <div
            className="row g-0 align-items-stretch mb-2"
            style={{
              border: `1px solid ${borderBlue}`,
              flexShrink: 0,
            }}
          >
            <div
              className="col-md-4 p-2 fw-semibold"
              style={{
                backgroundColor: lightBlue,
                borderRight: `1px solid ${borderBlue}`,
                fontSize: "12px",
              }}
            >
              Versión a eliminar:
            </div>

            <div className="col-md-8 px-2 py-1">
              <select
                className="form-select form-select-sm"
                style={{
                  fontSize: "12px",
                  height: "28px",
                  padding: "3px 8px",
                  borderColor: "#B7CDDE",
                }}
                value={selectVersion}
                onChange={(e) => setSelectVersion(e.target.value)}
                disabled={onlyVersion.length === 0}
              >
                {onlyVersion.map((versionNumber) => {
                  const records = companiesData.filter(
                    (company) => company.version === versionNumber,
                  );

                  const services = [
                    ...new Set(records.map((company) => company.service)),
                  ];

                  return (
                    <option key={versionNumber} value={versionNumber}>
                      Nº {versionNumber} - {services.join(" y ")} (
                      {records.length} registros)
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* TABLA */}
          <div
            className="rounded-1 overflow-hidden mb-2"
            style={{
              border: `1px solid ${borderBlue}`,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              flex: "0 1 auto",
            }}
          >
            {/* CABECERA FIJA DE LA TABLA */}
            <div
              className="row g-0 fw-semibold"
              style={{
                backgroundColor: "#E7F1F9",
                borderBottom: `1px solid ${borderBlue}`,
                flexShrink: 0,
                fontSize: "12px",
                color: "#253D56",
              }}
            >
              <div className="col-4 px-2 py-2">EMPRESA / SERVICIO</div>
              <div className="col-4 px-2 py-2 text-center">%OM ACTUAL</div>
              <div className="col-4 px-2 py-2 text-center">VIGENTE DESDE</div>
            </div>

            {/* SOLO LAS EMPRESAS TIENEN SCROLL */}
            <div
              style={{
                height: "190px",
                maxHeight: "190px",
                minHeight: 0,
                overflowY: "auto",
                overflowX: "hidden",
                scrollbarWidth: "thin",
                scrollbarColor: `${blue} #eaf2f8`,
              }}
            >
              {getCompany.map((company, index) => (
                <div
                  className="row g-0 align-items-center"
                  key={`${company.company}-${company.service}-${company.version}-${index}`}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "#ffffff" : "#EFF6FB",
                    borderBottom: "1px solid #dce8f1",
                    fontSize: "12px",
                    minHeight: "34px",
                  }}
                >
                  <div className="col-4 px-2 py-1">
                    <strong>{company.company}</strong>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                      }}
                    >
                      {company.service}
                    </div>
                  </div>

                  <div className="col-4 px-2 py-1 text-center">
                    {company.om}%
                  </div>

                  <div className="col-4 px-2 py-1 text-center">
                    {company.from}
                  </div>
                </div>
              ))}

              {getCompany.length === 0 && (
                <div className="p-2 text-center text-secondary">
                  No hay registros para esta versión.
                </div>
              )}
            </div>
          </div>

          {/* ADVERTENCIA */}
          {getCompany.length > 0 && (
            <div
              className="rounded-1 p-2 mb-2"
              style={{
                backgroundColor: "#fff8e8",
                border: "1px solid #e7c982",
                color: "#73551d",
                fontSize: "12px",
                lineHeight: "1.45",
                flexShrink: 0,
              }}
            >
              <p className="mb-1">
                <strong>
                  Se eliminarán {totalServices} registros de la versión Nº{" "}
                  {selectVersion}.
                </strong>
              </p>

              {withoutVersion.length > 0 ? (
                <p className="mb-0">
                  Esta acción va a dejar a <strong>{banner}</strong> sin ningún
                  %OM cargado (igual que una empresa que todavía no tuvo su
                  primera carga). Podés darle de alta una versión nueva cuando
                  quieras desde "Nueva Versión".
                </p>
              ) : (
                <p className="mb-0">
                  Ninguna de las empresas y servicios afectados se quedará sin una
                  versión de %OM cargada.
                </p>
              )}
            </div>
          )}

          {/* BOTONES */}
          <div
            className="d-flex justify-content-end gap-2 pt-1"
            style={{ flexShrink: 0 }}
          >
            <button
              type="button"
              className="rounded-1 text-white border-0"
              style={{
                backgroundColor: "#dc3545",
                opacity: getCompany.length === 0 ? 0.5 : 1,
                fontSize: "12px",
                fontWeight: "600",
                padding: "5px 12px",
                minHeight: "29px",
              }}
              disabled={getCompany.length === 0}
              onClick={() => setModalInformation(true)}
            >
              Eliminar versión completa
            </button>

            <button
              type="button"
              className="rounded-1"
              style={{
                backgroundColor: "#f0f6fb",
                color: blue,
                border: `1px solid ${borderBlue}`,
                fontSize: "12px",
                fontWeight: "600",
                padding: "5px 12px",
                minHeight: "29px",
              }}
              onClick={() => setOpenDeleteVersion(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {modalInformation && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            padding: "20px",
          }}
        >
          <div
            className="bg-white rounded-2 overflow-hidden"
            style={{
              width: "420px",
              maxWidth: "95%",
              boxShadow: "0 8px 25px rgba(0,0,0,0.20)",
            }}
          >
            {/* CABECERA */}
            <div
              className="d-flex justify-content-between align-items-center px-3 text-white"
              style={{
                background:
                  "linear-gradient(to bottom, #5CA4D2, #4186B9)",
                height: "36px",
                fontSize: "12px",
              }}
            >
              <strong>CONFIRMAR ELIMINACIÓN</strong>

              <button
                type="button"
                className="border-0 text-white"
                style={{
                  backgroundColor: "transparent",
                  fontSize: "20px",
                  lineHeight: "1",
                  padding: "0 3px",
                }}
                onClick={() => setModalInformation(false)}
              >
                ×
              </button>
            </div>

            {/* MENSAJE */}
            <div
              className="px-3 pt-2 pb-2"
              style={{
                color: "#354052",
                fontSize: "12px",
                lineHeight: "1.5",
              }}
            >
              <p className="mb-0">
                ¿Eliminar la versión Nº {selectVersion} completa? Se van a
                borrar {totalServices} registros.
                {withoutVersion.length > 0 && (
                  <>
                    {" "}
                    Esto va a dejar sin ningún %OM cargado a: {banner}.
                  </>
                )}
              </p>
            </div>

            {/* BOTONES DE CONFIRMACIÓN */}
            <div className="d-flex gap-2 px-3 pb-3 pt-1">
              <button
                type="button"
                className="rounded-1 text-white border-0 fw-semibold"
                style={{
                  backgroundColor: "#dc3545",
                  fontSize: "12px",
                  padding: "5px 12px",
                  minHeight: "29px",
                }}
                onClick={() => {
                  setCompaniesData(deleteVersion);
                  setModalInformation(false);
                  setOpenDeleteVersion(false);
                }}
              >
                Sí, eliminar
              </button>

              <button
                type="button"
                className="rounded-1 fw-semibold"
                style={{
                  backgroundColor: "#ffffff",
                  color: blue,
                  border: `1px solid ${blue}`,
                  fontSize: "12px",
                  padding: "5px 12px",
                  minHeight: "29px",
                }}
                onClick={() => setModalInformation(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteVersion;
