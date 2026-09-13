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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const [eventBasics, setEventBasics] =
        useState<EventBasicsData>(initialEventBasics);

    const [plannerDetails, setPlannerDetails] =
        useState<PlannerDetails>(initialPlannerDetails);

    const [performerDetails, setPerformerDetails] =
        useState<PerformerDetails>(initialPerformerDetails);

    const [crewDetails, setCrewDetails] =
        useState<CrewDetails>(initialCrewDetails);
    const validateStep1 = () => {
        if (!eventBasics.eventName.trim()) {
            return "Please enter an event name.";
        }

        if (!eventBasics.eventType) {
            return "Please select an event type.";
        }

        if (!eventBasics.startDate) {
            return "Please select a start date.";
        }

        if (!eventBasics.endDate) {
            return "Please select an end date.";
        }

        if (
            new Date(eventBasics.endDate) <
            new Date(eventBasics.startDate)
        ) {
            return "End date cannot be before the start date.";
        }

        if (!eventBasics.location.trim()) {
            return "Please enter the event location.";
        }

        if (!eventBasics.category) {
            return "Please select what you need.";
        }

        return null;
    };
    const handleNext = () => {
        if (step === 1) {
            const error = validateStep1();

            if (error) {
                alert(error);
                return;
            }
        }

        if (step === 2 || step === 3) {
            const error = validateCategoryDetails();

            if (error) {
                alert(error);
                return;
            }
        }

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
    const validateCategoryDetails = () => {
        if (eventBasics.category === "planner") {
            if (!plannerDetails.services.trim()) {
                return "Please describe the planning services you need.";
            }

            if (!plannerDetails.guestCount) {
                return "Please enter the expected guest count.";
            }

            if (!plannerDetails.budget.trim()) {
                return "Please enter your budget.";
            }

            if (!plannerDetails.planningStage) {
                return "Please select your planning stage.";
            }
        }

        if (eventBasics.category === "performer") {
            if (!performerDetails.performanceType) {
                return "Please select a performance type.";
            }

            if (!performerDetails.genre.trim()) {
                return "Please enter the genre or style.";
            }

            if (!performerDetails.performerCount) {
                return "Please enter the number of performers.";
            }

            if (!performerDetails.duration.trim()) {
                return "Please enter the performance duration.";
            }

            if (!performerDetails.budget.trim()) {
                return "Please enter your budget.";
            }
        }

        if (eventBasics.category === "crew") {
            if (!crewDetails.role.trim()) {
                return "Please enter the crew role.";
            }

            if (!crewDetails.numberRequired) {
                return "Please enter the number of crew members required.";
            }

            if (!crewDetails.experienceLevel) {
                return "Please select the experience level.";
            }

            if (!crewDetails.duration.trim()) {
                return "Please enter the work duration.";
            }

            if (!crewDetails.budget.trim()) {
                return "Please enter your budget.";
            }
        }

        return null;
    };
    const getSubmissionData = () => {
        if (!eventBasics.category) {
            return null;
        }

        const details =
            eventBasics.category === "planner"
                ? plannerDetails
                : eventBasics.category === "performer"
                    ? performerDetails
                    : crewDetails;

        return {
            ...eventBasics,
            category: eventBasics.category,
            details,
        };
    };
    const handleSubmit = async () => {
        const submissionData = getSubmissionData();

        if (!submissionData) {
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitMessage("");

            const response = await fetch(
                "http://localhost:5000/api/requirements",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(submissionData),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to submit requirement."
                );
            }

            setSubmitMessage(
                "Requirement submitted successfully!"
            );

            console.log("Backend response:", result);
        } catch (error) {
            console.error("Submission error:", error);

            setSubmitMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while submitting."
            );
        } finally {
            setIsSubmitting(false);
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

                        <div className="mt-6 space-y-6">
                            <div className="rounded-lg bg-gray-50 p-5">
                                <h3 className="text-lg font-semibold">Event Details</h3>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    <div>
                                        <p className="text-sm text-gray-500">Event Name</p>
                                        <p className="font-medium">{eventBasics.eventName}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Event Type</p>
                                        <p className="font-medium capitalize">
                                            {eventBasics.eventType}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">
                                            {eventBasics.startDate === eventBasics.endDate
                                                ? eventBasics.startDate
                                                : `${eventBasics.startDate} – ${eventBasics.endDate}`}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium">{eventBasics.location}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Venue</p>
                                        <p className="font-medium">
                                            {eventBasics.venue || "Not specified"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Category</p>
                                        <p className="font-medium">
                                            {eventBasics.category
                                                ? getCategoryLabel(eventBasics.category)
                                                : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {eventBasics.category === "planner" && (
                                <div className="rounded-lg bg-gray-50 p-5">
                                    <h3 className="text-lg font-semibold">Planner Requirements</h3>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Services</p>
                                            <p className="font-medium">{plannerDetails.services}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Guest Count</p>
                                            <p className="font-medium">{plannerDetails.guestCount}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Budget</p>
                                            <p className="font-medium">₹{plannerDetails.budget}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Planning Stage</p>
                                            <p className="font-medium capitalize">
                                                {plannerDetails.planningStage.replace("-", " ")}
                                            </p>
                                        </div>

                                        {plannerDetails.theme && (
                                            <div>
                                                <p className="text-sm text-gray-500">Theme</p>
                                                <p className="font-medium">{plannerDetails.theme}</p>
                                            </div>
                                        )}

                                        {plannerDetails.specialRequirements && (
                                            <div className="sm:col-span-2">
                                                <p className="text-sm text-gray-500">
                                                    Special Requirements
                                                </p>
                                                <p className="font-medium">
                                                    {plannerDetails.specialRequirements}
                                                </p>
                                            </div>
                                        )}

                                        {plannerDetails.notes && (
                                            <div className="sm:col-span-2">
                                                <p className="text-sm text-gray-500">Notes</p>
                                                <p className="font-medium">{plannerDetails.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {eventBasics.category === "performer" && (
                                <div className="rounded-lg bg-gray-50 p-5">
                                    <h3 className="text-lg font-semibold">Performer Requirements</h3>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Performance Type</p>
                                            <p className="font-medium">
                                                {performerDetails.performanceType}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Genre</p>
                                            <p className="font-medium">{performerDetails.genre}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Performers</p>
                                            <p className="font-medium">
                                                {performerDetails.performerCount}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Duration</p>
                                            <p className="font-medium">{performerDetails.duration}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Budget</p>
                                            <p className="font-medium">₹{performerDetails.budget}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Equipment</p>
                                            <p className="font-medium">
                                                {[
                                                    performerDetails.soundSystem && "Sound System",
                                                    performerDetails.lighting && "Lighting",
                                                    performerDetails.stage && "Stage",
                                                ]
                                                    .filter(Boolean)
                                                    .join(", ") || "None specified"}
                                            </p>
                                        </div>

                                        {performerDetails.specialRequirements && (
                                            <div className="sm:col-span-2">
                                                <p className="text-sm text-gray-500">
                                                    Special Requirements
                                                </p>
                                                <p className="font-medium">
                                                    {performerDetails.specialRequirements}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {eventBasics.category === "crew" && (
                                <div className="rounded-lg bg-gray-50 p-5">
                                    <h3 className="text-lg font-semibold">Crew Requirements</h3>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Role</p>
                                            <p className="font-medium">{crewDetails.role}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Number Required</p>
                                            <p className="font-medium">{crewDetails.numberRequired}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Experience Level</p>
                                            <p className="font-medium">
                                                {crewDetails.experienceLevel}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Duration</p>
                                            <p className="font-medium">{crewDetails.duration}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Budget</p>
                                            <p className="font-medium">₹{crewDetails.budget}</p>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-500">Responsibilities</p>
                                            <p className="font-medium">
                                                {crewDetails.responsibilities}
                                            </p>
                                        </div>

                                        {crewDetails.equipmentRequired && (
                                            <div className="sm:col-span-2">
                                                <p className="text-sm text-gray-500">
                                                    Equipment Required
                                                </p>
                                                <p className="font-medium">
                                                    {crewDetails.equipmentRequired}
                                                </p>
                                            </div>
                                        )}

                                        {crewDetails.specialRequirements && (
                                            <div className="sm:col-span-2">
                                                <p className="text-sm text-gray-500">
                                                    Special Requirements
                                                </p>
                                                <p className="font-medium">
                                                    {crewDetails.specialRequirements}
                                                </p>
                                            </div>
                                        )}

                                        {crewDetails.notes && (
                                            <div className="sm:col-span-2">
                                                <p className="text-sm text-gray-500">Notes</p>
                                                <p className="font-medium">{crewDetails.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
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
                            onClick={handleSubmit}
                            className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            Submit Requirement
                        </button>
                        {submitMessage && (
                            <p className="mt-4 text-sm font-medium">
                                {submitMessage}
                            </p>
                        )}
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