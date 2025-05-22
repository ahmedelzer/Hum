import APIHandling from "../../../components/hooks/APIsFunctions/APIHandling";
import { SetReoute } from "../../../request";

export const RunsSpacialAction = async (
  name,
  id,
  value,
  actions,
  projectProxyRoute = false,
  setLoading = (o) => {}
) => {
  const action = actions.find(
    (ac) => ac.dashboardFormActionMethodType.split(":")[1] === name
  );
  const actionWithRightNameAction = action
    ? {
        ...action,
        dashboardFormActionMethodType:
          action.dashboardFormActionMethodType.split(":")[0], // remove the ":name"
      }
    : null;

  if (action) {
    setLoading(true); // Disable the switch
    projectProxyRoute && SetReoute(projectProxyRoute);
    const result = await APIHandling(
      actionWithRightNameAction.routeAdderss + "/" + id,
      actionWithRightNameAction.dashboardFormActionMethodType?.split(":")[0],
      value
    );
    console.log(result);

    if (result && result.success) {
      setLoading(false);
      return true;
    } else {
      return false;
    }
  }
};
