import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdmissionState {
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

const initialState: AdmissionState = {
  fullName: "",
  age: "",
  gender: "",
  admissionReason: "",
  doctor: "",
  departmentCode: "",
  notes: "",
  wardId: null,
  bedId: null,
};

const admissionSlice = createSlice({
  name: "admission",

  initialState,

  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof AdmissionState;
        value: string | number | null;
      }>
    ) => {
      state[action.payload.field] = action.payload.value as never;
    },

    resetAdmissionForm: () => initialState,
  },
});

export const {
  updateField,
  resetAdmissionForm,
} = admissionSlice.actions;

export default admissionSlice.reducer;