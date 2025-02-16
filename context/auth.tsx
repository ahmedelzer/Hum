import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { deleteKey, retrieveSecureValue } from "../src/store/zustandStore";
import { DevSettings } from "react-native";
function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [userGust, setUserGust] = useState(false); //TODO:make sure type of  user

  useEffect(() => {
    (async function () {
      const result = await retrieveSecureValue("token");
      console.log("Retrieved token:", result);
      setUser(() => result);
      // if (result.isOk) {
      //   setUser(result.data);
      // }
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
      }}
      {...props}
    />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
