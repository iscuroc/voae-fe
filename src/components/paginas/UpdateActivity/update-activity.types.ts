import {
  Goal,
  MainActivity,
  OrganizerId,
  Scope,
} from "../CreateActivity/types";

export type UpdateActivityFormValues = {
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
