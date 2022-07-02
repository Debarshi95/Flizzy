import React, { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Loader } from 'components'

const HomePage = React.lazy(() => import('./Home/Home'))
const EmployeePasswordPage = React.lazy(() => import('./Employee/UpdatePassword'))
const EmployeeDashboardPage = React.lazy(() => import('./Employee/Dashboard'))
const HRSigninPage = React.lazy(() => import('./HR/Signin'))
const HRDashboardPage = React.lazy(() => import('./HR/Dashboard'))

const App = () => {
  return (
    <div className="min-h-screen bg-slate-800 p-2">
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route path="/employee" element={<Outlet />}>
            <Route
              path="update-password"
              element={
                <Suspense fallback={<Loader />}>
                  <EmployeePasswordPage />
                </Suspense>
              }
            />
            <Route
              index
              path="dashboard"
              element={
                <Suspense fallback={<Loader />}>
                  <EmployeeDashboardPage />
                </Suspense>
              }
            />
          </Route>
          <Route path="/hr" element={<Outlet />}>
            <Route
              index
              path="signin"
              element={
                <Suspense fallback={<Loader />}>
                  <HRSigninPage />
                </Suspense>
              }
            />
            <Route
              index
              path="dashboard"
              element={
                <Suspense fallback={<Loader />}>
                  <HRDashboardPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
