import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
  tasks: [
    {
      title: "animasyon",
      author: "idil",
      assigned_to: "ido",
      end_date: "2024-08-29",
      id: "3275b8ac-7fe8-4d57-8654-35cb36a843b7",
    },
    {
      title: "aksiyon",
      author: "mine",
      assigned_to: "mino",
      end_date: "2024-08-31",
      id: "6235c8ad-42b1-4b0c-accf-31cab4f50066",
    },
    {
      title: "actionnn",
      author: "ayse",
      assigned_to: "ayso",
      end_date: "2024-09-04",
      id: "233aaf81-c7b4-4534-bef7-c1c6aee4f656",
    },
  ],
};
const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    addTask: (state, action) => {
      // a) task'e id ekle
      action.payload.id = v4();
      // b) veriyi diziye ekle
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      //   1. yontem filter ile
      //   const filtred = state.tasks.filter(
      //     (tasks) => tasks.id !== action.payload
      //   );

      //   state.tasks = filtred;

      // 2. yontem splice ile
      // a) once silinecek elemanin sirasi bulunur
      const index = state.tasks.findIndex((i) => i.id === action.payload);
      //b) eleman silinir
      state.tasks.splice(index, 1);
    },

    editTask: (state, action) => {
      //duzenlenecek elemanin sirasini bulalim
      const index = state.tasks.findIndex((i) => i.id === action.payload.id);
      //elemani guncelle
      state.tasks.splice(index, 1, action.payload);
    },
  },
});

// store'a tanitmak icin reducer'i import etmeliyiz

export default crudSlice.reducer;

// projede kullanabilmek icin aksiyonlari export edelim

export const { addTask, deleteTask, editTask } = crudSlice.actions;
