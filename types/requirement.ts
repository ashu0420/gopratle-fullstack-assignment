export type Category = "planner" | "performer" | "crew";

export type EventType =
    | "wedding"
    | "corporate"
    | "concert"
    | "private"
    | "other";

export interface EventBasics {
    eventName: string;
    eventType: EventType;
    startDate: string;
    endDate: string;
    location: string;
    venue: string;
    category: Category;
}

export interface PlannerDetails {
    services: string;
    guestCount: string;
    budget: string;
    planningStage: string;
    theme: string;
    specialRequirements: string;
    notes: string;
}

export interface PerformerDetails {
    performanceType: string;
    genre: string;
    performerCount: string;
    duration: string;
    budget: string;
    soundSystem: boolean;
    lighting: boolean;
    stage: boolean;
    specialRequirements: string;
}

export interface CrewDetails {
    role: string;
    numberRequired: string;
    experienceLevel: string;
    duration: string;
    budget: string;
    responsibilities: string;
    equipmentRequired: string;
    specialRequirements: string;
    notes: string;
}

export interface RequirementFormData extends EventBasics {
    details:
    | PlannerDetails
    | PerformerDetails
    | CrewDetails;
}