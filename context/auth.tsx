import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { deleteKey, retrieveSecureValue } from "../src/store/zustandStore";
import { DevSettings } from "react-native";
import { useDeviceInfo } from "../src/utils/component/useDeviceInfo";
import { jwtDecode } from "jwt-decode";
import { checkOnboarding } from "../src/utils/operation/checkOnboarding";
function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [hasOnboarded, setHasOnboarded] = useState<null | boolean>(false);
  const { os } = useDeviceInfo();
  const [userGust, setUserGust] = useState(os == "web" ? true : false); //TODO:make sure type of  user

  useEffect(() => {
    (async function () {
      const result = await retrieveSecureValue("token");
      const remember = await retrieveSecureValue("rememberMe");
      // const onboarded = await checkOnboarding();
      // setHasOnboarded(onboarded);
      if (remember !== "true") {
        // either "false" or missing → wipe out the token
        await deleteKey("token");
        await deleteKey("rememberMe");
      } else {
        if (result) {
          const decodedToken = jwtDecode(result);
          const user = {
            avatarUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
            ...decodedToken,
          };
          setUser(user);
        }
      }
      setLoading(false);
    })();
  }, []);

  const signOut = useCallback(async () => {
    setUser(undefined);
    await deleteKey("token");
    DevSettings.reload();
  }, []);

  function CheckPortalMenuItem(menuItemID) {
    const usersGroupDashboardMenuItemsJson = JSON.parse(
      user?.UsersGroupDashboardMenuItems
    );

    const menuItemIDFind = usersGroupDashboardMenuItemsJson?.find(
      (item) => item.DashboardItemID === menuItemID
    );
    if (!menuItemIDFind || menuItemID === "home") {
      signOut();
      return false;
    }
    return true;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signOut,
        loading,
        CheckPortalMenuItem,
        notifications,
        setNotifications,
        userGust,
        setUserGust,
        setHasOnboarded,
        hasOnboarded,
      }}
      {...props}
    />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
