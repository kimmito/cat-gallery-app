import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HeaderMenu from './components/ui/layout/header-menu/HeaderMenu'
import AllCats from './screens/all-cats/AllCats'
import Favorites from './screens/favorites/Favorites'

const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <HeaderMenu />
      <Routes>
        <Route path='/' element={<Navigate replace to='/home'/>} />
        <Route path='/home' element={<AllCats />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='*' element={<Navigate replace to='/home'/>} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
