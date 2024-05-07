import { createSlice, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: { results: null, isLoading: false },
  reducers: {
    updateRecipesCurrent(state, action) {
      return { ...state, results: action.payload };
    },
    updateLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

const savedSlice = createSlice({
  name: "saved",
  initialState: { savedRecipes: [] },
  reducers: {
    saveRecipe(state, action) {
      return {
        ...state,
        savedRecipes: [...state.savedRecipes, action.payload],
      };
    },
    removeRecipe(state, action) {
      return {
        ...state,
        savedRecipes: [
          ...state.savedRecipes.filter(
            (recipe) => recipe.url !== action.payload.url,
          ),
        ],
      };
    },
  },
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  savedSlice.reducer,
);

const store = configureStore({
  reducer: {
    searchResults: searchResultsSlice.reducer,
    saved: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export const searchResultsActions = searchResultsSlice.actions;
export const savedActions = savedSlice.actions;
