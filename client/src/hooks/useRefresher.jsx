import React, { useCallback } from 'react';
import { useAuth } from './useAuth';
import { authRefresher } from '../api/api';

export default function useRefresherToken() {
    const {setUser, setAccessToken, setLoading} = useAuth();
    const refresher = useCallback(async ()=>{
       try {
          const response = await authRefresher
          setUser(response.data.user);
          setAccessToken(response.data.accessToken)
          return response.data.accessToken
       } catch (err) {
          setUser(null);
          setAccessToken(null)
          return null
       }
       finally{
         setLoading(false)
       }
  }, [setUser, setAccessToken, setLoading])

  return refresher
}
