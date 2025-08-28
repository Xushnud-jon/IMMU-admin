
export interface RecordType {
    id:string | number,
    name:string
}
// src/types/index.ts or another relevant file
export interface Events {
  id?: string;
  name_uz: string;
  name_en: string;
  description_uz: string;
  description_en: string;
  date: string;
  type: "news" | "event";
  files?: File[]; // bir nechta fayl
}