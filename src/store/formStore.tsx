import create from 'zustand';

const useFormStore = create((set) => ({
  formStructure: [],
  addElement: (element) => set((state) => ({ formStructure: [...state.formStructure, element] })),
  removeElement: (index) => set((state) => ({ formStructure: state.formStructure.filter((_, i) => i !== index) })),
}));

export default useFormStore;
