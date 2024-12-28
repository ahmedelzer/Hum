type DashboardFormSchemaInfoDTOView = {
  dashboardFormSchemaID: string;
  schemaHeader: string;
  addingHeader: string;
  editingHeader: string;
};

type DashboardFormSchemaParameter = {
  dashboardFormSchemaParameterID: string;
  dashboardFormSchemaID: string;
  isEnable: boolean;
  parameterType: string;
  parameterField: string;
  parameterTitel: string;
  isIDField: boolean;
  lookupID: string | null;
  lookupReturnField: string | null;
  lookupDisplayField: string | null;
  indexNumber: number;
};

type LiveChatSchema = {
  dashboardFormSchemaID: string;
  schemaType: string;
  idField: string;
  dashboardFormSchemaInfoDTOView: DashboardFormSchemaInfoDTOView;
  dashboardFormSchemaParameters: DashboardFormSchemaParameter[];
  isMainSchema: boolean;
  dataSourceName: string;
  projectProxyRoute: string;
  propertyName: string | null;
  indexNumber: number;
};

// Example usage
export const liveChatSchema: LiveChatSchema[] = [
  {
    dashboardFormSchemaID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
    schemaType: "liveChat",
    idField: "chatContentID",
    dashboardFormSchemaInfoDTOView: {
      dashboardFormSchemaID: "d44cabc8-ce1f-477d-9bd8-444dd6e3f67a",
      schemaHeader: "Chat Messages",
      addingHeader: "Add Chat Message",
      editingHeader: "Modify Chat Message",
    },
    dashboardFormSchemaParameters: [
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b91276b",
        dashboardFormSchemaID: "d44cabc8-ce1f-477d-9bd8-444dd6e3f67a",
        isEnable: false,
        parameterType: "text",
        parameterField: "chatContentID",
        parameterTitel: "Chat Content ID",
        isIDField: true,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 0,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: false,
        parameterType: "content",
        parameterField: "chatContent",
        parameterTitel: "chatContent",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 1,
      },
    ],
    isMainSchema: true,
    dataSourceName: "",
    projectProxyRoute: "hum",
    propertyName: null,
    indexNumber: 1,
  },
  {
    dashboardFormSchemaID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
    schemaType: "HorizontalLiveActionCards",
    idField: "chatActionID",
    dashboardFormSchemaInfoDTOView: {
      dashboardFormSchemaID: "d44cabc8-ce1f-477d-9bd8-444dd6e3f67a",
      schemaHeader: "Chat Actions",
      addingHeader: "Add Chat Action",
      editingHeader: "Modify Chat Action",
    },
    dashboardFormSchemaParameters: [
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b91276b",
        dashboardFormSchemaID: "d44cabc8-ce1f-477d-9bd8-444dd6e3f67a",
        isEnable: false,
        parameterType: "text",
        parameterField: "chatActionID",
        parameterTitel: "Chat Action ID",
        isIDField: true,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 0,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "d44cabc8-ce1f-477d-9bd8-444dd6e3f67a",
        isEnable: false,
        parameterType: "image",
        parameterField: "actionImage",
        parameterTitel: "Action Image",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 1,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "d44cabc8-ce1f-477d-9bd8-444dd6e3f67a",
        isEnable: false,
        parameterType: "text",
        parameterField: "actionTitle",
        parameterTitel: "Action Title",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 2,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "d44cabc8-ce1f-477d-9bd8-444dd6e3f67a",
        isEnable: false,
        parameterType: "boxShape",
        parameterField: "actionQuantity",
        parameterTitel: "Action Quantity",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 3,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "d44cabc8-ce1f-477d-9bd8-444dd6e3f67a",
        isEnable: false,
        parameterType: "boxShape",
        parameterField: "availableQuantity",
        parameterTitel: "Available Quantity",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 4,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "d44cabc8-ce1f-477d-9bd8-444dd6e3f67a",
        isEnable: false,
        parameterType: "boxShape",
        parameterField: "actionQuantity",
        parameterTitel: "Action Quantity",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 5,
      },
    ],
    isMainSchema: false,
    dataSourceName: "",
    projectProxyRoute: "hum",
    propertyName: null,
    indexNumber: 0,
  },
];
