import { UseFetchOptions } from "#app";
import { defu } from "defu";
import Swal from "sweetalert2";

export async function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const userToken = getUserToken();
  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiUrl,
    key: url,
    headers: userToken ? { Authorization: "Bearer " + userToken } : {},

    onRequestError({ error }) {
      Swal.fire("Error", error.message, "error");
    },

    onResponseError(_ctx) {
      Swal.fire("Error", _ctx.response._data.message, "error");
    },
  };

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults);

  const { data } = await useFetch(url, params);

  return data;
}
