import { Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HeaderMenu from './components/ui/layout/HeaderMenu'
import AppToaster from './components/ui/toast/AppToaster'
import { ROUTES } from './navigation/routes'
import { appRoutes } from './navigation/route-config'

const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AppToaster />
      <HeaderMenu />
      <Routes>
        <Route path={ROUTES.root} element={<Navigate replace to={ROUTES.cats} />} />
        {appRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path='*' element={<Navigate replace to={ROUTES.cats} />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
