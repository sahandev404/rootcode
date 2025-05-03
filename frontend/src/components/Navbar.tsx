
const Navbar = ({titile}: {titile: string}) => {
  return (
    <div className="navbar border-black border-2 rounded-md mb-4 text-center h-16 flex items-center justify-center">   
        <h1 className="font-medium">{titile}</h1>
    </div>
  )
}

export default Navbar