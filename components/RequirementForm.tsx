"use client";

import { useState } from "react";

import EventBasics from "./requirement-form/EventBasics";
import PlannerFields from "./requirement-form/PlannerFields";
import PerformerFields from "./requirement-form/PerformerFields";
import CrewFields from "./requirement-form/CrewFields";

import type {
    Category,
    CrewDetails,
    EventBasics as EventBasicsData,
    PerformerDetails,
    PlannerDetails,
} from "@/types/requirement";

const initialEventBasics: EventBasicsData = {
    eventName: "",
    eventType: "",
    startDate: "",
    endDate: "",
    location: "",
    venue: "",
    category: "",
  };

const initialPlannerDetails: PlannerDetails = {
    services: "",
    guestCount: "",
    budget: "",
    planningStage: "",
    theme: "",
    specialRequirements: "",
    notes: "",
};

const initialPerformerDetails: PerformerDetails = {
    performanceType: "",
    genre: "",
    performerCount: "",
    duration: "",
    budget: "",
    soundSystem: false,
    lighting: false,
    stage: false,
    specialRequirements: "",
};

const initialCrewDetails: CrewDetails = {
    role: "",
    numberRequired: "",
    experienceLevel: "",
    duration: "",
    budget: "",
    responsibilities: "",
    equipmentRequired: "",
    specialRequirements: "",
    notes: "",
};

export default function RequirementForm() {
    const [step, setStep] = useState(1);

    const [eventBasics, setEventBasics] =
        useState<EventBasicsData>(initialEventBasics);

    const [plannerDetails, setPlannerDetails] =
        useState<PlannerDetails>(initialPlannerDetails);

    const [performerDetails, setPerformerDetails] =
        useState<PerformerDetails>(initialPerformerDetails);

    const [crewDetails, setCrewDetails] =
        useState<CrewDetails>(initialCrewDetails);

    const handleNext = () => {
        setStep((currentStep) => Math.min(4, currentStep + 1));
    };

    const handleBack = () => {
        setStep((currentStep) => Math.max(1, currentStep - 1));
    };

    const renderCategoryFields = (currentStep: 2 | 3) => {
        switch (eventBasics.category) {
            case "planner":
                return (
                    <PlannerFields
                        step={currentStep}
                        data={plannerDetails}
                        onChange={setPlannerDetails}
                    />
                );

            case "performer":
                return (
                    <PerformerFields
                        step={currentStep}
                        data={performerDetails}
                        onChange={setPerformerDetails}
                    />
                );

            case "crew":
                return (
                    <CrewFields
                        step={currentStep}
                        data={crewDetails}
                        onChange={setCrewDetails}
                    />
                );

            default:
                return null;
        }
      };
    return (
        <div className="mx-auto w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-sm">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                        Step {step} of 4
                    </span>

                    <span className="text-gray-500">
                        {Math.round((step / 4) * 100)}%
                    </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                        className="h-full rounded-full bg-black transition-all"
                        style={{
                            width: `${(step / 4) * 100}%`,
                        }}
                    />
                </div>
            </div>

            {/* Step 1 */}
            {step === 1 && (
                <>
                    <EventBasics
                        data={eventBasics}
                        onChange={setEventBasics}
                    />

                    <div className="mt-8 flex justify-end">
                        <button
                            type="button"
                            onClick={handleNext}
                            className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            Continue
                        </button>
                    </div>
                </>
            )}

            {/* Step 2 */}
            {step === 2 && (
                <>
                    {renderCategoryFields(2)}

                    <div className="mt-8 flex justify-between">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="rounded-lg border px-6 py-2.5 text-sm font-medium transition hover:bg-gray-50"
                        >
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            Continue
                        </button>
                    </div>
                </>
            )}

            {/* Step 3 */}
            {step === 3 && (
                <>
                    {renderCategoryFields(3)}

                    <div className="mt-8 flex justify-between">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="rounded-lg border px-6 py-2.5 text-sm font-medium transition hover:bg-gray-50"
                        >
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            Review Requirement
                        </button>
                    </div>
                </>
            )}

            {/* Step 4 */}
            {step === 4 && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Review & Submit
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Review your requirement before submitting.
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <h3 className="mb-3 font-medium">
                            Event Details
                        </h3>

                        <pre className="overflow-auto text-sm">
                            {JSON.stringify(
                                {
                                    ...eventBasics,
                                    details:
                                        eventBasics.category === "planner"
                                            ? plannerDetails
                                            : eventBasics.category === "performer"
                                                ? performerDetails
                                                : crewDetails,
                                },
                                null,
                                2
                            )}
                        </pre>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="rounded-lg border px-6 py-2.5 text-sm font-medium transition hover:bg-gray-50"
                        >
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                console.log("Requirement submitted");
                            }}
                            className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            Submit Requirement
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function getCategoryLabel(category: Category) {
    const labels: Record<Category, string> = {
        planner: "Event Planner",
        performer: "Performer",
        crew: "Crew",
    };

    return labels[category];
}