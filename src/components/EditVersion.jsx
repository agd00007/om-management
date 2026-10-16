import { useState } from "react";

function EditVersion({ companiesData, setCompaniesData, setOpenEditVersion }) {
  const [newOm, setNewOm] = useState([]);

  const [date, setDate] = useState("");

  const [information, setInformation] = useState(false);

  // funcion para seleccionar las versiones

  const version = companiesData.map((company) => {
    return company.version;
  });

  // eliminar duplicados

  const onlyVersion = [...new Set(version)];

  const [edit, setEdit] = useState(onlyVersion[0]);

  // obtener las empresas de cada version

  const getCompany = companiesData.filter((company) => {
    return company.version === Number(edit);
  });

  const services = getCompany.map((company) => {
    return company.service;
  });

  const onlyService = [...new Set(services)];

  // sacar el tipo de servicio (emergencia/traslado) junto con sus empresas

  const companieService = onlyService.map((service) => {
    const companies = getCompany.filter((company) => {
      return company.service === service;
    });

    return companies;
  });

  // calcular los totales por servicio

  const totalNewOm = companieService.map((companies) => {
    const total = companies.reduce((acc, company) => {
      const globalIndex = getCompany.indexOf(company);

      return (
        acc +
        Number(
          newOm[globalIndex] === undefined || newOm[globalIndex] === ""
            ? company.om
            : Number(newOm[globalIndex]),
        )
      );
    }, 0);

    return total;
  });

  const totalOld = companieService.map((companie) => {
    const total = companie.reduce((acc, company) => {
      return acc + company.om;
    }, 0);

    return total;
  });

  // funcion para aplicar la condicion

  const maxTotal = totalNewOm.some((total, index) => {
    return total > 100 && total > totalOld[index];
  });

  // comprobar que total esta produciendo el error

  const errrorIndex = totalNewOm.findIndex((total, index) => {
    return total > 100 && total > totalOld[index];
  });

  // comprobar si se ha producido algun cambio en el %OM

  const omChange = newOm.some((om) => {
    return om !== undefined && om !== "";
  });

  // guardar cambios

  function saveChange() {
    if (!getCompany.length) return;

    const newDate = date || getCompany[0].from;
    if (!newDate) {
      alert("Selecciona una fecha de vigencia");
      return;
    }

    if (
      newOm.some(
        (value) =>
          value !== undefined &&
          value !== "" &&
          (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100),
      )
    ) {
      alert("Los porcentajes deben estar entre 0 y 100");
      return;
    }

    if (maxTotal) {
      alert("El cambio aumenta un total que ya supera el 100%");
      return;
    }

    const updatedCompanies = companiesData.map((company) => {
      if (company.version === Number(edit)) {
        const globalIndex = getCompany.indexOf(company);
        return {
          ...company,
          om:
            newOm[globalIndex] === undefined || newOm[globalIndex] === ""
              ? company.om
              : Number(newOm[globalIndex]),
          from: newDate,
        };
      }
      return company;
    });

    // Actualizar el fin de cada versión del mismo servicio y empresa.
    const result = updatedCompanies.map((company) => {
      const following = updatedCompanies
        .filter(
          (item) =>
            item.company === company.company &&
            item.service === company.service &&
            item.from > company.from,
        )
        .sort((a, b) => a.from.localeCompare(b.from));

      let to = "-";
      if (following.length) {
        const previousDay = new Date(following[0].from + "T00:00:00");
        previousDay.setDate(previousDay.getDate() - 1);
        const year = previousDay.getFullYear();
        const month = String(previousDay.getMonth() + 1).padStart(2, "0");
        const day = String(previousDay.getDate()).padStart(2, "0");
        to = `${year}-${month}-${day}`;
      }

      const today = new Date();
      const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      const status =
        company.from > todayString
          ? "Programado"
          : to !== "-" && to < todayString
            ? "Vencido"
            : "Vigente";
      return { ...company, to, status };
    });

    setCompaniesData(result);
    setOpenEditVersion(false);
  }

  return (
    <div
      className="position-fixed bg-white rounded shadow"
      style={{
        width: "720px",

        maxWidth: "94vw",

        maxHeight: "78vh",

        top: "50%",

        left: "50%",

        transform: "translate(-50%, -50%)",

        zIndex: 1050,

        overflow: "hidden",

        display: "flex",

        flexDirection: "column",
      }}
    >
      {/* CABECERA */}

      <div
        className="text-white d-flex align-items-center justify-content-between w-100 px-3 py-2"
        style={{
          backgroundColor: "#5794c2",

          flexShrink: 0,
        }}
      >
        EDITAR VERSIÓN COMPLETA DE %OM
        <div className="d-flex align-items-center gap-2 position-relative">
          <button
            onClick={() => setInformation(true)}
            className="text-white border-0"
            style={{
              backgroundColor: "transparent",

              fontSize: "15px",

              fontWeight: "700",

              padding: "0 5px",
            }}
          >
            ?
          </button>

          {information && (
            <div
              className="px-3 py-2"
              style={{
                position: "absolute",

                top: "30px",

                right: "32px",

                width: "360px",

                backgroundColor: "#EDF4FA",

                color: "#253F63",

                border: "1px solid #c5d5ee",

                borderRadius: "8px",

                zIndex: 1100,

                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",

                fontSize: "14px",

                fontWeight: "normal",
              }}
            >
              Se editan de una sola vez los valores de{" "}
              <strong>
                {" "}
                todas las empresas que comparten este N° de versión{" "}
              </strong>
              (no se crea una versión nueva ni cambia el N° de versión). El %OM
              se define por separado para cada Tipo de Servicio incluido en esta
              versión, y el control del 100% se aplica igual que en Nueva
              Versión, dentro de cada uno.
            </div>
          )}

          <button
            className="text-white border-0"
            style={{
              backgroundColor: "transparent",

              fontSize: "15px",

              fontWeight: "700",

              padding: "0 5px",
            }}
            onClick={() => {
              setOpenEditVersion(false);
            }}
          >
            X
          </button>
        </div>
      </div>

      {/* DATOS DE LA VERSION - PARTE FIJA */}

      <div
        className="row mx-3 mt-3"
        style={{
          border: "1px solid #C5D8E8",

          flexShrink: 0,
        }}
      >
        <div
          className="col-4 d-flex align-items-center"
          style={{
            backgroundColor: "#EAF3FA",

            border: "1px solid #C5D8E8",
          }}
        >
          Versión a editar:
        </div>

        <div
          className="col-8 d-flex align-items-center"
          style={{
            border: "1px solid #C5D8E8",
          }}
        >
          <select
            className="form-select form-select-sm"
            onChange={(event) => {
              setEdit(event.target.value);
              setNewOm([]);
              const selected = companiesData.find(
                (company) => company.version === Number(event.target.value),
              );
              setDate(selected ? selected.from : "");
            }}
          >
            {onlyVersion.map((version) => {
              const versionRecords = companiesData.filter((company) => {
                return company.version === version;
              });

              const services = versionRecords.map((company) => {
                return company.service;
              });

              const onlyService = [...new Set(services)];

              const numServices = versionRecords.length;

              return (
                <option key={version} value={version}>
                  Nº {version} — {onlyService.join(" y ")} ({numServices}{" "}
                  registros)
                </option>
              );
            })}
          </select>
        </div>

        <div
          className="col-4 d-flex align-items-center"
          style={{
            backgroundColor: "#EAF3FA",

            border: "1px solid #C5D8E8",
          }}
        >
          Vigente desde:
        </div>

        <div
          className="col-8 d-flex align-items-center"
          style={{
            border: "1px solid #C5D8E8",
          }}
        >
          <input
            type="date"
            className="form-control form-control-sm"
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
        </div>

        <div
          className="col-4 d-flex align-items-center"
          style={{
            backgroundColor: "#EAF3FA",

            border: "1px solid #C5D8E8",
          }}
        >
          Nº Version:
        </div>

        <div
          className="col-8 d-flex align-items-center"
          style={{
            border: "1px solid #C5D8E8",
          }}
        >
          {edit}
        </div>
      </div>

      {/* SCROLL SOLO PARA SERVICIOS Y EMPRESAS */}

      <div
        style={{
          overflowY: "auto",

          flex: 1,

          minHeight: 0,
        }}
      >
        <div className="mx-3">
          {companieService.map((companies) => {
            return (
              <div className="fw-bold mt-3 mb-2" key={companies[0].service}>
                <div
                  className="fw-bold px-3 py-1"
                  style={{
                    backgroundColor: "#EDF4FA",

                    color: "#253F63",

                    border: "1px solid #C5D8E8",

                    borderRadius: "4px 4px 0 0",
                  }}
                >
                  {companies[0].service}
                </div>

                <div
                  className="row mx-0 text-white fw-bold py-1"
                  style={{
                    backgroundColor: "#3978A8",

                    fontSize: "12px",
                  }}
                >
                  <div className="col-4">EMPRESA</div>

                  <div className="col-4">%OM ACTUAL</div>

                  <div className="col-4">%OM NUEVO</div>
                </div>

                {companies.map((company, index) => {
                  const globalIndex = getCompany.indexOf(company);

                  return (
                    <div
                      className="row mx-0 align-items-center py-1"
                      key={company.company}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#EAF3FA",

                        borderBottom: "1px solid #D5E3EF",

                        fontSize: "12px",

                        fontWeight: "400",

                        minHeight: "33px",
                      }}
                    >
                      <div className="col-4 px-3">{company.company}</div>

                      <div
                        className="col-4 text-center"
                        style={{
                          color: "#68728a",
                        }}
                      >
                        {company.om}
                      </div>

                      <div className="col-4 d-flex justify-content-end px-3">
                        <input
                          className="form-control text-end"
                          style={{
                            width: "70px",

                            height: "27px",

                            fontSize: "12px",

                            padding: "2px 5px",
                          }}
                          type="number"
                          onChange={(event) => {
                            const copyOm = [...newOm];

                            copyOm[globalIndex] = event.target.value;

                            setNewOm(copyOm);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* MENSAJES - FUERA DEL SCROLL */}

      <div
        className="px-3"
        style={{
          flexShrink: 0,
        }}
      >
        {omChange && !maxTotal && (
          <div style={{ color: "#327828" }}>
            Los cambios no hacen que el total de %OM vigente supere, en ninguna
            fecha involucrada, al que ya tenía antes de esta edición.
          </div>
        )}

        {maxTotal && (
          <div>
            <div style={{ color: "#ea1818" }}>
              Total de %OM vigente si guardo estos cambios:{" "}
              {totalNewOm[errrorIndex]}% al {date || getCompany[0].from} (
              {onlyService[errrorIndex]})
            </div>

            <div
              className="rounded-3"
              style={{
                backgroundColor: "#fff3cd",

                border: "1px solid #e0a800",
              }}
            >
              Con estos valores, el total de %OM vigente para{" "}
              <strong>{onlyService[errrorIndex]}</strong> al{" "}
              {date || getCompany[0].from} quedaría en{" "}
              <strong>{totalNewOm[errrorIndex]}%</strong> — supera el 100% y es
              más alto que el que ya había en esa fecha. Ajustá uno o más
              valores antes de guardar.
            </div>
          </div>
        )}
      </div>

      {/* BOTONES - FUERA DEL SCROLL */}

      <div
        className="d-flex gap-2 px-3 py-2"
        style={{
          flexShrink: 0,

          backgroundColor: "white",
        }}
      >
        <button
          className="text-white rounded-2 px-3 py-1"
          style={{
            backgroundColor: "#5794c2",
          }}
          onClick={saveChange}
        >
          Guardar Cambios
        </button>

        <button
          className="rounded-2 px-3 py-1"
          style={{
            color: "#5794c2",

            backgroundColor: "#f0f6fb",
          }}
          onClick={() => {
            setOpenEditVersion(false);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default EditVersion;
