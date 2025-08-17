import '@ant-design/v5-patch-for-react-19';
import { Outlet } from "react-router-dom"




const App = () => {
  return (
    <div>
     <Outlet/>
     
    </div>
  )
}

export default App
