import { onApply } from "../../components/form-container/OnApplay";

export const handleSubmitWithCallback = async ({
  data,
  setDisable,
  action,
  proxyRoute,
  setReq,
  onSuccess,
  isNew = true,
  iDField = null,
  query = null,
}) => {
  setDisable(true);

  try {
    const request = await onApply(
      data,
      iDField,
      isNew,
      action,
      proxyRoute,
      false,
      query
    );
    setReq(request);
    if (request?.success === true) {
      if (onSuccess) onSuccess(request.data);
    } else {
      console.log(request);
    }
  } catch (error) {
    console.error("API call failed:", error);
  } finally {
    setDisable(false);
  }
};
