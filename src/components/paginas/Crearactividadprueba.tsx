// src/components/ActivityForm.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axiosInstance from '../../api/axiosInstance';

interface Scope {
  scope: string;
  hours: string;
}

interface ActivityFormData {
  name: string;
  description: string;
  mainCareerId: number;
  availableCareers: number[];
  startDate: string;
  endDate: string;
  goals: string;
  scopes: Scope[];
  careerTeacherId: number;
  careerStudentId: number;
  totalSpots: number;
  location: string;
  mainActivities: string[];
}

const ActivityForm: React.FC = () => {
  const [formData, setFormData] = useState<ActivityFormData>({
    name: '',
    description: '',
    mainCareerId: 0,
    availableCareers: [],
    startDate: '',
    endDate: '',
    goals: '',
    scopes: [{ scope: '', hours: '' }],
    careerTeacherId: 0,
    careerStudentId: 0,
    totalSpots: 0,
    location: '',
    mainActivities: ['']
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleScopeChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newScopes = formData.scopes.map((scope, i) => 
      i === index ? { ...scope, [name]: value } : scope
    );
    setFormData({ ...formData, scopes: newScopes });
  };

  const handleMainActivitiesChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newMainActivities = formData.mainActivities.map((activity, i) => 
      i === index ? value : activity
    );
    setFormData({ ...formData, mainActivities: newMainActivities });
  };

  const addScope = () => {
    setFormData({
      ...formData,
      scopes: [...formData.scopes, { scope: '', hours: '' }]
    });
  };

  const addMainActivity = () => {
    setFormData({
      ...formData,
      mainActivities: [...formData.mainActivities, '']
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/activities', formData);
      console.log('Activity created successfully:', response.data);
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <form className="max-w-3xl mx-auto p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Nombre
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="name" 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Descripción
        </label>
        <textarea 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mainCareerId">
          Carrera Principal ID
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="mainCareerId" 
          type="number" 
          name="mainCareerId" 
          value={formData.mainCareerId} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availableCareers">
          Carreras Disponibles (IDs separados por comas)
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="availableCareers" 
          type="text" 
          name="availableCareers" 
          value={formData.availableCareers.join(',')} 
          onChange={(e) => setFormData({ ...formData, availableCareers: e.target.value.split(',').map(Number) })} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
          Fecha de Inicio
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="startDate" 
          type="datetime-local" 
          name="startDate" 
          value={formData.startDate} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
          Fecha de Fin
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="endDate" 
          type="datetime-local" 
          name="endDate" 
          value={formData.endDate} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goals">
          Objetivos
        </label>
        <textarea 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="goals" 
          name="goals" 
          value={formData.goals} 
          onChange={handleChange} 
          required 
        />
      </div>
      {formData.scopes.map((scope, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ámbito {index + 1}
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" 
            type="number" 
            name="scope" 
            value={scope.scope} 
            onChange={(e) => handleScopeChange(index, e)} 
            placeholder="Ámbito" 
            required 
          />
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="number" 
            name="hours" 
            value={scope.hours} 
            onChange={(e) => handleScopeChange(index, e)} 
            placeholder="Horas" 
            required 
          />
        </div>
      ))}
      <button 
        type="button" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" 
        onClick={addScope}
      >
        Agregar Ámbito
      </button>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="careerTeacherId">
          Coordinador ID
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="careerTeacherId" 
          type="number" 
          name="careerTeacherId" 
          value={formData.careerTeacherId} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="careerStudentId">
          Estudiante ID
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="careerStudentId" 
          type="number" 
          name="careerStudentId" 
          value={formData.careerStudentId} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalSpots">
          Cupos
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="totalSpots" 
          type="number" 
          name="totalSpots" 
          value={formData.totalSpots} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
          Ubicación
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="location" 
          type="text" 
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
          required 
        />
      </div>
      {formData.mainActivities.map((activity, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Actividad Principal {index + 1}
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            value={activity} 
            onChange={(e) => handleMainActivitiesChange(index, e)} 
            required 
          />
        </div>
      ))}
      <button 
        type="button" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" 
        onClick={addMainActivity}
      >
        Agregar Actividad Principal
      </button>
      <div className="mb-4">
        <button 
          type="submit" 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear Actividad
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;
