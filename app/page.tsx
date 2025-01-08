import { MultiStepForm } from "@/app/components/multi-step-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="w-32">
            <img
              src="/vhv-logo-subline-pos.svg"
              alt="VHV Logo"
              className="w-full h-auto"
            />
          </div>
          <div className="flex gap-4 items-center">
            <button className="text-gray-600 hover:text-gray-900">
              Speichern
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              Kontakt
            </button>
          </div>
        </div>

        <div className="py-8">
          <MultiStepForm />
        </div>
      </div>
    </main>
  );
}
