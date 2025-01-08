"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload, fileUploadSchema } from "@/app/types/form";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/lib/utils";

interface Step2FormProps {
  onSubmit: (data: FileUpload) => void;
  onBack: () => void;
}

export function Step2Form({ onSubmit, onBack }: Step2FormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<FileUpload>({
    resolver: zodResolver(fileUploadSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Laden Sie ein Foto Ihrer Zähne hoch
        </h2>

        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8",
            "hover:border-[#FFB81C] transition-colors cursor-pointer",
            "flex flex-col items-center justify-center gap-4",
            form.formState.errors.image && "border-red-500"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="text-6xl">📸</div>
          <div className="text-center">
            <p className="font-medium">
              Klicken Sie hier, um ein Foto hochzuladen
            </p>
            <p className="text-sm text-gray-500 mt-1">
              JPEG oder PNG, maximal 5MB
            </p>
          </div>

          {form.watch("image") && (
            <p className="text-sm text-green-600">
              ✓ {form.watch("image").name}
            </p>
          )}

          {form.formState.errors.image && (
            <p className="text-sm text-red-500">
              {form.formState.errors.image.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-100 text-gray-900 hover:bg-gray-200"
        >
          Zurück
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={!form.watch("image")}
        >
          Berechnen
        </Button>
      </div>
    </form>
  );
}
