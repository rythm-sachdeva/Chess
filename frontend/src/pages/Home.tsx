import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();
  const handlePlayNow = () => {
    navigate('/game')
  }

  return (
    <div className="h-screen w-full  p-10 items-center justify-center bg-zinc-900">
        <h1 className="text-5xl font-bold text-cyan-400 p-3 mb-10 text-center">
            Chessify
        </h1>
        <div className="flex justify-center items-center gap-10">
        <div className=" w-[30vw] h-[30vw] rounded-lg object-cover">
        <img src="/chess.png" alt="" />
        </div>
        <div className="transition-all duration-150 justify-center ease-in-out flex flex-col gap-5">
          <button onClick={handlePlayNow} className="bg-cyan-400 px-10 rounded-full font-semibold hover:bg-cyan-300 transition-all duration-150 ease-in-out py-5">Play Now</button>
        </div>
        </div>
    </div>
  )
}

export default Home