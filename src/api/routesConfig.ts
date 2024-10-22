// rutas de dashboard Estudiantes
export const estudianteRoutes = {
  "Mis Horas VOAE": "/mis-actividades",
  "Actividades Disponibles": "/actividades-en-curso",
  "Actividades Solicitadas": "/actividades-solicitadas",
  "Crear Actividad": "/crear-actividad",
  // "Mis Certificados": "/dashboard-estudiante/mis-certificados",
} as const;

export type EstudianteRouteKeys = keyof typeof estudianteRoutes;

// routesConfig.ts
export const coordinadorRoutes = {
  "Crear Actividad": "/crear-actividad",
  "Actividades Disponibles": "/actividades-en-curso",
  "Gestion de Actividades": "/gestion-actividad",
  // "Horas por Estudiante": "/dashboard-coordinador/horas-estudiantes",
  "Actividades Solicitadas": "/actividades-solicitadas",
} as const;

export type CoordinadorRouteKeys = keyof typeof coordinadorRoutes;

// rutas de dashboard VOAE
export const voaeRoutes = {
  "Gestion de Solicitudes": "/gestionar-solicitud",
  Actividades: "/gestion-actividad",
  "Actividades Disponibles": "/actividades-en-curso",
  "Crear Actividad": "/crear-actividad",
  "Actividades Solicitadas": "/actividades-solicitadas",
} as const;

export type VoaeRouteKeys = keyof typeof voaeRoutes;
