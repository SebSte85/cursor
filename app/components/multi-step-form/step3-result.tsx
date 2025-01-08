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

export function Step3Result({ lifeSituation, onBack }: Step3ResultProps) {
  const [result, setResult] = useState<{
    premium: number;
    dentalHealth: (typeof DENTAL_HEALTH_OPTIONS)[number];
  } | null>(null);

  useEffect(() => {
    // Simuliere API-Aufruf
    const calculateResult = () => {
      const basePrice = {
        single: 29.99,
        pair: 54.99,
        singleWithKids: 44.99,
        family: 79.99,
      }[lifeSituation.situation];

      const randomHealth =
        DENTAL_HEALTH_OPTIONS[
          Math.floor(Math.random() * DENTAL_HEALTH_OPTIONS.length)
        ];

      setResult({
        premium: basePrice,
        dentalHealth: randomHealth,
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

          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg font-medium">Zustand Ihrer Zähne</p>
            <p className="text-3xl font-bold text-[#FFB81C]">
              {result.dentalHealth}
            </p>
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
