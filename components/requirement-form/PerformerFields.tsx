"use client";

import type { PerformerDetails } from "@/types/requirement";

interface PerformerFieldsProps {
    data: PerformerDetails;
    onChange: (data: PerformerDetails) => void;
}

export default function PerformerFields({
    data,
    onChange,
}: PerformerFieldsProps) {
    const updateField = (
        field: keyof PerformerDetails,
        value: string | boolean
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
                    Performer Requirements
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Tell us about the performance you are looking for.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="performanceType"
                        className="mb-1 block text-sm font-medium"
                    >
                        Performance Type
                    </label>

                    <select
                        id="performanceType"
                        value={data.performanceType}
                        onChange={(e) =>
                            updateField(
                                "performanceType",
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border px-4 py-2.5"
                    >
                        <option value="">Select type</option>
                        <option value="solo">Solo Artist</option>
                        <option value="band">Band</option>
                        <option value="dj">DJ</option>
                        <option value="dance">Dance Group</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="genre"
                        className="mb-1 block text-sm font-medium"
                    >
                        Genre / Style
                    </label>

                    <input
                        id="genre"
                        type="text"
                        value={data.genre}
                        onChange={(e) =>
                            updateField("genre", e.target.value)
                        }
                        placeholder="e.g. Bollywood, Rock, Classical"
                        className="w-full rounded-lg border px-4 py-2.5"
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="performerCount"
                            className="mb-1 block text-sm font-medium"
                        >
                            Number of Performers
                        </label>

                        <input
                            id="performerCount"
                            type="number"
                            min="1"
                            value={data.performerCount}
                            onChange={(e) =>
                                updateField(
                                    "performerCount",
                                    e.target.value
                                )
                            }
                            placeholder="e.g. 5"
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="duration"
                            className="mb-1 block text-sm font-medium"
                        >
                            Performance Duration
                        </label>

                        <input
                            id="duration"
                            type="text"
                            value={data.duration}
                            onChange={(e) =>
                                updateField("duration", e.target.value)
                            }
                            placeholder="e.g. 2 hours"
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="performerBudget"
                        className="mb-1 block text-sm font-medium"
                    >
                        Budget
                    </label>

                    <input
                        id="performerBudget"
                        type="text"
                        value={data.budget}
                        onChange={(e) =>
                            updateField("budget", e.target.value)
                        }
                        placeholder="e.g. ₹50,000"
                        className="w-full rounded-lg border px-4 py-2.5"
                    />
                </div>

                <div>
                    <p className="mb-3 text-sm font-medium">
                        Technical Requirements
                    </p>

                    <div className="space-y-3">
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.soundSystem}
                                onChange={(e) =>
                                    updateField(
                                        "soundSystem",
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4"
                            />
                            <span className="text-sm">
                                Sound system required
                            </span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.lighting}
                                onChange={(e) =>
                                    updateField(
                                        "lighting",
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4"
                            />
                            <span className="text-sm">
                                Lighting required
                            </span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.stage}
                                onChange={(e) =>
                                    updateField("stage", e.target.checked)
                                }
                                className="h-4 w-4"
                            />
                            <span className="text-sm">
                                Stage required
                            </span>
                        </label>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="performerSpecialRequirements"
                        className="mb-1 block text-sm font-medium"
                    >
                        Special Requirements
                    </label>

                    <textarea
                        id="performerSpecialRequirements"
                        value={data.specialRequirements}
                        onChange={(e) =>
                            updateField(
                                "specialRequirements",
                                e.target.value
                            )
                        }
                        placeholder="Any specific performance or technical requirements..."
                        rows={4}
                        className="w-full rounded-lg border px-4 py-2.5"
                    />
                </div>
            </div>
        </div>
    );
}