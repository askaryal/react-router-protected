import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Landing,Home,Dashboard,Analytics, Admin } from './pages'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {

  const [user, setUser] = useState(null)
  
  const login = () => {
    //request done
    setUser({
      id: 1,
      name: "Petito",
      permissions:[],
      roles:['admin'],
    })
  }
//'analize'
  const logout = () =>  setUser(null)

  return (
    <BrowserRouter>
      <Navigation/>
      {
        user ? (
          <button onClick={ logout }>LogOut</button>
        ): (
          <button onClick={ login }>Login</button>
        )
      }
      <Routes>
        <Route index element={<Landing/>}/>
        <Route path="/landing" element={<Landing/>}/>
        
        <Route element={ <ProtectedRoute isAllowed = { !!user }/>}>
          <Route path="/home" element={<Home/>}/>       
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>


        <Route path="/analytics" element={
          <ProtectedRoute 
            isAllowed={ !!user &&  user.permissions.includes('analize') }
            redirectTo='/'
            >
            <Analytics/>
          </ProtectedRoute>
        }/>
        <Route path="/admin" element={
          <ProtectedRoute 
            isAllowed={ !!user &&  user.roles.includes('admin') }
            redirectTo='/'
            >
            <Admin/>
          </ProtectedRoute>
        }/>


      </Routes>
    </BrowserRouter>
  )
}
        // se puede usar Redux, contex pero en esta ocación se usara props

function Navigation(){
  return <nav>
    <ul>
      <li><Link to="/landing">Landing</Link></li>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/analytics">Analytics</Link></li>
      <li><Link to="/admin">admin</Link></li>
    </ul>
  </nav>
}
export default App
