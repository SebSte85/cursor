"use client";

import { useEffect, useState } from "react";
import { LifeSituation } from "@/app/types/form";
import { Button } from "@/app/components/ui/button";

interface Step3ResultProps {
  lifeSituation: LifeSituation;
  onBack: () => void;
}

const DENTAL_HEALTH_OPTIONS = [
  "Sehr gut",
  "Gut",
  "Moderat",
  "Verbesserungswürdig",
] as const;

// Erweiterte Typen für detailliertere Ergebnisse
type DentalHealthStatus = (typeof DENTAL_HEALTH_OPTIONS)[number];

interface DentalAnalysis {
  overallHealth: DentalHealthStatus;
  teethCount: number;
  gumsHealth: DentalHealthStatus;
  tartar: DentalHealthStatus;
  cavities: number;
}

interface CalculationResult {
  premium: number;
  dentalAnalysis: DentalAnalysis;
}

export function Step3Result({ lifeSituation, onBack }: Step3ResultProps) {
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    // Simuliere API-Aufruf
    const calculateResult = () => {
      const basePrice = {
        single: 29.99,
        pair: 54.99,
        singleWithKids: 44.99,
        family: 79.99,
      }[lifeSituation.situation];

      // Erweiterte Simulationsdaten
      setResult({
        premium: basePrice,
        dentalAnalysis: {
          overallHealth:
            DENTAL_HEALTH_OPTIONS[
              Math.floor(Math.random() * DENTAL_HEALTH_OPTIONS.length)
            ],
          teethCount: Math.floor(Math.random() * (32 - 28 + 1)) + 28, // 28-32 Zähne
          gumsHealth:
            DENTAL_HEALTH_OPTIONS[
              Math.floor(Math.random() * DENTAL_HEALTH_OPTIONS.length)
            ],
          tartar:
            DENTAL_HEALTH_OPTIONS[
              Math.floor(Math.random() * DENTAL_HEALTH_OPTIONS.length)
            ],
          cavities: Math.floor(Math.random() * 3), // 0-2 Kavitäten
        },
      });
    };

    const timer = setTimeout(calculateResult, 1000);
    return () => clearTimeout(timer);
  }, [lifeSituation]);

  if (!result) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFB81C]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Ihr Ergebnis</h2>

        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg font-medium">Monatliche Prämie</p>
            <p className="text-3xl font-bold text-[#FFB81C]">
              {result.premium.toFixed(2)} €
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <p className="text-lg font-medium">Gesamtergebnis</p>
              <p className="text-3xl font-bold text-[#FFB81C]">
                {result.dentalAnalysis.overallHealth}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Anzahl Zähne
                </p>
                <p className="text-lg font-semibold">
                  {result.dentalAnalysis.teethCount}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Zahnfleisch</p>
                <p className="text-lg font-semibold">
                  {result.dentalAnalysis.gumsHealth}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Zahnstein</p>
                <p className="text-lg font-semibold">
                  {result.dentalAnalysis.tartar}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Kariöse Stellen
                </p>
                <p className="text-lg font-semibold">
                  {result.dentalAnalysis.cavities}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={onBack}
        className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200"
      >
        Zurück
      </Button>
    </div>
  );
}
