import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  email: "",
  school: "",
  graduated: false,
  graduationYear: 2026,
  selectedOptions: [],
  selectedCategories: [],
  selectedProjects: [],
  // Add other fields as needed
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setSchool: (state, action) => {
      state.school = action.payload;
    },
    setGraduated: (state, action) => {
      state.graduated = action.payload;
    },
    setGraduationYear: (state, action) => {
      state.graduationYear = action.payload;
    },
    setToggleOption: (state, action) => {
      const option = action.payload;
      if (!state.selectedOptions) {
        state.selectedOptions = [];
      }
      if (state.selectedOptions.includes(option)) {
        state.selectedOptions = state.selectedOptions.filter(opt => opt !== option);
      } else {
        state.selectedOptions.push(option);
      }
    },
    setToggleCategory: (state, action) => {
      const category = action.payload;
      if (!state.selectedCategories) {
        state.selectedCategories = [];
      }
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter((c) => c !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
    setToggleProject: (state, action) => {
      const project = action.payload;
      if (!state.selectedProjects) {
        state.selectedProjects = [];
      }
      if (state.selectedProjects.includes(project)) {
        state.selectedProjects = state.selectedProjects.filter((p) => p !== project);
      } else {
        state.selectedProjects.push(project);
      }
    },
  },
});

export const { setFirstName, setEmail, setSchool,
  setGraduated,
  setGraduationYear,
  setToggleOption,
  setToggleCategory,
  setToggleProject } = formSlice.actions;
export default formSlice.reducer;
