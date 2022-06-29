import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const HomePage = React.lazy(() => import('./Home/Home'))
const UserPage = React.lazy(() => import('./User/User'))

const App = () => {
  return (
    <div className="h-screen bg-gray-200">
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
