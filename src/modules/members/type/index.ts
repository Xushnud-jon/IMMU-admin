
export interface RecordType {
    id:string | number,
    name:string
}
// src/types/index.ts or another relevant file
export interface Members {
  id?: string;
  name_uz: string;
  name_en: string;
  job_name_uz: string;
  job_name_en: string;
  description_uz: string;
  description_en: string;
  country_id: string;
  file?: File; // optional, agar upload bo‘lsa
}
