interface DashboardFormSchemaParameter {
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
}

interface DashboardFormSchema {
  dashboardFormSchemaID: string;
  schemaType: string;
  idField: string;
  dashboardFormSchemaParameters: DashboardFormSchemaParameter[];
  isMainSchema: boolean;
  dataSourceName: string | null;
  projectProxyRoute: string;
  propertyName: string | null;
  indexNumber: number;
}

export const loginFormSchema: DashboardFormSchema = {
  dashboardFormSchemaID: "270f513b-1788-4c01-879e-4526c990f899",
  schemaType: "Login",
  idField: "id",
  dashboardFormSchemaParameters: [
    {
      dashboardFormSchemaParameterID: "bbc47b3c-baba-4c80-8a8e-50d9875a15d6",
      dashboardFormSchemaID: "270f513b-1788-4c01-879e-4526c990f899",
      isEnable: true,
      parameterType: "username",
      parameterField: "username",
      parameterTitel: "Username",
      isIDField: false,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
    {
      dashboardFormSchemaParameterID: "38ad2bc8-7d4f-46a5-9a59-8a2104e960f4",
      dashboardFormSchemaID: "270f513b-1788-4c01-879e-4526c990f899",
      isEnable: true,
      parameterType: "password",
      parameterField: "password",
      parameterTitel: "password",
      isIDField: false,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
  ],

  isMainSchema: true,
  dataSourceName: null,
  projectProxyRoute: "BrandingMartSecurity",
  propertyName: null,
  indexNumber: 0,
};
