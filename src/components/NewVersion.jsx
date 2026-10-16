import { useState, useEffect } from "react";

function NewVersion({ setNewVersion, companiesData, setCompaniesData }) {
  const [selectedService, setSelectedService] = useState("");
  const [addedServices, setAddedServices] = useState([]);
  const [serviceToRemove, setServiceToRemove] = useState("");
  const [om, setOm] = useState([]);
  const [information, setInformation] = useState(false);
  const [dateFuture, setDateFuture] = useState(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
});
  const [toast, setToast] = useState("");
  useEffect(() => {
  if (!toast) return;

  const timer = setTimeout(() => {
    setToast("");
  }, 4000);

  return () => clearTimeout(timer);
}, [toast]);
  const server = companiesData.map((company) => company.service);
  const uniqueServer = new Set(server);
  const companies = [...new Set(companiesData.map((company) => company.company))];
  const employServer = companiesData.filter((employ) => addedServices.includes(employ.service));

  function closeNewVersion() {
    setNewVersion(false);
  }

  function moreInformation() {
    setInformation(!information);
  }

 function dateUser(event) {
  setDateFuture(event.target.value);
}

  function saveNewVersion() {
    if(addedServices.length===0){
      setToast("Debes seleccionar al menos un tipo de servicio")
    }
    if (!dateFuture) {
    setToast("Debes seleccionar una fecha de vigencia");
    return;
     }

    const validPercentage = addedServices.every((service) => {

  const companiesService = companiesData.filter((company) => {
    return company.service === service && company.from <= dateFuture;
  });

  const companies = [...new Set(companiesService.map((company) => {
    return company.company;
  }))];

  const totalPercentage = companies.reduce((acc, companyName) => {

    const versions = companiesService.filter((company) => {
      return company.company === companyName;
    });

    const lastVersion = versions.reduce((acc, company) => {
      if (!acc || company.from > acc.from) {
        return company;
      }
      return acc;
    }, null);

    const newPercentage = om.find((percentage) => {
      return percentage.company === companyName &&
             percentage.service === service;
    });

    if (newPercentage) {
      return acc + Number(newPercentage.newOm);
    }

    return acc + Number(lastVersion.om);

  }, 0);

  return Math.abs(totalPercentage - 100) < 0.000001;

});

if (!validPercentage) {
  setToast("No se puede guardar. Cada servicio debe sumar exactamente 100 %");
  return;
}
    const newVersionNumber =
      companiesData.reduce((acc, version) => {
        if (version.version > acc) {
          return version.version;
        } else {
          return acc;
        }
      }, 0) + 1;

    const newVersionData = om.map((date) => {
      const existingCompany = companiesData.find((company) => {
        return company.company === date.company && company.service === date.service;
      });
      return {
        company: date.company,
        service: date.service,
        om: date.newOm,
        from: dateFuture,
        table: existingCompany.table,
        branch: existingCompany.branch,
        status: "Programado",
        to: "-",
        version: newVersionNumber,
      };
    });
    setCompaniesData(() => [...companiesData, ...newVersionData]);
    closeNewVersion();
  }

  const nextVersionNumber =
    companiesData.reduce((acc, version) => (version.version > acc ? version.version : acc), 0) + 1;

  const blueButton = {
    background: "linear-gradient(180deg, #63A8D5 0%, #4388BD 100%)",
    border: "1px solid #2F76B0",
    color: "white",
    borderRadius: "4px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  };
  const selectStyle = {
    width: "100%",
    height: "94px",
    border: "1px solid #3B85C3",
    borderRadius: "4px",
    padding: "3px 6px",
    fontSize: "12px",
    color: "#303746",
    backgroundColor: "#FFFFFF",
  };
  const labelStyle = {
    backgroundColor: "#EFF6FC",
    borderRight: "1px solid #C9E0F2",
    color: "#18223B",
    fontSize: "12px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    padding: "4px 9px",
  };

  return (
    <div   className="position-fixed d-flex align-items-center justify-content-center"
      style={{ inset: 0, zIndex: 1050, backgroundColor: "rgba(20, 28, 59, 0.48)", padding: "18px" }}
    >
    {toast && (
  <div
    role="alert"
    className="position-fixed "
    style={{
      bottom: "35px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 2000,
      backgroundColor: "#1E2447",
      color: "#FFFFFF",
      borderRadius: "25px",
      padding: "15px 25px",
      boxShadow: "0 8px 22px rgba(0,0,0,0.25)",
      width: "max-content",
      maxWidth: "calc(100vw - 40px)",
      fontSize: "14px",
      lineHeight: "21px",
      fontWeight: 400,
    }}
  >
    <span>{toast}</span>

 
  </div>
)}
    
      <div
        style={{
          width: "700px",
          maxWidth: "100%",
          maxHeight: "calc(100vh - 36px)",
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: "0 14px 38px rgba(0,0,0,0.22)",
          fontFamily: "Arial, sans-serif",
          color: "#293044",
          position: "relative",
        }}
      >
        <div
          className="d-flex align-items-center justify-content-between px-3"
          style={{
            minHeight: "36px",
            background: "linear-gradient(180deg, #60A8D7 0%, #4387BB 100%)",
            color: "#FFFFFF",
            fontSize: "13px",
            fontWeight: 700,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <span>NUEVA VERSIÓN · %OM POR TIPO DE SERVICIO</span>
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              onClick={moreInformation}
              aria-label="Información"
              style={{ background: "transparent", border: "1px solid #FFFFFF", borderRadius: "50%", color: "white", width: "23px", height: "23px", lineHeight: "19px", fontWeight: 700, padding: 0 }}
            >
              ?
            </button>
            <button
              type="button"
              onClick={closeNewVersion}
              aria-label="Cerrar"
              style={{ background: "transparent", border: 0, color: "white", fontSize: "26px", lineHeight: 1, padding: 0, fontWeight: 300 }}
            >
              ×
            </button>
          </div>
        </div>

        {information && (
          <div
            className="position-absolute p-3"
            style={{ width: "425px", maxWidth: "calc(100% - 30px)", maxHeight: "390px", overflowY: "auto", backgroundColor: "#EEF4FF", color: "#35466F", border: "1px solid #B8CBEA", borderRadius: "6px", zIndex: 2, top: "45px", right: "40px", fontSize: "13px", lineHeight: "21px", boxShadow: "0 3px 12px rgba(0,0,0,.2)" }}
          >
            <p className="mb-0">
              Pasá a la derecha uno o varios Tipos de Servicio para cargarles %OM en la misma tanda
              (por ejemplo, Emergencia y Traslado a la vez). El %OM se define por separado para cada
              Tipo de Servicio elegido. El %OM nuevo arranca en 0 para todas las empresas; ajustá el
              valor de las que querés actualizar y dejá en blanco las que no cambian. Todas las
              empresas actualizadas comparten el mismo N° de versión y la misma fecha de vigencia.
              <strong> El total de %OM tiene que sumar exactamente 100% en cada Tipo de Servicio incluido.</strong>
            </p>
          </div>
        )}

        <div style={{ padding: "10px 16px 0" }}>
          <div style={{ border: "1px solid #C9E0F2" }}>
            <div className="row g-0" style={{ borderBottom: "1px solid #C9E0F2" }}>
              <div className="col-4" style={labelStyle}>
                Tipo de Servicio: <span style={{ color: "#E33B3B", marginLeft: "4px" }}>*</span>
              </div>
              <div className="col-8" style={{ padding: "4px 8px" }}>
                <div className="d-flex align-items-stretch" style={{ gap: "6px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <select multiple style={selectStyle} value={selectedService ? [selectedService] : []} onChange={(event) => setSelectedService(event.target.value)}>
                      {[...uniqueServer].filter((service) => !addedServices.includes(service)).map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex flex-column justify-content-between" style={{ width: "32px", flexShrink: 0 }}>
                    <button type="button" style={{ ...blueButton, height: "21px" }} onClick={() => {
                      if (selectedService && !addedServices.includes(selectedService)) setAddedServices([...addedServices, selectedService]);
                    }}>→</button>
                    <button type="button" style={{ ...blueButton, height: "21px" }} onClick={() => setAddedServices([...uniqueServer])}>⇉</button>
                    <button type="button" style={{ ...blueButton, height: "21px" }} onClick={() => setAddedServices(addedServices.filter((service) => service !== serviceToRemove))}>←</button>
                    <button type="button" style={{ ...blueButton, height: "21px" }} onClick={() => setAddedServices([])}>⇇</button>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <select multiple style={selectStyle} value={serviceToRemove ? [serviceToRemove] : []} onChange={(event) => setServiceToRemove(event.target.value)}>
                      {addedServices.map((service) => <option key={service} value={service}>{service}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-0" style={{ minHeight: "37px", borderBottom: "1px solid #C9E0F2" }}>
              <div className="col-4" style={labelStyle}>Vigente desde: <span style={{ color: "#E33B3B", marginLeft: "4px" }}>*</span></div>
              <div className="col-8 d-flex align-items-center" style={{ padding: "4px 8px" }}>
                <input type="date" className="form-control" style={{ maxWidth: "335px", height: "29px", border: "1px solid #3B85C3", fontSize: "14px" }} value={dateFuture} onChange={dateUser} />
              </div>
            </div>
            <div className="row g-0" style={{ minHeight: "27px" }}>
              <div className="col-4" style={labelStyle}>N° de versión de esta carga:</div>
              <div className="col-8 d-flex align-items-center" style={{ padding: "4px 12px", color: "#347EBB", fontWeight: 700, fontSize: "13px" }}>N° {nextVersionNumber}</div>
            </div>
          </div>

          {addedServices.length === 0 ? (
            <p style={{ color: "#69728F", fontSize: "13px", fontWeight: 700, margin: "16px 0 13px" }}>
              Pasá a la derecha al menos un Tipo de Servicio para ver el total.
            </p>
          ) : (
            <>
              <div style={{ maxHeight: "315px", overflowY: "auto", marginTop: "8px" }}>
                {addedServices.map((service) => (
                  <div key={service}>
                    {addedServices.length > 1 && (
                      <div style={{ padding: "7px 12px", backgroundColor: "#DDEBF6", color: "#244F78", fontWeight: 700, fontSize: "13px" }}>{service}</div>
                    )}
                    {companies.map((companyName, index) => {
                      const server = companiesData.find((company) => company.company === companyName && company.service === service);
                      return (
                        <div
                          className="row mx-0 align-items-center"
                          key={companyName + "-" + service}
                          style={{ backgroundColor: index % 2 === 0 ? "#ECF5FB" : "#FFFFFF", borderBottom: "1px solid #E0E8F0", minHeight: "39px", fontSize: "13px" }}
                        >
                          <div className="col-6 px-3">{companyName}</div>
                          <div className="col-3 text-center" style={{ color: "#737D9A", fontSize: "13px" }}>{server ? `${server.om}%` : "Sin objetivo definido"}</div>
                          <div className="col-3 d-flex justify-content-end px-3">
                            <input
                              type="number"
                              className="form-control text-end"
                              style={{ width: "90px", maxWidth: "100%", height: "28px", border: "1px solid #ADB9D6", borderRadius: "6px", fontSize: "14px" }}
                              defaultValue={0}
                              onChange={(event) => {
                                const exists = om.some((item) => item.company === server.company && item.service === server.service);
                                if (exists) {
                                  const newOm = om.map((item) => {
                                    if (item.company === server.company && item.service === server.service) {
                                      return { ...item, newOm: event.target.value };
                                    }
                                    return item;
                                  });
                                  setOm(newOm);
                                } else {
                                  setOm([...om, { company: server.company, service: server.service, newOm: event.target.value }]);
                                }
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div style={{ color: "#E23434", fontSize: "13px", fontWeight: 700, margin: "9px 0 12px" }}>
                {addedServices.map((service, index) => {
                  const serviceOm = om.filter((percentage) => percentage.service === service);
                  const totalPercentage = serviceOm.reduce((acc, percentage) => acc + Number(percentage.newOm), 0);
                  return <span key={service}>{index > 0 ? " - " : ""}Total de {service === "Emergencia" ? "Emergencias" : service === "Traslado" ? "Traslados" : service}: {totalPercentage}%</span>;
                })}
              </div>
            </>
          )}

          <div className="d-flex gap-3" style={{ paddingBottom: "12px" }}>
            <button type="button" style={{ ...blueButton, padding: "5px 16px", minWidth: "95px" }} onClick={saveNewVersion}>Guardar</button>
            <button type="button" style={{ backgroundColor: "#FFFFFF", color: "#347EBB", border: "1px solid #347EBB", borderRadius: "4px", fontSize: "14px", fontWeight: 700, padding: "5px 16px", minWidth: "95px" }} onClick={closeNewVersion}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewVersion;
