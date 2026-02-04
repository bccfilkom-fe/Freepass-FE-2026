import { create } from 'zustand';

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

interface GuestbookState {
  entries: GuestbookEntry[];
  addEntry: (name: string, message: string) => void;
  removeEntry: (id: string) => void;
  updateEntry: (id: string, newMessage: string) => void;
}


const initialEntries: GuestbookEntry[] = [
  {
    id: '1',
    name: 'Frodo Baggins',
    message: 'The road goes ever on and on...',
    timestamp: new Date().toLocaleDateString()
  },
  {
    id: '2',
    name: 'Gandalf the Grey',
    message: 'All we have to decide is what to do with the time that is given us.',
    timestamp: new Date().toLocaleDateString()
  },
];

export const useGuestbookStore = create<GuestbookState>((set) => ({
  entries: initialEntries,


  addEntry: (name, message) => set((state) => ({
    entries: [
      {
        id: Math.random().toString(36).substring(2, 9),
        name,
        message,
        timestamp: new Date().toLocaleDateString()
      },
      ...state.entries
    ]
  })),


  removeEntry: (id) => set((state) => ({
    entries: state.entries.filter((entry) => entry.id !== id)
  })),


  updateEntry: (id, newMessage) => set((state) => ({
    entries: state.entries.map((entry) =>
      entry.id === id ? { ...entry, message: newMessage } : entry
    )
  })),
}));