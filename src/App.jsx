import companies from "./data/companies.js";
import Pagination from "./components/Pagination";
import CompanyList from "./components/CompayList.jsx";
import { useState } from "react";
import useFilter from "./hooks/useFilter.js";
import Filter from "./components/Filter.jsx";
import NewVersion from "./components/NewVersion.jsx";
import EditVersion from "./components/EditVersion.jsx";
import DeleteVersion from "./components/DeleteVersion.jsx";
import ViewVersion from "./components/ViewVersion.jsx";
import Order from "./components/Order.jsx";
import Helps from "./components/Helps.jsx";
import { blue} from "./styles/colors";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";


function App() {
  const [page, setPage] = useState(1);
  const [newVersion, setNewVersion] = useState(false);
  const [openEditVersion, SetOpenEditVersion] = useState(false);
  const [openDeleteVersion, setOpenDeleteVersion] = useState(false);
  const [buttonHelp, setButtonHelp] = useState(false);
  const [selectService, setSelectService] = useState(null);
  const [buttonView, setButtonView] = useState(false);
  const [orderedCompanies, setOrderedCompanies] = useState(null);

  //funcion para saber el estado de la tarea

  function versionStatus(version) {
    const hoy = "2026-09-08";

    if (version.desde > hoy) {
      return "Programado";
    }

    if (version.hasta && version.hasta < hoy) {
      return "Vencido";
    } else {
      return "Vigente";
    }
  }

  //funcion para transformar el array y poder recorrerlo

  const convertedCompanies = companies.flatMap((company) => {
    return company.versiones.map((version) => {
      return {
        company: company.empresa,
        service: version.servicio,
        table: company.mesa,
        branch: company.filial,
        om: version.pm,
        version: version.lote,
        from: version.desde,
        to: version.hasta,
        status: versionStatus(version),
      };
    });
  });

  const [companiesData, setCompaniesData] = useState(convertedCompanies);

  //usuamos el hooks

  const { filteredCompanies, filters } = useFilter(companiesData);

  //funcion para imprimir las empresas por pantalla

  // Empresas que se muestran en la página actual

  const init = (page - 1) * 5;
  const end = init + 5;
  const sortedCompanies = [...filteredCompanies];

  if (orderedCompanies) {
    const { selectedColumn, newOrder } = orderedCompanies;

    sortedCompanies.sort((a, b) => {
      if (selectedColumn === "om" || selectedColumn === "version") {
        const difference = Number(a[selectedColumn]) - Number(b[selectedColumn]);
        return newOrder === "asc" ? difference : -difference;
      }

      const valueA = String(selectedColumn === "to"
        ? a[selectedColumn] || "9999-12-31"
        : a[selectedColumn] ?? "");
      const valueB = String(selectedColumn === "to"
        ? b[selectedColumn] || "9999-12-31"
        : b[selectedColumn] ?? "");

      return newOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }

  const visibleCompanies = sortedCompanies.slice(init, end);

  //funcion para abrir nueva tarea

  function openNewVersion() {
    setNewVersion(true);
  }

  const buttonStyle = {
    backgroundColor: "#438BC2",
    backgroundImage: "linear-gradient(180deg, #64A7D5 0%, #438BC2 100%)",
    color: "#FFFFFF",
    border: "1px solid #3978A8",
    borderRadius: "5px",
    fontFamily: "Arial, sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    minHeight: "34px",
    padding: "6px 12px",
    cursor: "pointer",
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#EFF2FC",
        minHeight: "100vh",
        padding: "0 0 24px",
      }}
    >
      {/* Cabecera principal */}
      <div
        className="title px-3 py-2"
        style={{
          backgroundColor: "#1D3C87",
          color: "white",
          fontFamily: "Arial, sans-serif",
          fontSize: "17px",
          lineHeight: "1.4",
          fontWeight: "600",
        }}
      >
        ABM de %OM por Empresa de Ambulancias
        <p
          className="mb-0"
          style={{
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "1.3",
          }}
        >
          Configuración versionada del Objetivo Mensual (%OM) por prestador
        </p>
      </div>
      {/* Recuadro principal azul */}
      <div
        className="container-fluid mt-4 mx-auto"
        style={{
          backgroundColor: blue,
          border: "1px solid #3978A8",
          borderRadius: "5px",
          overflow: "hidden",
          textAlign: "center",
          maxWidth: "1400px",
          width: "85%",
          padding: "0",
          color: "white",
        }}
      >
        <p
          className="mb-0 text-center"
          style={{
            background: "linear-gradient(to bottom, #5A9DCC 0%, #4389BE 100%)",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            fontSize: "15px",
            fontWeight: "700",
            letterSpacing: "0.3px",
            padding: "11px 8px",
            borderBottom: "1px solid #3978A8",
          }}
        >
          LISTADO DE %OM POR EMPRESA
        </p>

        {/* Primera paginación */}

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            background: "linear-gradient(to bottom, #5296C8, #438BC2)",
            padding: "4px 8px",
            minHeight: "36px",
            borderTop: "1px solid #3978A8",
            borderBottom: "1px solid #3978A8",
          }}
        >
          <Pagination
            page={page}
            setPage={setPage}
            filteredCompanies={filteredCompanies}
          />
        </div>


        {/* Filtros */}
        <Order
      onSortChange={setOrderedCompanies}
      
      />

        <Filter filters={filters} setPage={setPage} />

        {/* Listado de empresas */}

        <CompanyList
          visibleCompanies={visibleCompanies}
          setSelectService={setSelectService}
        />

        {/* Segunda paginación */}

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            background: "linear-gradient(to bottom, #5296C8, #438BC2)",
            padding: "4px 8px",
            minHeight: "36px",
            borderTop: "1px solid #3978A8",
            borderBottom: "1px solid #3978A8",
          }}
        >
          <Pagination
            page={page}
            setPage={setPage}
            filteredCompanies={filteredCompanies}
          />
        </div>
      </div>
      {/* Botones  */}
      <div
        className="d-flex justify-content-between align-items-center gap-3 mt-3 mb-4 mx-auto"
        style={{
          maxWidth: "1400px",
          width: "85%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Botones de la izquierda */}

        <div className="d-flex gap-2">
          <button
            className="d-flex align-items-center gap-2 rounded-3 px-3 py-1"
            style={buttonStyle}
            onClick={() => {
              openNewVersion();
            }}
          >
            <Plus size={15} />
            Nueva Versión
          </button>

          <button
            onClick={() => setButtonView(true)}
            disabled={!selectService}
            className=" align-items-center gap-2 rounded-3 px-3 py-1"
            style={buttonStyle}
          >
            <Search size={15} /> Ver
          </button>

          <button
            className="d-flex align-items-center gap-2 rounded-3 px-3 py-1"
            style={buttonStyle}
            onClick={() => {
              SetOpenEditVersion(true);
            }}
          >
            <Pencil size={15} />
            Editar Versión
          </button>

          <button
            className="d-flex align-items-center gap-2 rounded-3 px-3 py-1"
            style={buttonStyle}
            onClick={() => {
              setOpenDeleteVersion(true);
            }}
          >
            <Trash2 size={15} /> Borrar versión
          </button>
        </div>

        {/* Botón de la derecha */}

        <button
          onClick={() => {
            setButtonHelp(true);
          }}
          className="rounded-3 px-3 py-1"
          style={buttonStyle}
        >
          ❓ Ayuda
        </button>
      </div>{" "}
     
      {buttonHelp && <Helps setButtonHelp={setButtonHelp} />}
      {/* Componentes de crear, editar y borrar */}
      {newVersion && (
        <NewVersion
          setCompaniesData={setCompaniesData}
          companiesData={companiesData}
          setNewVersion={setNewVersion}
          openNewVersion={openNewVersion}
        />
      )}
      {openEditVersion && (
        <EditVersion
          companiesData={companiesData}
          setCompaniesData={setCompaniesData}
          openeditVersion={openEditVersion}
          setOpenEditVersion={SetOpenEditVersion}
        />
      )}
      {openDeleteVersion && (
        <DeleteVersion
          companiesData={companiesData}
          setCompaniesData={setCompaniesData}
          openDeleteVersion={openDeleteVersion}
          setOpenDeleteVersion={setOpenDeleteVersion}
        />
      )}
      {buttonView && (
        <ViewVersion
          companiesData={companiesData}
          selectService={selectService}
          setSelectService={setSelectService}
          setButtonView={setButtonView}
        />
      )}

      
    </div>
  );
}

export default App;
