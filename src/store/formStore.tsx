import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useFormStore = create(devtools((set) => ({
  formStructure: [],
  addElement: (element) => set((state) => ({ formStructure: [...state.formStructure, element] })),
  removeElement: (index) => set((state) => ({ formStructure: state.formStructure.filter((_, i) => i !== index) })),
  updateElement: (index, updates) =>
    set((state) => ({
      formStructure: state.formStructure.map((el, i) => (i === index ? { ...el, props: { ...el.props, ...updates } } : el)),
    })),
})));

export default useFormStore;
