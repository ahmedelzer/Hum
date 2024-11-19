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

type LiveGateSchema = {
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
export const liveGateSchema: LiveGateSchema[] = [
  {
    dashboardFormSchemaID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
    schemaType: "LiveGate",
    idField: "CompanyGroupID",
    dashboardFormSchemaInfoDTOView: {
      dashboardFormSchemaID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
      schemaHeader: "Group",
      addingHeader: "Add Group",
      editingHeader: "Edit Group",
    },
    dashboardFormSchemaParameters: [
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b91276b",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: false,
        parameterType: "text",
        parameterField: "companyGroupID",
        parameterTitel: "Company Group ID",
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
        parameterType: "Button",
        parameterField: "consumerGroupID",
        parameterTitel: "Consumer Group",
        isIDField: false,
        lookupID: "568b28c8-a5d4-43a2-a303-da319b912768",
        lookupReturnField: "consumerGroupID",
        lookupDisplayField: "consumerGroupName",
        indexNumber: 1,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: false,
        parameterType: "HorizontalLiveCards",
        parameterField: "menuItemName",
        parameterTitel: "Master Dishe",
        isIDField: false,
        lookupID: "568b28c8-a5d4-43a2-a303-da319b912768",
        lookupReturnField: "menuItemID",
        lookupDisplayField: "menuItemName",
        indexNumber: 2,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: false,
        parameterType: "Chat",
        parameterField: "typing",
        parameterTitel: "....",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 3,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: false,
        parameterType: "Button",
        parameterField: "menuItemID",
        parameterTitel: "My Order",
        isIDField: false,
        // isLoading: false,
        lookupID: "568b28c8-a5d4-43a2-a303-da319b912765",
        lookupReturnField: "menuItemID",
        lookupDisplayField: "menuItemName",
        indexNumber: 4,
      },
    ],
    isMainSchema: true,
    dataSourceName: "",
    projectProxyRoute: "BrandingMart",
    propertyName: null,
    indexNumber: 0,
  },
];
