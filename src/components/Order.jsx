
import { useState } from "react";
import { ArrowDownUp, ArrowUp, ArrowDown } from "lucide-react";
import { tableHeaderBlue } from "../styles/colors";

function Order({  onSortChange }) {
  const [column, setColumn] = useState("company");
  const [order, setOrder] = useState("asc");

  // Función para ordenar las empresas
  function orderCompanies(selectedColumn) {
    let newOrder = "asc";

    // Si pulsa la misma columna, cambiamos el orden
    if (column === selectedColumn) {
      if (order === "asc") {
        newOrder = "desc";
      } else {
        newOrder = "asc";
      }
    }

    onSortChange({selectedColumn, newOrder});
    setOrder(newOrder);
    setColumn(selectedColumn);

    }

  // Función para mostrar la flecha correspondiente
  function showArrow(selectedColumn) {
    if (column === selectedColumn) {
      if (order === "asc") {
        return <ArrowUp size={11} color="white" />;
      } else {
        return <ArrowDown size={11} color="white" />;
      }
    } else {
      return <ArrowDownUp size={11} color="white" />;
    }
  }

  return (
    <div
      className="row mx-0 py-2"
      style={{
        backgroundColor: tableHeaderBlue,
        color: "white",
        fontWeight: "600",
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        alignItems: "center",
        borderBottom: "1px solid #3978A8",
        minHeight: "40px",
      }}
    >
      <div className="col border-end">
        MESA OPERATIVA
        <button
          onClick={() => orderCompanies("table")}
          className="border-0 bg-transparent p-0 ms-1"
        >
          {showArrow("table")}
        </button>
      </div>

      <div className="col border-end">
        FILIAL
        <button
          onClick={() => orderCompanies("branch")}
          className="border-0 bg-transparent p-0 ms-1"
        >
          {showArrow("branch")}
        </button>
      </div>

      <div className="col border-end">
        T.SERVICIO
        <button
          onClick={() => orderCompanies("service")}
          className="border-0 bg-transparent p-0 ms-1"
        >
          {showArrow("service")}
        </button>
      </div>

      <div className="col border-end">
        EMPRESA
        <button
          onClick={() => orderCompanies("company")}
          className="border-0 bg-transparent p-0 ms-1"
        >
          {showArrow("company")}
        </button>
      </div>

      <div className="col border-end">
        %OM
        <button
          onClick={() => orderCompanies("om")}
          className="border-0 bg-transparent p-0 ms-1"
        >
          {showArrow("om")}
        </button>
      </div>

      <div className="col border-end">
        VIGENTE DESDE
        <button
          onClick={() => orderCompanies("from")}
          className="border-0 bg-transparent p-0 ms-1"
        >
          {showArrow("from")}
        </button>
      </div>

      <div className="col border-end">
        VIGENTE HASTA
        <button
          onClick={() => orderCompanies("to")}
          className="border-0 bg-transparent p-0 ms-1"
        >
          {showArrow("to")}
        </button>
      </div>

      <div className="col border-end">
        ESTADO
        <button
          onClick={() => orderCompanies("status")}
          className="border-0 bg-transparent p-0 ms-1"
        >
          {showArrow("status")}
        </button>
      </div>

      <div className="col">
        N° VERSIÓN
        <button
          onClick={() => orderCompanies("version")}
          className="border-0 bg-transparent p-0 ms-1"
        >
          {showArrow("version")}
        </button>
      </div>
    </div>
  );
}

export default Order;
