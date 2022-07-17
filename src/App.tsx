import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="min-h-screen w-full flexJIC">
        <main className="w-2/3 sm:w-5/12 md:w-4/12 lg:w-4/12">
          <Outlet />
        </main>
    </div>
  )
}

export default App