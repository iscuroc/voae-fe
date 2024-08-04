import React, { useState } from 'react';
import { crearActividad, Actividad } from '../../servicios/actividadservice';

const CrearActividad = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mainCareerId: '',
    availableCareers: [] as number[][], 
    startDate: '',
    endDate: '',
    goals: '',
    scopes: [{ scope: '', hours: '' }, { scope: '', hours: '' }],
    location: '',
    mainActivities: [''],
    careerTeacherId: '',
    careerStudentId: '',
    totalSpots: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleCareerChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value, 10));
    const newAvailableCareers = [...formData.availableCareers];
    newAvailableCareers[index] = selectedOptions; 
    setFormData(prevState => ({
      ...prevState,
      availableCareers: newAvailableCareers,
    }));
  };

  const handleScopeChange = (index: number, e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    const newScopes = [...formData.scopes];
    newScopes[index] = { ...newScopes[index], [id]: value };
    setFormData(prevState => ({ ...prevState, scopes: newScopes }));
  };

  const handleAddActivity = () => {
    setFormData(prevState => ({
      ...prevState,
      mainActivities: [...prevState.mainActivities, '']
    }));
  };

  const handleActivityChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newActivities = [...formData.mainActivities];
    newActivities[index] = value;
    setFormData(prevState => ({ ...prevState, mainActivities: newActivities }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const actividad: Actividad = {
      name: formData.name,
      description: formData.description,
      mainCareerId: parseInt(formData.mainCareerId, 10) || 0,
      availableCareers: formData.availableCareers.flat(), 
      startDate: formData.startDate,
      endDate: formData.endDate,
      goals: formData.goals,
      scopes: formData.scopes.map(scope => ({
        scope: parseInt(scope.scope, 10) || 0,
        hours: parseInt(scope.hours, 10) || 0
      })),
      careerTeacherId: parseInt(formData.careerTeacherId, 10) || 0,
      careerStudentId: parseInt(formData.careerStudentId, 10) || 0,
      totalSpots: parseInt(formData.totalSpots, 10) || 0,
      location: formData.location,
      mainActivities: formData.mainActivities.filter(activity => activity.trim() !== ''),
    };

    try {
      const result = await crearActividad(actividad);
      console.log('Activity created:', result);

      setFormData({
        name: '',
        description: '',
        mainCareerId: '',
        availableCareers: [],
        startDate: '',
        endDate: '',
        goals: '',
        scopes: [{ scope: '', hours: '' }],
        location: '',
        mainActivities: [''],
        careerTeacherId: '',
        careerStudentId: '',
        totalSpots: '',
      });
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold mb-6">Formulario Crear Actividad</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Nombre Actividad:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-1">Descripción:</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              rows={4}
              required
            />
          </div>

          {/* Main Career */}
          <div>
            <label htmlFor="mainCareerId" className="block text-sm font-semibold mb-1">Carrera Principal:</label>
            <select
              id="mainCareerId"
              value={formData.mainCareerId}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="1">Carrera 1</option>
              <option value="2">Carrera 2</option>
              <option value="3">Carrera 3</option>
              <option value="4">Carrera 4</option>
            </select>
          </div>

          {/* Available Careers */}
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <label htmlFor={`availableCareers-${index}`} className="block text-sm font-semibold mb-1">Carreras Participantes {index + 1}:</label>
              <select
                id={`availableCareers-${index}`}
                multiple
                value={formData.availableCareers[index]?.map(String) || []} // Convierte los números a cadenas
                onChange={(e) => handleCareerChange(e, index)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                required
              >

               <option value="">Selecciona una opción</option>
              <option value="1">Carrera 1</option>
              <option value="2">Carrera 2</option>
              <option value="3">Carrera 3</option>
              <option value="4">Carrera 4</option>
              </select>
            </div>
          ))}

          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-semibold mb-1">Fecha Inicio</label>
            <input
              type="datetime-local"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-semibold mb-1">Fecha Final</label>
            <input
              type="datetime-local"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          {/* Goals */}
          <div>
            <label htmlFor="goals" className="block text-sm font-semibold mb-1">Metas:</label>
            <textarea
              id="goals"
              value={formData.goals}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              rows={3}
              required
            />
          </div>

          {/* Scopes */}
          <div>
            <label className="block text-sm font-semibold mb-1">Ambito:</label>
            {formData.scopes.map((scope, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                <select
                  id="scope"
                  value={scope.scope}
                  onChange={e => handleScopeChange(index, e)}
                  className="shadow border rounded w-1/2 py-2 px-3 text-gray-700"
                  required
                >
                   <option value="">Selecciona una opción</option>
                  <option value="0">Social</option>
                  <option value="1">Cultural</option>
                  <option value="2">Sports</option>
                  <option value="3">Scientific</option>
                </select>
                <input
                  type="number"
                  id="hours"
                  value={scope.hours}
                  onChange={e => handleScopeChange(index, e)}
                  className="shadow border rounded w-1/2 py-2 px-3 text-gray-700"
                  min={0}
                  required
                />
              </div>
            ))}
          </div>
        

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold mb-1">Ubicación:</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          {/* Main Activities */}
          <div>
            <label className="block text-sm font-semibold mb-1">Actividades Principales:</label>
            {formData.mainActivities.map((activity, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                <input
                  type="text"
                  value={activity}
                  onChange={e => handleActivityChange(index, e)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  placeholder={`Actividad ${index + 1}`}
                  required
                />
                {formData.mainActivities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setFormData(prevState => ({
                      ...prevState,
                      mainActivities: prevState.mainActivities.filter((_, i) => i !== index),
                    }))}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddActivity}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Agregar Actividad
            </button>
          </div>

          {/* Teacher Career ID */}
            <label htmlFor="careerTeacherId" className="block text-sm font-semibold mb-1">Docente de Carrera:</label>
          <div>
            <input
              type="number"
              id="careerTeacherId"
              value={formData.careerTeacherId}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              min={0}
              required
            />
          </div>

          {/* Student Career ID */}
          <div>
            <label htmlFor="careerStudentId" className="block text-sm font-semibold mb-1">Estudiante Carrera:</label>
            <input
              type="number"
              id="careerStudentId"
              value={formData.careerStudentId}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              min={0}
              required
            />
          </div>

          {/* Total Spots */}
          <div>
            <label htmlFor="totalSpots" className="block text-sm font-semibold mb-1">Total Horas:</label>
            <input
              type="number"
              id="totalSpots"
              value={formData.totalSpots}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              min={0}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
             Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearActividad;
