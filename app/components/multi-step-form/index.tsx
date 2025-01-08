"use client";

import { useState } from "react";
import { LifeSituation, FileUpload, DentalResult } from "@/app/types/form";
import { Step1Form } from "./step1-form";
import { Step2Form } from "./step2-form";
import { Step3Result } from "./step3-result";

export function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    lifeSituation?: LifeSituation;
    fileUpload?: FileUpload;
    result?: DentalResult;
  }>({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute h-1 bg-gray-200 top-1/2 -translate-y-1/2 left-0 right-0 z-0">
            <div
              className="h-full bg-[#FFB81C] transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                step >= num
                  ? "bg-[#FFB81C] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {step === 1 && (
          <Step1Form
            onSubmit={(data) => {
              updateFormData({ lifeSituation: data });
              nextStep();
            }}
            initialData={formData.lifeSituation}
          />
        )}

        {step === 2 && (
          <Step2Form
            onSubmit={(data) => {
              updateFormData({ fileUpload: data });
              nextStep();
            }}
            onBack={prevStep}
          />
        )}

        {step === 3 && formData.lifeSituation && (
          <Step3Result
            lifeSituation={formData.lifeSituation}
            onBack={prevStep}
          />
        )}
      </div>
    </div>
  );
}
