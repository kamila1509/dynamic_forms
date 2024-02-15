import create from 'zustand';
import { devtools } from 'zustand/middleware';


const useFormStore = create(devtools((set) => ({
  formStructure: [],
  addElement: (element) => set((state) => ({ formStructure: [...state.formStructure, element] })),
  removeElement: (index) => set((state) => ({ formStructure: state.formStructure.filter((_, i) => i !== index) })),
})));

export default useFormStore;
