import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager, Platform } from "react-native";
import staticLocalization from "../../context/staticLocalization.json";

// Async thunk to initialize localization state from storage
export const initializeLocalization = createAsyncThunk(
  "localization/initializeLocalization",
  async (_, thunkAPI) => {
    try {
      const savedDirection = await AsyncStorage.getItem("isRTL");
      const savedLocalization = await AsyncStorage.getItem("localization");
      const savedLanguageRow = await AsyncStorage.getItem("languageRow");
      const savedLanguageID = await AsyncStorage.getItem("languageID");
      // Apply RTL setting if needed
      if (savedDirection !== null) {
        const direction = savedDirection === "true";
        if (Platform.OS === "web") {
          window.document.dir = direction ? "rtl" : "ltr";
        }
        if (I18nManager.isRTL !== direction) {
          I18nManager.forceRTL(direction);
        }
      }

      return {
        languageRow: savedLanguageRow ? JSON.parse(savedLanguageRow) : {},
        localization: savedLocalization
          ? JSON.parse(savedLocalization)
          : staticLocalization,
        languageID: savedLanguageID || "",
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const localizationSlice = createSlice({
  name: "localization",
  initialState: {
    localization: staticLocalization,
    languageRow: {},
    languageID: "",
    loading: false,
    error: null,
  },
  reducers: {
    setLocalization: (state, action) => {
      state.localization = action.payload;
      AsyncStorage.setItem("localization", JSON.stringify(action.payload));
    },
    setLanguageRow: (state, action) => {
      state.languageRow = action.payload;
      AsyncStorage.setItem("languageRow", JSON.stringify(action.payload));
    },
    setLanguageID: (state, action) => {
      state.languageID = action.payload;
      AsyncStorage.setItem("languageID", action.payload);
    },
    setDirection: (_, action) => {
      const direction = action.payload === true || action.payload === "true";
      AsyncStorage.setItem("isRTL", direction.toString());
      if (I18nManager.isRTL !== direction) {
        I18nManager.forceRTL(direction);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeLocalization.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeLocalization.fulfilled, (state, action) => {
        state.languageRow = action.payload.languageRow;
        state.localization = action.payload.localization;
        state.languageID = action.payload.languageID;
        state.loading = false;
      })
      .addCase(initializeLocalization.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setLocalization, setLanguageRow, setLanguageID, setDirection } =
  localizationSlice.actions;

export default localizationSlice.reducer;
