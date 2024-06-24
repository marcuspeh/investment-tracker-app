export interface ApiResponseModel<dataType> {
  isSuccess: boolean;
  errorCode?: string;
  data?: dataType;
}
