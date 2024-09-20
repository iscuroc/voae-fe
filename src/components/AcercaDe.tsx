export default function AcercaDe() {
  return (
    <>
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl text-center font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Conócenos
          </h2>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Misión */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-3xl font-semibold text-gray-900">
                Nuestra Misión
              </h3>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Facilitar la gestión eficiente y transparente de las horas de
                Artículo 140 sección b de las Normas Académicas UNAH, para los
                estudiantes del campus Copán.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-3xl font-semibold text-gray-900">
                Nuestra Visión
              </h3>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Ser la semilla de un cambio positivo en la comunidad
                universitaria del campus Copán, fomentando la transición de los
                procesos estudiantiles hacia un modelo digital y sostenible.
              </p>
            </div>
          </div>

          {/* Sección con dos columnas (Qué Ofrecemos y Ventajas) */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Qué Ofrecemos */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-3xl font-semibold text-gray-900">
                ¿Cómo Te Apoyamos?
              </h3>
              <ul className="mt-4 space-y-4 text-lg text-gray-700 leading-relaxed">
                <li>
                  <strong className="text-gray-900">Registro de Horas:</strong>{" "}
                  Los estudiantes, docentes y coordinadores pueden registrar fácilmente
                  sus horas VOAE a través de nuestro sistema en línea.
                </li>
                <li>
                  <strong className="text-gray-900">
                    Monitoreo y Validación:
                  </strong>{" "}
                  Proveemos herramientas para que los coordinadores puedan
                  monitorear y validar las horas registradas.
                </li>
                <li>
                  <strong className="text-gray-900">
                    Contacto VOAE:
                  </strong>{" "}
                  Los estudiantes pueden solicitar actividades del artículo 140 y 
                  VOAE recibirá dichas solicitudes instantaneamente.
                </li>
              </ul>
            </div>

            {/* Ventajas */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-3xl font-semibold text-gray-900">Beneficios Para Todos</h3>
              <ul className="mt-4 space-y-4 text-lg text-gray-700 leading-relaxed">
                <li>
                  <strong className="text-gray-900">Eficiencia:</strong>{" "}
                  Simplificamos el proceso de gestión de horas VOAE, reduciendo
                  la carga administrativa tanto para estudiantes como para docentes y
                  coordinadores.
                </li>
                <li>
                  <strong className="text-gray-900">Transparencia:</strong>{" "}
                  Aseguramos que todas las horas registradas sean verificadas y
                  aprobadas.
                </li>
                <li>
                  <strong className="text-gray-900">Accesibilidad:</strong>{" "}
                  Nuestra plataforma es accesible desde cualquier dispositivo
                  con conexión a Internet.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
