import { useState, useEffect, useRef } from "react";
import { checkUrl } from "../utils/url-util";
import axios from "axios";
import { useToastService } from "./toast/use-toast-service";
import { API_ENDPOINTS } from "../constants/api-endpoints";
const cancelToken = axios.CancelToken.source();
let firstTimeLoading = true;

const useBookService = (topic) => {
  let url = `${API_ENDPOINTS.BASE_URL}/books/?sort=ascending&topic=${topic}&mime_type=image/jpeg`;
  const toast = useToastService();

  const [state, setState] = useState({
    data: null,
    loading: false,
    currentPage: 1,
    allResults: [],
  });

  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const loadData = async (url, page, forceLoad) => {
    if (stateRef?.current?.loading && !forceLoad) return;
    setState((v) => ({ ...v, loading: true }));

    try {
      toast.addToast("Loading data", "success");
      const response = await axios.get(checkUrl(url), {
        cancelToken: cancelToken.token,
      });
      const result = response.data;
      setState((v) => ({
        ...v,
        loading: false,
        allResults: [...v.allResults, ...result.results].sort(
          (a, b) => a.id > b.id
        ),
        currentPage: page,
        data: result,
      }));
    } catch (error) {
      setState((v) => ({ ...v, loading: false }));
    }
  };

  const loadNext = () => {
    const currentData = stateRef?.current?.data;
    if (currentData?.next) {
      const nextPage = currentData.currentPage + 1;
      loadData(currentData.next, nextPage);
    }
  };

  const onSearch = (search) => {
    console.log(search);
    const newUrl = new URL(url);
    newUrl.searchParams.set("search", search);
    setState((v) => ({ ...v, loading: false, allResults: [], page: 1 }));
    loadData(newUrl.href, 1, true);
  };

  useEffect(() => {
    if (!firstTimeLoading) return;
    firstTimeLoading = false;
    console.log("load3");
    loadData(url, state.currentPage);
  }, [url, state.currentPage]);

  const { data, loading, allResults } = state;
  return {
    data,
    loading,
    allResults,
    loadNext,
    onSearch,
    setLoading: () => setState((v) => ({ ...v, loading: true })),
  };
};

export default useBookService;
