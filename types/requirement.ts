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

export interface RequirementFormData extends EventBasics {
    details: Record<string, unknown>;
}