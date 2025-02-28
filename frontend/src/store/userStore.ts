import { create } from "zustand";

export const userStore = create((set) => ({
    searchingOppenent: false,
    setSearchingOppenent : (searchingOppenent:boolean) => set({searchingOppenent}),
    opponent: null,
    setOpponent : (opponent:any) => set({opponent}),
    yourColor: null,
    setYourColor : (yourColor:any) => set({yourColor}),
    yourTurn: false,
    setYourTurn : (yourTurn:boolean) => set({yourTurn}),
}))