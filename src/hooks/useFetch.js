import { useState, useEffect } from "react";

export default function useFetch(fn, deps=[]){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    let mounted = true;
    fn().then(res=>{
      if(mounted){ setData(res); setLoading(false); }
    });
    return ()=> mounted = false;
  }, deps);
  return { data, loading };
}
