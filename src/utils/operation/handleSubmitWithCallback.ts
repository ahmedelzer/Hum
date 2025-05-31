import { onApply } from "../../components/form-container/OnApply";

export const handleSubmitWithCallback = async ({
  data,
  setDisable,
  action,
  proxyRoute,
  setReq,
  onSuccess,
  isNew = true,
  iDField = null,
}) => {
  setDisable(true);

  try {
    const request = await onApply(
      data,
      iDField,
      isNew,
      action,
      proxyRoute,
      false
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
