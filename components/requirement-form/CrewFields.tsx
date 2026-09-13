"use client";

import type { CrewDetails } from "@/types/requirement";

interface CrewFieldsProps {
    step: 2 | 3;
    data: CrewDetails;
    onChange: (data: CrewDetails) => void;
}

export default function CrewFields({
    step,
    data,
    onChange,
}: CrewFieldsProps) {
    const updateField = (
        field: keyof CrewDetails,
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
                    {step === 2
                        ? "Crew Requirements"
                        : "Additional Crew Details"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    {step === 2
                        ? "Tell us about the crew you need."
                        : "Provide additional information about the work."}
                </p>
            </div>

            {step === 2 && (
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="crewRole"
                            className="mb-1 block text-sm font-medium"
                        >
                            Crew Role
                        </label>

                        <input
                            id="crewRole"
                            type="text"
                            value={data.role}
                            onChange={(e) =>
                                updateField("role", e.target.value)
                            }
                            placeholder="e.g. Sound Engineer, Stage Manager"
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="numberRequired"
                                className="mb-1 block text-sm font-medium"
                            >
                                Number Required
                            </label>

                            <input
                                id="numberRequired"
                                type="number"
                                min="1"
                                value={data.numberRequired}
                                onChange={(e) =>
                                    updateField(
                                        "numberRequired",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. 3"
                                className="w-full rounded-lg border px-4 py-2.5"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="experienceLevel"
                                className="mb-1 block text-sm font-medium"
                            >
                                Experience Level
                            </label>

                            <select
                                id="experienceLevel"
                                value={data.experienceLevel}
                                onChange={(e) =>
                                    updateField(
                                        "experienceLevel",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border px-4 py-2.5"
                            >
                                <option value="">Select level</option>
                                <option value="entry">Entry Level</option>
                                <option value="intermediate">
                                    Intermediate
                                </option>
                                <option value="experienced">
                                    Experienced
                                </option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="crewDuration"
                            className="mb-1 block text-sm font-medium"
                        >
                            Work Duration
                        </label>

                        <input
                            id="crewDuration"
                            type="text"
                            value={data.duration}
                            onChange={(e) =>
                                updateField("duration", e.target.value)
                            }
                            placeholder="e.g. 8 hours"
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="crewBudget"
                            className="mb-1 block text-sm font-medium"
                        >
                            Budget
                        </label>

                        <input
                            id="crewBudget"
                            type="text"
                            value={data.budget}
                            onChange={(e) =>
                                updateField("budget", e.target.value)
                            }
                            placeholder="e.g. ₹5,000 per person"
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="responsibilities"
                            className="mb-1 block text-sm font-medium"
                        >
                            Responsibilities
                        </label>

                        <textarea
                            id="responsibilities"
                            value={data.responsibilities}
                            onChange={(e) =>
                                updateField(
                                    "responsibilities",
                                    e.target.value
                                )
                            }
                            placeholder="Describe the responsibilities..."
                            rows={4}
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="equipmentRequired"
                            className="mb-1 block text-sm font-medium"
                        >
                            Equipment / Tools Required
                        </label>

                        <textarea
                            id="equipmentRequired"
                            value={data.equipmentRequired}
                            onChange={(e) =>
                                updateField(
                                    "equipmentRequired",
                                    e.target.value
                                )
                            }
                            placeholder="List any required equipment or tools..."
                            rows={3}
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="crewSpecialRequirements"
                            className="mb-1 block text-sm font-medium"
                        >
                            Special Requirements
                        </label>

                        <textarea
                            id="crewSpecialRequirements"
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
                            htmlFor="crewNotes"
                            className="mb-1 block text-sm font-medium"
                        >
                            Additional Notes
                        </label>

                        <textarea
                            id="crewNotes"
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
            )}
        </div>
    );
}