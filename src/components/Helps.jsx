import { useState } from "react";
import { blue, borderBlue } from "../styles/colors";

function Helps(){
    const [buttonHelp, setButtonHelp] = useState(false);
    

    return(
        <div>
            {/* Ventana de Ayuda */}
   
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

              maxWidth: "100%",

              maxHeight: "95vh",

              overflowY: "auto",

              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            {/* Cabecera */}

            <div
              className="d-flex justify-content-between align-items-center px-4 py-3"
              style={{
                backgroundColor: blue,

                color: "white",

                fontWeight: "bold",

                borderRadius: "10px 10px 0 0",
              }}
            >
              <span> ❓ AYUDA · CÓMO FUNCIONA ESTE ABM</span>

              <button
                onClick={() => setButtonHelp(false)}
                style={{
                  background: "none",

                  border: "none",

                  color: "white",

                  fontSize: "24px",

                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* Contenido */}

            <div
              className="p-4"
              style={{
                color: "#333",

                fontSize: "14px",

                lineHeight: "1.65",

                fontWeight: "normal",

                textAlign: "left",

                backgroundColor: "white",
              }}
            >
              <p>
                <strong>Empresa:</strong> se pueden dar de alta todas las
                empresas con faceta / tipo de prestador "Am" (ambulancia). Cada
                versión de %OM queda con <strong>fecha de vigencia</strong>: la
                versión vigente anterior de esa empresa, para el mismo Tipo de
                Servicio, se cierra automáticamente el día previo a la nueva
                fecha de inicio, sin perder el historial (por ejemplo, si Acudir
                pasara de 60% a 51% en Emergencia a partir de una fecha dada, la
                versión del 60% quedaría cerrada el día previo).
              </p>

              <p>
                <strong>Tipo de Servicio:</strong> todo %OM se define a nivel{" "}
                <strong>Tipo de Servicio</strong> (por ejemplo, Emergencia o
                Traslado). Cada Tipo de Servicio es un universo de %OM
                independiente de los demás: la suma de los %OM vigentes de todas
                las empresas no debe superar el 100%{" "}
                <strong>dentro de ese mismo Tipo de Servicio</strong>, pero una
                empresa puede tener %OM cargado a la vez en varios Tipos de
                Servicio distintos (por ejemplo, Acudir tiene 60% en Emergencia
                y 70% en Traslado, cargados por separado). Una empresa puede no
                tener todavía ningún %OM cargado para algún Tipo de Servicio
                puntual (por ejemplo, URG no tiene Traslado cargado): es un
                estado válido, y no le impide tener %OM en otros Tipos de
                Servicio. No aparece en el listado para ese Tipo de Servicio
                hasta que se le dé de alta una versión ahí desde{" "}
                <strong>Nueva Versión</strong>, que es la única forma de cargar
                versiones nuevas.
              </p>

              <p>
                <strong>Nueva Versión:</strong> permite cargar, en una misma
                tanda, una nueva versión de %OM para uno o varios Tipos de
                Servicio a la vez (por ejemplo, Emergencia y Traslado juntos),
                todas vigentes desde la misma fecha — pero el %OM se define por
                separado para cada Tipo de Servicio elegido, en su propia grilla
                de Empresa / %OM actual / %OM nuevo. El control del 100% se
                aplica sobre el total combinado de la carga dentro de cada Tipo
                de Servicio por separado. Toda la carga (con todos los Tipos de
                Servicio que incluya) queda identificada con un único{" "}
                <strong>N° de versión</strong> correlativo, visible en la
                columna "N° Versión" del listado (la carga inicial de datos es
                la versión N° 1).
              </p>

              <p>
                <strong>Editar versión:</strong> usa el mismo diseño que Nueva
                Versión — corrige, para todas las empresas de un mismo N° de
                versión a la vez (agrupadas por Tipo de Servicio), su %OM y/o su
                fecha de vigencia (no genera una versión nueva, ni cambia el N°
                de versión ni el o los Tipos de Servicio). El control del 100%
                se aplica igual que en Nueva Versión, por separado en cada Tipo
                de Servicio incluido.
              </p>

              <p>
                <strong>Borrar versión:</strong> elimina de una sola vez{" "}
                <strong>
                  todos los registros que comparten un mismo N° de versión
                </strong>{" "}
                (por ejemplo, toda una carga, con todos sus Tipos de Servicio),
                en todas las empresas donde se haya cargado esa versión. Si a
                alguna empresa la deja sin ningún %OM cargado para algún Tipo de
                Servicio puntual, el sistema lo avisa antes de confirmar (ese
                estado es válido: es el mismo con el que arranca una empresa
                antes de su primera carga en ese Tipo de Servicio; puede seguir
                teniendo %OM cargado en otros).
              </p>

              <button
                onClick={() => setButtonHelp(false)}
                className="rounded-2 px-4 py-2 mt-2"
                style={{
                  backgroundColor: blue,

                  color: "white",

                  border: `1px solid ${borderBlue}`,

                  fontWeight: "600",
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      

        </div>
    )

}export default Helps