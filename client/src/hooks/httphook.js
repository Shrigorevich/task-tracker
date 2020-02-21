import {useCallback} from 'react'

export const useHttp = () => {

   const request = useCallback(async (url, method = "GET", body = null,  headers = {}) => {
      try {
         if(body){
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
         } 
         ///fix
         const response = await fetch(`http://localhost${url}`, {method, body, headers})
         const data = await response.json();

         if (!response.ok){
            throw new Error(data || "Somesong is wrong")
         }

         return data;
      } catch (e) {
         console.log('Err: ', e);
         // setLoading(false)
         // setError(e.message)
         // throw e
      }
   }, [])

   return {request}
}
