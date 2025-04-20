import { createApi, fetchBaseQuery, RootState } from "@reduxjs/toolkit/query/react";
import { baseConfig } from "../../config/base-config";
import { setLoader, setProgress } from "../reducer/loader";
import { setMessage } from "../reducer/commonResMessage";

const baseQuery = fetchBaseQuery({
  baseUrl: baseConfig.baseUrl,
  prepareHeaders: async (headers: any, { getState, endpoint }: any) => {
    headers.set("Content-Type", `application/json`);
    headers.set(
      "Strict-Transport-Security",
      `max-age=86400; includeSubDomains`
    );

    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } 
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  if (typeof args.loader === "undefined" || args.loader === true) {
    //console.log('apidata',api.endpoint)
    nprogress.start(args, api);
  }

  let result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 404) {
    if (typeof args.loader === "undefined" || args.loader === true) {
      nprogress.complete(args, api);
    }
    return api.dispatch(
      setMessage({ status: true, type: "error", message: "API Not Found" })
    );
  } else if (result?.error?.status === 403) {
    debugger;
    if (typeof args.loader === "undefined" || args.loader === true) {
      nprogress.complete(args, api);
    }
    const refreshResult = await baseQuery("/user/refresh", api, extraOptions);
    if (refreshResult?.data) {
      result = await baseQuery(args, api, extraOptions);
    }
  } else if (result?.error?.status === 400) {
    if (typeof args.loader === "undefined" || args.loader === true) {
      nprogress.complete(args, api);
    }

    return result;
    // return api.dispatch(
    //   setMessage({ status: true, type: "error", message: "Missing Field" })
    // );
  } else if (result?.error?.status === 401 && api?.endpoint !== "login") {
    if (typeof args.loader === "undefined" || args.loader === true) {
      nprogress.complete(args, api);
    }
   
    localStorage.clear();
    return api.dispatch(
      setMessage({ status: true, type: "error", message: "Unauthorized" })
    );
  }

  if (
    !result?.data?.success &&
    api?.endpoint != "login"
  ) {
    //console.log("api?.endpoint",api?.endpoint);
    if (
      result?.data?.error != "No Record Found" &&
      result?.data?.error != "No Customer Present" &&
      result?.data?.error != "No user found with that email" &&
      result?.data?.error != "No cases are created by an agent"
    ) {
      api.dispatch(
        setMessage({
          status: true,
          type: "error",
          message: result?.data?.error,
        })
      );
    }
  }
  if (typeof args.loader === "undefined" || args.loader === true) {
    nprogress.complete(args, api);
  }
  return result;
};

const nprogress = {
    counter: 0,
    start: function (args: any, api: any) {
      this.counter++;
      if (
        this.counter > 0 
      ) {
        //console.log('api?.endpoint',args)
        //console.log('api?.endpoint api',api.endpoint)
        if (
          typeof args.confirmLoader !== "undefined" &&
          args.confirmLoader === true
        ) {
          api.dispatch(setLoader(true));
        } else {
          api.dispatch(setProgress(true));
        }
      }
    },
    complete: function (args: any, api: any) {
      this.counter--;
      if (this.counter === 0) {
        if (
          typeof args.confirmLoader !== "undefined" &&
          args.confirmLoader === true
        ) {
          api.dispatch(setLoader(false));
        } else {
          api.dispatch(setProgress(false));
        }
      }
    },
  };

  export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder: any) => ({}),
  });