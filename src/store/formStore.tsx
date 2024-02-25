import create from "zustand";
import { devtools } from "zustand/middleware";

const useFormStore = create(
  devtools((set) => ({
    formStructure: [],
    selectedForm: {},
    addElement: (element) =>
      set((state) => ({ formStructure: [...state.formStructure, element] })),
    setSelectForm: (form) => set((state) => ({ selectedForm: { ...form } })),
    removeElement: (index) =>
      set((state) => ({
        formStructure: state.formStructure.filter((_, i) => i !== index),
      })),
    clearFormStructure: () => set({ formStructure: [] }),
    updateElement: (index, updates) =>
      set((state) => ({
        formStructure: state.formStructure.map((el, i) =>
          i === index ? { ...el, props: { ...el.props, ...updates } } : el
        ),
      })),
    addElementToSelectedForm: (element) =>
      set((state) => ({
        selectedForm: {
          ...state.selectedForm,
          form: [...state.selectedForm.form, element],
        },
      })),
      updateSelectedForm: (index, updates) =>
      set((state) => ({
        selectedForm: {
          ...state.selectedForm,
          form: state.selectedForm.form.map((el, i) =>
            i === index ? { ...el, props: { ...el.props, ...updates } } : el
          ),
        },
      })),
  }))
);

export default useFormStore;
