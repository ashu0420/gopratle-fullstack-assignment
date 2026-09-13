"use client";

import type { EventBasics } from "@/types/requirement";

interface EventBasicsProps {
    data: EventBasics;
    onChange: (data: EventBasics) => void;
}

export default function EventBasics({
    data,
    onChange,
}: EventBasicsProps) {
    const updateField = (
        field: keyof EventBasics,
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
                    Event Basics
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Tell us about the event you are planning.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="eventName"
                        className="mb-1 block text-sm font-medium"
                    >
                        Event Name
                    </label>

                    <input
                        id="eventName"
                        type="text"
                        value={data.eventName}
                        onChange={(e) =>
                            updateField("eventName", e.target.value)
                        }
                        placeholder="e.g. Annual Corporate Event"
                        className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
                    />
                </div>

                <div>
                    <label
                        htmlFor="eventType"
                        className="mb-1 block text-sm font-medium"
                    >
                        Event Type
                    </label>

                    <select
                        id="eventType"
                        value={data.eventType}
                        onChange={(e) =>
                            updateField("eventType", e.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-2.5"
                    >
                        <option value="">Select event type</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate</option>
                        <option value="concert">Concert</option>
                        <option value="private">Private Event</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="startDate"
                            className="mb-1 block text-sm font-medium"
                        >
                            Start Date
                        </label>

                        <input
                            id="startDate"
                            type="date"
                            value={data.startDate}
                            onChange={(e) =>
                                updateField("startDate", e.target.value)
                            }
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="endDate"
                            className="mb-1 block text-sm font-medium"
                        >
                            End Date
                        </label>

                        <input
                            id="endDate"
                            type="date"
                            value={data.endDate}
                            onChange={(e) =>
                                updateField("endDate", e.target.value)
                            }
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="location"
                        className="mb-1 block text-sm font-medium"
                    >
                        Location
                    </label>

                    <input
                        id="location"
                        type="text"
                        value={data.location}
                        onChange={(e) =>
                            updateField("location", e.target.value)
                        }
                        placeholder="e.g. Mumbai, Maharashtra"
                        className="w-full rounded-lg border px-4 py-2.5"
                    />
                </div>

                <div>
                    <label
                        htmlFor="venue"
                        className="mb-1 block text-sm font-medium"
                    >
                        Venue
                        <span className="ml-1 text-gray-400">(Optional)</span>
                    </label>

                    <input
                        id="venue"
                        type="text"
                        value={data.venue}
                        onChange={(e) =>
                            updateField("venue", e.target.value)
                        }
                        placeholder="e.g. Grand Convention Hall"
                        className="w-full rounded-lg border px-4 py-2.5"
                    />
                </div>
            </div>

            <div>
                <label className="mb-3 block text-sm font-medium">
                    What do you need?
                </label>

                <div className="grid gap-3 sm:grid-cols-3">
                    {[
                        {
                            value: "planner",
                            label: "Event Planner",
                        },
                        {
                            value: "performer",
                            label: "Performer",
                        },
                        {
                            value: "crew",
                            label: "Crew",
                        },
                    ].map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                                updateField("category", option.value)
                            }
                            className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${data.category === option.value
                                    ? "border-black bg-black text-white"
                                    : "hover:bg-gray-50"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}