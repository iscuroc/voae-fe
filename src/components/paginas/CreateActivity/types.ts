export type CreateActivityFormValues = {
  name: string;
  description: string;
  foreignCareersIds: number[];
  startDate: string;
  endDate: string;
  goals: Goal[];
  totalSpots: number;
  location: string;
  mainActivities: MainActivity[];
  scopes: Scope[];
  careerId: number[];
  organizationId: number[];
  supervisorId: OrganizerId;
  coordinatorId: OrganizerId;
};

export type OrganizerId = {
  label: string;
  value: number;
  key: number;
  title: string;
};

export type Goal = {
  goal: string;
};

export type MainActivity = {
  activity: string;
};

export type Scope = {
  scope: number;
  hours: number;
};
