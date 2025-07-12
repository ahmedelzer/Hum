import {
  Feather,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  Divider,
  Heading,
  HStack,
  Link,
  LinkText,
  Text,
  VStack,
} from "../../../components/ui";
import { useAuth } from "../../../context/auth";
import LanguageSelector from "../../components/language/LanguageSelector";
import {
  CollapsibleNavigation,
  CollapsibleSection,
} from "../../utils/component/Collapsible";
import LogoutAlertDialog from "../LogoutAlertDialog";
import { theme } from "../../Theme";
import OrderCollapse from "./OrderCollapse";
import VoucherCardList from "./VoucherCardList";
import CreditsSchema from "../../Schemas/Profile/CreditsSchema.json";
import PaymentOptionsActions from "../../Schemas/MenuSchema/PaymentOptionsActions.json";
import { getField } from "../../utils/operation/getField";
import { GetProjectUrl, SetReoute } from "../../../request";
import useFetch from "../../../components/hooks/APIsFunctions/useFetch";
import { formatCount } from "../../utils/operation/formatCount";
import { useSchemas } from "../../../context/SchemaProvider";
import { useWS } from "../../../context/WSProvider";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import { WSMessageHandler } from "../../utils/WS/handleWSMessage";
import FormContainer from "../../components/form-container/FormContainer";
import { useForm } from "react-hook-form";
import { onApply } from "../../components/form-container/OnApply";
const MobileProfilePage = () => {
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] = useState(false);
  const { userGust, user } = useAuth();
  const { signupState } = useSchemas();
  const [result, setResult] = useState(null);
  const [disable, setDisable] = useState(null);
  const localization = useSelector((state) => state.localization.localization);
  const voucherLocale = localization.Hum_screens.profile.collapses.find(
    (collapse) => collapse.type === "vouchers"
  ).childrenText;

  const DValues = {};
  const {
    control,
    handleSubmit,
    formState: { defaultValues = DValues, errors },
    watch,
    clearErrors,
  } = useForm({
    defaultValues: DValues,
  });
  const allParams = signupState.schema.dashboardFormSchemaParameters;

  // Get the parameterField values for phoneNumber and confirmPassword
  const phoneNumberField = getField(allParams, "phoneNumber");
  const passwordField = getField(allParams, "confirmPassword", false);

  // Filter out phoneNumber and password fields by their `parameterField` values
  const sanitizedParams = allParams.filter(
    (param) =>
      param.parameterField !== phoneNumberField &&
      param.parameterField !== passwordField.parameterField
  );

  // Create schema with filtered parameters
  const restOfSchema = {
    ...signupState.schema,
    dashboardFormSchemaParameters: sanitizedParams,
  };

  // Optional: If you want individual schemas too (same sanitized version reused)
  const passwordSchema = {
    ...signupState.schema,
    dashboardFormSchemaParameters: [passwordField],
  };

  const onSubmit = async (data: any) => {
    // Destructure to remove confirmPassword from the sent data
    const { confirmPassword, ...sanitizedData } = data;
    setDisable(true);
    try {
      const request = await onApply(
        sanitizedData,
        null,
        true,
        signupState.action,
        signupState.schema.projectProxyRoute
      );
      setResult(request);

      if (request && request.success === true) {
        const passwordField = getField(signupState.schema, "confirmPassword");
        const { [passwordField]: removedPassword, ...dataWithoutPassword } =
          data;

        // navigation.navigate("Verify", {
        //   ...dataWithoutPassword,
        //   ...request.data,
        //   VerifySchemaAction: VerifySchemaAction,
        // });
      }
    } catch (error) {
      console.error("API call failed:", error);
      // Optionally, handle the error here (e.g., show a notification)
    } finally {
      // Enable the button after the API call
      setDisable(false);
    }
  };
  return (
    <ScrollView style={{ flex: 1, height: "100%" }}>
      <View className="flex flex-col md:!flex-row gap-0 md:!gap-x-12">
        <View className="md:!flex-1">
          {!userGust && (
            <>
              <ProfileCard />
              <Divider className="my-2" />
              <View className="flex md:hidden">
                <CollapsibleSection
                  title="Personal Info"
                  icon={() => <Feather name="user" size={22} />}
                  setheader
                  buttonClassName="py-2"
                >
                  <FormContainer
                    tableSchema={restOfSchema}
                    row={{}}
                    control={control}
                    errorResult={result || errors}
                    clearErrors={clearErrors}
                  />
                  <Button
                    action="positive"
                    variant="solid"
                    onPress={async () => {
                      await handleSubmit(onSubmit)();
                    }}
                    className="mt-4"
                  >
                    <ButtonText>{voucherLocale.more}</ButtonText>
                  </Button>
                </CollapsibleSection>
              </View>
              <View className="hidden md:flex">
                <FormContainer
                  tableSchema={restOfSchema}
                  row={{}}
                  control={control}
                  errorResult={result || errors}
                  clearErrors={clearErrors}
                />
                <Button
                  action="positive"
                  variant="solid"
                  onPress={async () => {
                    await handleSubmit(onSubmit)();
                  }}
                  className="mt-4"
                >
                  <ButtonText>{localization.formSteps.popup.save}</ButtonText>
                </Button>
              </View>
              {/* Add more sections you want in left column */}
            </>
          )}
        </View>
        <View className="flex-1">
          {!userGust && (
            <View className="flex-1">
              <Divider className="my-2" />

              <CollapsibleSection
                title="Setting"
                icon={() => <Feather name="settings" size={22} />}
                setheader
              >
                <View>
                  <FormContainer
                    tableSchema={passwordSchema}
                    row={{}}
                    control={control}
                    errorResult={result || errors}
                    clearErrors={clearErrors}
                  />
                  <LanguageSelector key={1} />
                </View>
              </CollapsibleSection>
              <Divider className="my-2" />
              <CollapsibleSection
                title="Payment Settings"
                icon={() => <Feather name="credit-card" size={22} />}
                setheader
              >
                <Text>Manage payment methods.</Text>
              </CollapsibleSection>
              <Divider className="my-2" />
              <CollapsibleSection
                title="My Vouchers"
                setheader
                icon={() => <Feather name="tag" size={22} />}
              >
                <VoucherCardList />
              </CollapsibleSection>
              <Divider className="my-2" />
              <CollapsibleSection
                title="Security"
                setheader
                icon={() => <Feather name="lock" size={22} />}
              >
                <Text>Update password and security settings.</Text>
              </CollapsibleSection>
              <Divider className="my-2" />
              <CollapsibleNavigation
                title="Notifications"
                icon={() => <Feather name="bell" size={22} />}
                screenName={"NotificationScreen"}
              />
              <Divider className="my-2" />
              <CollapsibleSection
                setheader
                title="Orders & Purchases"
                icon={() => <FontAwesome6 name="tablets" size={22} />}
              >
                <OrderCollapse />
              </CollapsibleSection>
              <Divider className="my-2" />
              <CollapsibleSection
                setheader
                title="Wishlist"
                icon={() => <MaterialIcons name="window" size={22} />}
              >
                <Text>Manage your saved products.</Text>
              </CollapsibleSection>
              <Divider className="my-2" />
              <CollapsibleNavigation
                title="Cart"
                icon={() => <Feather name="shopping-cart" size={22} />}
                screenName={"Cart"}
              />
              <Divider className="my-2" />
              <CollapsibleSection
                title="Referral & Rewards"
                icon={() => <Feather name="gift" size={22} />}
                setheader
              >
                <Text>Check your earned rewards and referrals.</Text>
              </CollapsibleSection>
              <Divider className="my-2" />
              <CollapsibleSection
                title="Support"
                icon={() => <Feather name="headphones" size={22} />}
                setheader
              >
                <Text>Contact support or get help.</Text>
              </CollapsibleSection>
            </View>
          )}
        </View>
      </View>
      <LogoutButton setOpenLogoutAlertDialog={setOpenLogoutAlertDialog} />
      <LogoutAlertDialog
        setOpenLogoutAlertDialog={setOpenLogoutAlertDialog}
        openLogoutAlertDialog={openLogoutAlertDialog}
      />
    </ScrollView>
  );
};
const ProfileCard = () => {
  const { userGust, user } = useAuth();
  const { _wsMessageAccounting, setWSMessageAccounting } = useWS();
  const { menuItemsState, setMenuItemsState } = useSchemas();
  const [WS_Connected, setWS_Connected] = useState(false);
  const fieldsType = useSelector((state: any) => state.menuItem.fieldsType);
  useEffect(() => {
    if (WS_Connected) return;

    SetReoute(menuItemsState.schema.projectProxyRoute);

    ConnectToWS(setWSMessageAccounting, setWS_Connected)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => console.error("❌ WebSocket setup error", e));
  }, [WS_Connected]);

  // 🧠 Reducer callback to update rows
  const callbackReducerUpdate = async (ws_updatedRows) => {
    // await reducerDispatch({
    //   type: "WS_OPE_ROW",
    //   payload: {
    //     rows: ws_updatedRows.rows,
    //     totalCount: ws_updatedRows.totalCount,
    //   },
    // });
  };

  // 📨 React to WebSocket messages only when valid

  const creditField = getField(
    CreditsSchema.dashboardFormSchemaParameters,
    "credit",
    false
  );

  const pointsField = getField(
    CreditsSchema.dashboardFormSchemaParameters,
    "points",
    false
  );
  const getAction =
    PaymentOptionsActions &&
    PaymentOptionsActions.find(
      (action) => action.dashboardFormActionMethodType.toLowerCase() === "get"
    );
  SetReoute(CreditsSchema.projectProxyRoute);
  const { data, error, isLoading } = useFetch(
    `/${getAction.routeAdderss}`,
    GetProjectUrl()
  );
  useEffect(() => {
    if (!_wsMessageAccounting) return;
    const _handleWSMessage = new WSMessageHandler({
      _WSsetMessage: _wsMessageAccounting,
      fieldsType,
      rows: [data],
      totalCount: 0,
      callbackReducerUpdate,
    });
    _handleWSMessage.process();
    setWSMessageAccounting(null);
  }, [_wsMessageAccounting]);
  return (
    <HStack className="flex-col sm:flex-row justify-between">
      <HStack space="md" className="items-center">
        <Avatar className="bg-body">
          <AvatarFallbackText>{user.Username}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
            }}
          />
        </Avatar>
        <VStack>
          <Text className="text-text text-lg">{user.Username}</Text>
          {data && !isLoading && (
            <VStack>
              <HStack space="xs" className="items-center">
                <FontAwesome
                  name="credit-card"
                  size={14}
                  color={theme.accentHover}
                />
                <Text className="text-primary-custom text-sm">
                  {creditField.parameterTitel}:{""}{" "}
                  {formatCount(data[creditField.lookupDisplayField])}
                </Text>
              </HStack>
              <HStack space="xs" className="items-center">
                <FontAwesome
                  name="star"
                  size={14}
                  className="!text-yellow-400"
                  // color="#facc15"
                />
                <Text className="text-primary-custom text-sm">
                  {pointsField.parameterTitel}:{""} :{" "}
                  {formatCount(data[pointsField.lookupDisplayField])}
                </Text>
              </HStack>
            </VStack>
          )}
        </VStack>
      </HStack>
      <LanguageSelector key={1} />
    </HStack>
  );
};

const LogoutButton = ({ setOpenLogoutAlertDialog }) => {
  const localization = useSelector((state) => state.localization.localization);

  return (
    <Button
      action="secondary"
      variant="outline"
      onPress={() => setOpenLogoutAlertDialog(true)}
      className="mt-4"
    >
      <ButtonText>{localization.Hum_screens.profile.logOut.logOut}</ButtonText>
    </Button>
  );
};

export default MobileProfilePage;
