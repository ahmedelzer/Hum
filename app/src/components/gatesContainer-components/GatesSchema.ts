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

export type GatesContainer = {
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

export const gatesContainer: GatesContainer[] = [
  {
    dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
    schemaType: "GatesContainer",
    idField: "CompanyGroupID",
    dashboardFormSchemaInfoDTOView: {
      dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
      schemaHeader: "Groups",
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
        dashboardFormSchemaParameterID: "b7aad2c8-c766-4dc0-8bbd-eec1e13e6a24",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: true,
        parameterType: "Button",
        parameterField: "companyGroupTitle",
        parameterTitel: "Company Group Title",
        isIDField: false,
        lookupID: "ad9fbe73-1ef5-45fb-afec-901276f740e2",
        lookupReturnField: "companyGroupID",
        lookupDisplayField: "companyGroupTitle",
        indexNumber: 1,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: false,
        parameterType: "VerticalLiveCards",
        parameterField: "consumerGroupID",
        parameterTitel: "Consumer Group",
        isIDField: false,
        lookupID: "568b28c8-a5d4-43a2-a303-da319b912768",
        lookupReturnField: "consumerGroupID",
        lookupDisplayField: "consumerGroupName",
        indexNumber: 2,
      },
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b912767",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: false,
        parameterType: "center",
        parameterField: "consumerGroupID",
        parameterTitel: "Consumer Group",
        isIDField: false,
        lookupID: "568b28c8-a5d4-43a2-a303-da319b912738",
        lookupReturnField: "consumerGroupID",
        lookupDisplayField: "consumerGroupName",
        indexNumber: 3,
      },
    ],
    isMainSchema: true,
    dataSourceName: "",
    projectProxyRoute: "BrandingMart",
    propertyName: null,
    indexNumber: 0,
  },
];
