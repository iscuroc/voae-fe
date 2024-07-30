// rutas de dashboard Estudiantes
export const estudianteRoutes = {
    "Mis Actividades": "/dashboard-estudiante/mis-actividades",
    "Actividades en Curso": "/dashboard-estudiante/actividades-en-curso",
    "Actividades Solicitadas": "/dashboard-estudiante/actividades-solicitadas",
    "Actividades Finalizadas": "/dashboard-estudiante/act-finalizadas",
    "Crear Actividad": "/dashboard-estudiante/crear-actividad",
    "Novedades": "#",
    "Mis Horas VOAE": "/dashboard-estudiante/mis-horas-voae",
    "Mis Certificados": "#",
  } as const;
  
  export type EstudianteRouteKeys = keyof typeof estudianteRoutes;

// routesConfig.ts
export const coordinadorRoutes = {
  "Crear Actividad": "/dashboard-coordinador/crear-actividad",
  "Actividades en Curso": "/dashboard-coordinador/actividad-en-curso",
  "Actividades Finalizadas": "/dashboard-coordinador/act-finalizadas",
  "Gestion de Actividades": "/dashboard-coordinador/gestion-actividad",
  "Novedades": "#",
  "Horas por Estudiante": "/dashboard-coordinador/horas-voae",
} as const;

export type CoordinadorRouteKeys = keyof typeof coordinadorRoutes;

// rutas de dashboard VOAE
export const voaeRoutes = {
  "Gestion de Solicitudes": "/dashboard-voae/gestionar-solicitud",
  "Gestion de Actividades": "/dashboard-voae/gestion-actividad",
  "Actividades en Curso": "/dashboard-voae/actividad-en-curso",
  "Actividades Finalizadas": "/dashboard-voae/act-finalizadas",
  "Crear Actividad": "/dashboard-voae/crear-actividad",
  "Novedades": "/dashboard-voae/novedades-admin",
  "Horas por Usuario": "/dashboard-voae/horas-voae",
   // Agrega más rutas según sea necesario
} as const;

export type VoaeRouteKeys = keyof typeof voaeRoutes;
