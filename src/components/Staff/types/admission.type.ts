export interface AdmissionFormData {
  fullName: string;
  age: number | "";
  gender: string;
  admissionReason: string;
  doctor: string;
  departmentCode: string;
  notes: string;
  wardId: number | null;
  bedId: number | null;
}