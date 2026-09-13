"use client";

import { useState } from "react";
import EventBasics from "./requirement-form/EventBasics";
import type {
    Category,
    EventBasics as EventBasicsData,
} from "@/types/requirement";

const initialEventBasics: EventBasicsData = {
    eventName: "",
    eventType: "other",
    startDate: "",
    endDate: "",
    location: "",
    venue: "",
    category: "planner",
};

export default function RequirementForm() {
    const [step, setStep] = useState(1);
    const [eventBasics, setEventBasics] =
        useState<EventBasicsData>(initialEventBasics);

    const handleNext = () => {
        setStep((currentStep) => currentStep + 1);
    };

    const handleBack = () => {
        setStep((currentStep) => Math.max(1, currentStep - 1));
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

            {/* Temporary Step 2 */}
            {step === 2 && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Category Details
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            We&apos;ll add{" "}
                            <span className="font-medium">
                                {getCategoryLabel(eventBasics.category)}
                            </span>{" "}
                            specific fields here.
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4 text-sm">
                        Selected category:{" "}
                        <strong>
                            {getCategoryLabel(eventBasics.category)}
                        </strong>
                    </div>

                    <NavigationButtons
                        onBack={handleBack}
                        onNext={handleNext}
                    />
                </div>
            )}

            {/* Temporary Step 3 */}
            {step === 3 && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Additional Details
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Category-specific additional requirements will
                            go here.
                        </p>
                    </div>

                    <NavigationButtons
                        onBack={handleBack}
                        onNext={handleNext}
                    />
                </div>
            )}

            {/* Temporary Step 4 */}
            {step === 4 && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Review & Submit
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Review your event requirement before submitting.
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <pre className="overflow-auto text-sm">
                            {JSON.stringify(eventBasics, null, 2)}
                        </pre>
                    </div>

                    <NavigationButtons
                        onBack={handleBack}
                        onNext={() => {
                            console.log("Submit:", eventBasics);
                        }}
                        nextLabel="Submit Requirement"
                    />
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

interface NavigationButtonsProps {
    onBack: () => void;
    onNext: () => void;
    nextLabel?: string;
}

function NavigationButtons({
    onBack,
    onNext,
    nextLabel = "Continue",
}: NavigationButtonsProps) {
    return (
        <div className="flex justify-between">
            <button
                type="button"
                onClick={onBack}
                className="rounded-lg border px-6 py-2.5 text-sm font-medium transition hover:bg-gray-50"
            >
                Back
            </button>

            <button
                type="button"
                onClick={onNext}
                className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
                {nextLabel}
            </button>
        </div>
    );
}