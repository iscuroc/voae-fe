import React, { useState } from 'react';

function CrearActividad() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [carrera, setCarrera] = useState('');
  const [inicio, setInicio] = useState('');
  const [fechaFinalizacion, setFechaFinalizacion] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [ambito, setAmbito] = useState('');
  const [coordinador, setCoordinador] = useState('');
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [horasSociales, setHorasSociales] = useState('');
  const [horasArt, setHorasArt] = useState('');
  const [cupos, setCupos] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Solicitud enviada:', { 
      nombre, descripcion, carrera, inicio, fechaFinalizacion, 
      objetivos, ambito, coordinador, nombreEstudiante, 
      horasSociales, horasArt, cupos, observaciones 
    });
    
    
    // Limpiar los campos después del envío
    setNombre('');
    setDescripcion('');
    setCarrera('');
    setInicio('');
    setFechaFinalizacion('');
    setObjetivos('');
    setAmbito('');
    setCoordinador('');
    setNombreEstudiante('');
    setHorasSociales('');
    setHorasArt('');
    setCupos('');
    setObservaciones('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-2xl font-bold mb-4">Formulario de Solicitud para Estudiantes</h1>
        <div className="bg-yellow-500 shadow-lg rounded-lg flex overflow-hidden mb-4">
          <div className="w-1/3 bg-blue-900 p-6 rounded-l-lg flex flex-col items-center">
            <label className="block text-white text-sm font-bold mb-[2.5rem]" htmlFor="nombre">
              Nombre de la actividad:
            </label>
            <label className="block text-white text-sm font-bold mb-[7rem]" htmlFor="descripcion">
              Descripción:
            </label>
            <label className="block text-white text-sm font-bold mb-[3.3rem]" htmlFor="carrera">
              Carrera:
            </label>
            <label className="block text-white text-sm font-bold mb-[2rem]" htmlFor="inicio">
              Inicio:
            </label>
            <label className="block text-white text-sm font-bold mb-[2rem]" htmlFor="fechaFinalizacion">
              Fecha de Finalización:
            </label>
            <label className="block text-white text-sm font-bold mb-[5rem]" htmlFor="objetivos">
              Objetivos:
            </label>
            <label className="block text-white text-sm font-bold mb-[2rem]" htmlFor="ambito">
              Ámbito:
            </label>
            <label className="block text-white text-sm font-bold mb-[2.5rem]" htmlFor="coordinador">
              Coordinador:
            </label>
            <label className="block text-white text-sm font-bold mb-[2rem]" htmlFor="nombreEstudiante">
              Nombre Estudiante:
            </label>
            <label className="block text-white text-sm font-bold mb-[2rem]" htmlFor="horasSociales">
              Horas Sociales becados:
            </label>
            <label className="block text-white text-sm font-bold mb-[2rem]" htmlFor="horasArt">
              Horas Art.140:
            </label>
            <label className="block text-white text-sm font-bold mb-[2rem]" htmlFor="cupos">
              Cupos:
            </label>
            <label className="block text-white text-sm font-bold mt-3" htmlFor="observaciones">
              Observaciones:
            </label>
          </div>
          <div className="w-2/3 p-6">
            <form onSubmit={handleSubmit} className="space-y-4" id="solicitudForm">
              <div className="mb-5">
                <input
                  type="text"
                  placeholder='Ingrese un nombre'
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">
                <textarea
                  placeholder='Ingrese una descripción'
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="5"
                  required
                />
              </div>
              <div className="mb-5">
                <select
                  id="carrera"
                  value={carrera}
                  onChange={(e) => setCarrera(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Selecciona una carrera</option>
                  <option value="Carrera 1">Carrera 1</option>
                  <option value="Carrera 2">Carrera 2</option>
                  <option value="Carrera 3">Carrera 3</option>
                  <option value="Carrera 4">Carrera 4</option>
                  <option value="Carrera 5">Carrera 5</option>
                </select>
              </div>
              <div className="mb-5">
                <input
                  type="date"
                  id="inicio"
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="date"
                  id="fechaFinalizacion"
                  value={fechaFinalizacion}
                  onChange={(e) => setFechaFinalizacion(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">
                <textarea
                  placeholder='Ingrese los objetivos'
                  id="objetivos"
                  value={objetivos}
                  onChange={(e) => setObjetivos(e.target.value)}
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder='Ingrese el ámbito'
                  id="ambito"
                  value={ambito}
                  onChange={(e) => setAmbito(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder='Ingrese el coordinador'
                  id="coordinador"
                  value={coordinador}
                  onChange={(e) => setCoordinador(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder='Ingrese el nombre del estudiante'
                  id="nombreEstudiante"
                  value={nombreEstudiante}
                  onChange={(e) => setNombreEstudiante(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="number"
                  placeholder='Ingrese las horas sociales becados'
                  id="horasSociales"
                  value={horasSociales}
                  onChange={(e) => setHorasSociales(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">
                <select
                  id="horasArt"
                  value={horasArt}
                  onChange={(e) => setHorasArt(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Selecciona las horas Art.140</option>
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <input
                  type="number"
                  placeholder='Ingrese los cupos'
                  id="cupos"
                  value={cupos}
                  onChange={(e) => setCupos(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">
                <textarea
                  placeholder='Ingrese las observaciones'
                  id="observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                  required
                />
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            form="solicitudForm"
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar Solicitud
          </button>
        </div>
      </div>
    </div>
  );
}

export default CrearActividad;
