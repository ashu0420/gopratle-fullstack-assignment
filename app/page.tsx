import RequirementForm from "@/components/RequirementForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold">
          Post an Event Requirement
        </h1>

        <p className="mt-2 text-gray-600">
          Tell us what you need for your event and find the
          right professionals.
        </p>
      </div>

      <RequirementForm />
    </main>
  );
}