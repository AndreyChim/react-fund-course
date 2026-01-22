import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from '../router';

const AppRouter = () => {
  return (
      <Routes>
          {privateRoutes.map(route => 
              <Route
                  key={route.path}    
                  path={route.path}
                  element={route.element}
              />
          )}
          {publicRoutes.map(route => 
              <Route
                  key={route.path}    
                  path={route.path}
                  element={route.element}
              />
          )}
          <Route path='*' element={<Navigate to='/posts' replace />} />
      </Routes>
  )
}

export default AppRouter
