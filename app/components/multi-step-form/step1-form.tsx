"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LifeSituation, lifeSituationSchema } from "@/app/types/form";
import { Button } from "@/app/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";

interface Step1FormProps {
  onSubmit: (data: LifeSituation) => void;
  initialData?: LifeSituation;
}

export function Step1Form({ onSubmit, initialData }: Step1FormProps) {
  const form = useForm<LifeSituation>({
    resolver: zodResolver(lifeSituationSchema),
    defaultValues: initialData || {
      situation: "single",
      birthDate: "",
    },
  });

  const formatDate = (value: string) => {
    // Entferne alle Nicht-Zahlen
    const numbers = value.replace(/\D/g, "");

    // Überprüfe ob wir 8 Zahlen haben (DDMMYYYY)
    if (numbers.length === 8) {
      const day = numbers.slice(0, 2);
      const month = numbers.slice(2, 4);
      const year = numbers.slice(4, 8);
      return `${day}.${month}.${year}`;
    }

    return value;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formattedDate = formatDate(e.target.value);
    form.setValue("birthDate", formattedDate);
  };

  const situation = form.watch("situation");
  const birthDate = form.watch("birthDate");
  const isFormValid = situation && birthDate;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Ihre Lebenssituation
        </h2>

        <RadioGroup
          defaultValue={form.watch("situation")}
          onValueChange={(value) =>
            form.setValue("situation", value as LifeSituation["situation"])
          }
          className="grid grid-cols-1 gap-4"
        >
          <div className="flex items-center space-x-4 border p-4 rounded-lg hover:border-[#FFB81C] transition-colors">
            <RadioGroupItem value="single" id="single" />
            <Label htmlFor="single" className="flex items-center gap-2">
              <span className="text-xl">👤</span>
              Single
            </Label>
          </div>

          <div className="flex items-center space-x-4 border p-4 rounded-lg hover:border-[#FFB81C] transition-colors">
            <RadioGroupItem value="pair" id="pair" />
            <Label htmlFor="pair" className="flex items-center gap-2">
              <span className="text-xl">👥</span>
              Paar
            </Label>
          </div>

          <div className="flex items-center space-x-4 border p-4 rounded-lg hover:border-[#FFB81C] transition-colors">
            <RadioGroupItem value="singleWithKids" id="singleWithKids" />
            <Label htmlFor="singleWithKids" className="flex items-center gap-2">
              <span className="text-xl">👨‍👦</span>
              Single mit Kind/ern
            </Label>
          </div>

          <div className="flex items-center space-x-4 border p-4 rounded-lg hover:border-[#FFB81C] transition-colors">
            <RadioGroupItem value="family" id="family" />
            <Label htmlFor="family" className="flex items-center gap-2">
              <span className="text-xl">👨‍👩‍👧‍👦</span>
              Familie
            </Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label htmlFor="birthDate">
            Bitte geben Sie Ihr Geburtsdatum ein
          </Label>
          <Input
            id="birthDate"
            placeholder="TT.MM.JJJJ"
            {...form.register("birthDate")}
            onBlur={(e) => {
              form.register("birthDate").onBlur(e); // Original onBlur beibehalten
              handleBlur(e);
            }}
          />
          {form.formState.errors.birthDate && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.birthDate.message}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-500 italic">
          Beim Familientarif sind bei uns automatisch der Ehe- und
          Lebenspartner, die Kinder, sowie alle weiteren Personen in häuslicher
          Gemeinschaft mitversichert.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isFormValid}
      >
        Weiter
      </Button>
    </form>
  );
}
