import { createSlice } from "@reduxjs/toolkit";

// MenuSchema
import CartInfoSchema from "../Schemas/MenuSchema/CartInfoSchema.json";
import CartInfoSchemaAction from "../Schemas/MenuSchema/CartInfoSchemaAction.json";
import CartSchema from "../Schemas/MenuSchema/CartSchema.json";
import CartSchemaActions from "../Schemas/MenuSchema/CartSchemaActions.json";
import FastWaySchema from "../Schemas/MenuSchema/FastWaySchema.json";
import FilterSchema from "../Schemas/MenuSchema/FilterSchema.json";
import NodeMenuCatSchema from "../Schemas/MenuSchema/NodeMenuCatSchema.json";
import NodeMenuCatSchemaActions from "../Schemas/MenuSchema/NodeMenuCatSchemaActions.json";
import NodeMenuItemsSchema from "../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import NodeMenuItemsSchemaActions from "../Schemas/MenuSchema/NodeMenuItemsSchemaActions.json";
import PaymentMethods from "../Schemas/MenuSchema/PaymentMethods.json";
import PaymentOptions from "../Schemas/MenuSchema/PaymentOptions.json";
import PaymentOptionsActions from "../Schemas/MenuSchema/PaymentOptionsActions.json";
import ScratchVoucherCard from "../Schemas/MenuSchema/ScratchVoucherCard.json";
import ScratchVoucherCardActions from "../Schemas/MenuSchema/ScratchVoucherCardActions.json";
import SuggestCardSchema from "../Schemas/MenuSchema/SuggestCardSchema.json";
import SuggestCardSchemaActions from "../Schemas/MenuSchema/SuggestCardSchemaActions.json";
import searchBarSchema from "../Schemas/MenuSchema/searchBarSchema.json";

// LoginSchema
import LoginFormSchema from "../Schemas/LoginSchema/LoginFormSchema.json";
import LoginFormSchemaActions from "../Schemas/LoginSchema/LoginFormSchemaActions.json";
import ResendSchemaAction from "../Schemas/LoginSchema/ResendSchemaAction.json";
import SighupSchema from "../Schemas/LoginSchema/SighupSchema.json";
import VerifySchema from "../Schemas/LoginSchema/VerifySchema.json";
import VerifySchemaAction from "../Schemas/LoginSchema/VerifySchemaAction.json";
import PersonalInfo from "../Schemas/PersonalInfo.json";

// ForgetSchema
import ContactSchema from "../Schemas/ForgetSchema/ContactSchema.json";
import ForgetSchema from "../Schemas/ForgetSchema/ForgetSchema.json";
import ForgetSchemaActions from "../Schemas/ForgetSchema/ForgetSchemaActions.json";
import VerifyForgetSchema from "../Schemas/ForgetSchema/VerifySchema.json";

// AddressLocation
import AddressLocation from "../Schemas/AddressLocation/AddressLocation.json";
import AddressLocationAction from "../Schemas/AddressLocation/AddressLocationAction.json";
import NearestBranches from "../Schemas/AddressLocation/NearestBranches.json";
import NearestBranchesActions from "../Schemas/AddressLocation/NearestBranchesActions.json";

// Language
import LanguageSchema from "../Schemas/LanguageSchema/LanguageSchema.json";
import LanguageSchemaActions from "../Schemas/LanguageSchema/LanguageSchemaActions.json";

// Localization
import LocalizationSchemaActions from "../Schemas/Localization/LocalizationSchemaActions.json";

// Profile
import CollapseSchema from "../Schemas/Profile/CollapseScehma.json";
import CreditsSchema from "../Schemas/Profile/CreditsSchema.json";
import CustomerSaleInvoicesActions from "../Schemas/Profile/CustomerSaleInvoicesActions.json";
// import SaleInvoiceSchema from "../Schemas/Profile/SaleInvoiceSchema.json";
// import ShopSaleInvoiceItemSchema from "../Schemas/Profile/ShopSaleInvoiceItemSchema.json";
import TabsSchemaActions from "../Schemas/Profile/TabsSchemaActions.json";
import TapsSchema from "../Schemas/Profile/TapsSchema.json";

export const schemasSlice = createSlice({
  name: "schemas",
  initialState: {
    // Menu
    cartInfo: { schema: CartInfoSchema, action: CartInfoSchemaAction },
    cart: { schema: CartSchema, action: CartSchemaActions },
    fastWay: { schema: FastWaySchema, action: [{}] },
    filter: { schema: FilterSchema, action: [{}] },
    menuCategories: {
      schema: NodeMenuCatSchema,
      action: NodeMenuCatSchemaActions,
    },
    menuItems: {
      schema: NodeMenuItemsSchema,
      action: NodeMenuItemsSchemaActions,
    },
    paymentMethods: { schema: PaymentMethods, action: [{}] },
    paymentOptions: { schema: PaymentOptions, action: PaymentOptionsActions },
    scratchVoucherCard: {
      schema: ScratchVoucherCard,
      action: ScratchVoucherCardActions,
    },
    suggestCard: {
      schema: SuggestCardSchema,
      action: SuggestCardSchemaActions,
    },
    searchBar: { schema: searchBarSchema, action: [{}] },

    // Login
    loginForm: { schema: LoginFormSchema, action: LoginFormSchemaActions },
    resend: { schema: {}, action: ResendSchemaAction },
    signup: { schema: PersonalInfo, action: SighupSchema },
    loginVerify: { schema: VerifySchema, action: VerifySchemaAction },

    // Forget
    contact: { schema: ContactSchema, action: [{}] },
    forget: { schema: ForgetSchema, action: ForgetSchemaActions },
    forgetVerify: { schema: VerifyForgetSchema, action: [{}] },

    // Address Location
    addressLocation: {
      schema: AddressLocation,
      action: AddressLocationAction,
    },
    nearestBranches: {
      schema: NearestBranches,
      action: NearestBranchesActions,
    },

    // Profile
    collapse: { schema: CollapseSchema, action: [{}] },
    // credits: { schema: CreditsSchema, action: [{}] },
    // customerSaleInvoices: {
    //   schema: SaleInvoiceSchema,
    //   action: CustomerSaleInvoicesActions,
    // },
    //shopSaleInvoiceItem: { schema: ShopSaleInvoiceItemSchema, action: [{}] },
    tabs: { schema: TapsSchema, action: TabsSchemaActions },
    language: { schema: LanguageSchema, action: LanguageSchemaActions },
    localization: { schema: {}, action: LocalizationSchemaActions },
  },
  reducers: {
    updateSchemas: (state, action) => {
      const { key, schema, actionSchema } = action.payload;
      state[key] = { schema, action: actionSchema };
    },
  },
});

export const { updateSchemas } = schemasSlice.actions;

export default schemasSlice.reducer;
