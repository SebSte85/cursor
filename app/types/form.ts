import { z } from "zod";

export const lifeSituationSchema = z.object({
  situation: z.enum(["single", "pair", "singleWithKids", "family"]),
  birthDate: z
    .string()
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, "Ungültiges Datumsformat"),
});

export const fileUploadSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "Datei darf maximal 5MB groß sein")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Nur JPEG oder PNG Dateien sind erlaubt"
    ),
});

export type LifeSituation = z.infer<typeof lifeSituationSchema>;
export type FileUpload = z.infer<typeof fileUploadSchema>;

export type DentalResult = {
  premium: number;
  dentalHealth: "Sehr gut" | "Gut" | "Moderat" | "Verbesserungswürdig";
};
