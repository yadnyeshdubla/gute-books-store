import { useEffect } from "react";

const useScrollService = (onScroll) => {
  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        onScroll();
      }
    } catch (error) {
      console.log(error);
    }
  };
  handelInfiniteScroll.bind(this);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);
};

export default useScrollService;
