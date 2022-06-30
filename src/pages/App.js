import React, { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

const HomePage = React.lazy(() => import('./Home/Home'))
const UserPage = React.lazy(() => import('./User/User'))
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
              <Suspense fallback={<h1>Hello</h1>}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            index
            path="/profile/:username"
            element={
              <Suspense fallback={<h1>Hello</h1>}>
                <UserPage />
              </Suspense>
            }
          />
          <Route path="/hr" element={<Outlet />}>
            <Route
              index
              path="signin"
              element={
                <Suspense fallback={<h1>Hello</h1>}>
                  <HRSigninPage />
                </Suspense>
              }
            />
            <Route
              index
              path="dashboard"
              element={
                <Suspense fallback={<h1>Hello</h1>}>
                  <HRDashboardPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App
