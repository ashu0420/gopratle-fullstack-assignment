"use client";

import type { PlannerDetails } from "@/types/requirement";

interface PlannerFieldsProps {
    data: PlannerDetails;
    onChange: (data: PlannerDetails) => void;
}

export default function PlannerFields({
    data,
    onChange,
}: PlannerFieldsProps) {
    const updateField = (
        field: keyof PlannerDetails,
        value: string
    ) => {
        onChange({
            ...data,
            [field]: value,
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold">
                    Event Planner Requirements
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Tell us what kind of planning support you need.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="services"
                        className="mb-1 block text-sm font-medium"
                    >
                        Planning Services
                    </label>

                    <textarea
                        id="services"
                        value={data.services}
                        onChange={(e) =>
                            updateField("services", e.target.value)
                        }
                        placeholder="e.g. Full event planning, vendor coordination..."
                        rows={3}
                        className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="guestCount"
                            className="mb-1 block text-sm font-medium"
                        >
                            Expected Guests
                        </label>

                        <input
                            id="guestCount"
                            type="number"
                            min="1"
                            value={data.guestCount}
                            onChange={(e) =>
                                updateField("guestCount", e.target.value)
                            }
                            placeholder="e.g. 200"
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="budget"
                            className="mb-1 block text-sm font-medium"
                        >
                            Budget
                        </label>

                        <input
                            id="budget"
                            type="text"
                            value={data.budget}
                            onChange={(e) =>
                                updateField("budget", e.target.value)
                            }
                            placeholder="e.g. ₹2,00,000"
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="planningStage"
                        className="mb-1 block text-sm font-medium"
                    >
                        Planning Stage
                    </label>

                    <select
                        id="planningStage"
                        value={data.planningStage}
                        onChange={(e) =>
                            updateField("planningStage", e.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-2.5"
                    >
                        <option value="">Select stage</option>
                        <option value="just-starting">Just Starting</option>
                        <option value="in-progress">Already Planning</option>
                        <option value="near-complete">
                            Mostly Planned
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="theme"
                        className="mb-1 block text-sm font-medium"
                    >
                        Theme / Vision
                    </label>

                    <textarea
                        id="theme"
                        value={data.theme}
                        onChange={(e) =>
                            updateField("theme", e.target.value)
                        }
                        placeholder="Describe your preferred theme or overall vision..."
                        rows={3}
                        className="w-full rounded-lg border px-4 py-2.5"
                    />
                </div>

                <div>
                    <label
                        htmlFor="specialRequirements"
                        className="mb-1 block text-sm font-medium"
                    >
                        Special Requirements
                    </label>

                    <textarea
                        id="specialRequirements"
                        value={data.specialRequirements}
                        onChange={(e) =>
                            updateField(
                                "specialRequirements",
                                e.target.value
                            )
                        }
                        placeholder="Any specific requirements..."
                        rows={3}
                        className="w-full rounded-lg border px-4 py-2.5"
                    />
                </div>

                <div>
                    <label
                        htmlFor="notes"
                        className="mb-1 block text-sm font-medium"
                    >
                        Additional Notes
                    </label>

                    <textarea
                        id="notes"
                        value={data.notes}
                        onChange={(e) =>
                            updateField("notes", e.target.value)
                        }
                        placeholder="Anything else we should know?"
                        rows={3}
                        className="w-full rounded-lg border px-4 py-2.5"
                    />
                </div>
            </div>
        </div>
    );
}