import { Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../lib/constants";

const ChessBoard = ({board,socket,chess,setBoard}:{board:any,socket:WebSocket,chess:any,setBoard:any}) => {
    const [from,setFrom] = useState<null | Square>(null);
    const [to,setTo] = useState<null | Square>(null);
    // const socket = useSocket();
   
     
  return (
    <div>
    {
        board.map((row:any,i:any)=>{
            return <div key={i} className='flex'>
                {
                    row.map((square:any,j:any)=>{
                        const squareRepresentation = String(String.fromCharCode(97+j) + "" + (8-i)) as Square;
                        // console.log(squareRepresentation)
                        return <div  key={j}
                        onClick={()=>{
                             console.log("inside onclck")
                             console.log(squareRepresentation)
                            if(!from)
                                 {
                                    setFrom(squareRepresentation)
            

                                 }
                                 else
                                 {
                                    
                                            socket.send(JSON.stringify({
                                                type: MOVE,
                                                move: {
                                                    from,
                                                    to: squareRepresentation
                                                   
                                                }}))
                                                console.log("moves went successfully")
                                                const move = {
                                                    from,
                                                    to: squareRepresentation    
                                                }
                                                setFrom(null)
                                                chess.move(move)
                                                setBoard(chess.board())
                                                
                                        
                                 }
                        }}
                        
                        className={`w-10 h-10 cursor-pointer flex ${(i+j)%2===0? 'bg-[#779556]':'bg-[#EBECD0]'}  justify-center  items-center`}>
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