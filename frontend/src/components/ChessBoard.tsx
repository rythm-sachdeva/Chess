import { Square } from "chess.js";
import { useState } from "react";

const ChessBoard = ({board}:{board:any}) => {
    const [from,setFrom] = useState<null | Square>(null);
    const [to,setTo] = useState<null | Square>(null);
    
  return (
    <div>
    {
        board.map((row:any,i:any)=>{
            return <div key={i} className='flex'>
                {
                    row.map((square:any,j:any)=>{
                        return <div key={j} className={`w-10 h-10  flex ${(i+j)%2===0? 'bg-[#779556]':'bg-[#EBECD0]'}  justify-center  items-center`}>
                            {square ? square.type : ""}
                        </div>
                    })
                }
                </div>

        })
    }
    </div> 
  )
}

export default ChessBoard