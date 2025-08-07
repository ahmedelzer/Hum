import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import pageSchemas from "./i.json";
import { pageSchema } from "../src/utils/operation/pageSchema";
import CartInfoSchemaAction from "../src/Schemas/MenuSchema/CartInfoSchemaAction.json";
// Create context
export const SchemaContext = createContext(null);

// Context provider component
export const SchemaProvider = ({ children }) => {
  // 1. Import app schemas from Redux store
  const schemas = useSelector((state) => state.schemas);

  // 2. Create individual states for each schema
  const [pageSchemaState, setPageSchemaState] = useState({});
  const [cartInfoState, setCartInfoState] = useState(schemas.cartInfo);
  const [cartState, setCartState] = useState(schemas.cart);
  const [fastWayState, setFastWayState] = useState(schemas.fastWay);
  const [filterState, setFilterState] = useState(schemas.filter);
  const [menuCategoriesState, setMenuCategoriesState] = useState(
    schemas.menuCategories
  );
  const [menuItemsState, setMenuItemsState] = useState(schemas.menuItems);
  const [paymentMethodsState, setPaymentMethodsState] = useState(
    schemas.paymentMethods
  );
  const [paymentOptionsState, setPaymentOptionsState] = useState(
    schemas.paymentOptions
  );
  const [scratchVoucherCardState, setScratchVoucherCardState] = useState(
    schemas.scratchVoucherCard
  );
  const [suggestCardState, setSuggestCardState] = useState(schemas.suggestCard);
  const [searchBarState, setSearchBarState] = useState(schemas.searchBar);

  const [loginFormState, setLoginFormState] = useState(schemas.loginForm);
  const [resendState, setResendState] = useState(schemas.resend);
  const [signupState, setSignupState] = useState(schemas.signup);
  const [loginVerifyState, setLoginVerifyState] = useState(schemas.loginVerify);

  const [contactState, setContactState] = useState(schemas.contact);
  const [forgetState, setForgetState] = useState(schemas.forget);
  const [forgetVerifyState, setForgetVerifyState] = useState(
    schemas.forgetVerify
  );

  const [addressLocationState, setAddressLocationState] = useState(
    schemas.addressLocation
  );
  const [nearestBranchesState, setNearestBranchesState] = useState(
    schemas.nearestBranches
  );

  const [collapseState, setCollapseState] = useState(schemas.collapse);
  const [creditsState, setCreditsState] = useState(schemas.credits);
  const [customerSaleInvoicesState, setCustomerSaleInvoicesState] = useState(
    schemas.customerSaleInvoices
  );
  const [shopSaleInvoiceItemState, setShopSaleInvoiceItemState] = useState(
    schemas.shopSaleInvoiceItem
  );
  const [tabsState, setTabsState] = useState(schemas.tabs);

  const [languageState, setLanguageState] = useState(schemas.language);
  const [localizationState, setLocalizationState] = useState(
    schemas.localization
  );
  useEffect(() => {
    //cart schemas
    pageSchema(setPageSchemaState, pageSchemas, "OtherPaymentOptions");
    // call schema actions
    setCartInfoState({
      schema: pageSchemaState,
      actions: CartInfoSchemaAction,
    });
    console.log("CartInfoState", cartInfoState); // call actions
  }, []);

  // 3. Provide all states and setters via context
  return (
    <SchemaContext.Provider
      value={{
        cartInfoState,
        setCartInfoState,
        cartState,
        setCartState,
        fastWayState,
        setFastWayState,
        filterState,
        setFilterState,
        menuCategoriesState,
        setMenuCategoriesState,
        menuItemsState,
        setMenuItemsState,
        paymentMethodsState,
        setPaymentMethodsState,
        paymentOptionsState,
        setPaymentOptionsState,
        scratchVoucherCardState,
        setScratchVoucherCardState,
        suggestCardState,
        setSuggestCardState,
        searchBarState,
        setSearchBarState,
        loginFormState,
        setLoginFormState,
        resendState,
        setResendState,
        signupState,
        setSignupState,
        loginVerifyState,
        setLoginVerifyState,
        contactState,
        setContactState,
        forgetState,
        setForgetState,
        forgetVerifyState,
        setForgetVerifyState,
        addressLocationState,
        setAddressLocationState,
        nearestBranchesState,
        setNearestBranchesState,
        collapseState,
        setCollapseState,
        creditsState,
        setCreditsState,
        customerSaleInvoicesState,
        setCustomerSaleInvoicesState,
        shopSaleInvoiceItemState,
        setShopSaleInvoiceItemState,
        tabsState,
        setTabsState,
        languageState,
        setLanguageState,
        localizationState,
        setLocalizationState,
      }}
    >
      {children}
    </SchemaContext.Provider>
  );
};

// Hook to use the full context
export const useSchemas = () => useContext(SchemaContext);
