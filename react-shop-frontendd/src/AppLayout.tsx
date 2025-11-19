import React from 'react'

import Header from './layout/header/Header'
import AppRoutes from './AppRoutes'
import Footer from './layout/footer/Footer'
import AppAlert from './components/AppAlert/AppAlert'
import AppHiddenNiger from './AppHiddenNiger'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

const AppLayout = () => {
  return (
    <ErrorBoundary>
      <Header />
      <AppRoutes />
      <AppAlert />
      <AppHiddenNiger />
      <Footer />
    </ErrorBoundary>
  )
}

export default AppLayout
