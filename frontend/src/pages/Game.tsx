import React, { useEffect, useState } from 'react'
import ChessBoard from '../components/ChessBoard'
import { useSocket } from '../hooks/useSocket'
import { GAME_OVER, INIT_GAME,MOVE } from '../lib/constants';
import { Chess } from 'chess.js';

const Game = () => {
    const socket = useSocket();
    const [chess,setChess] = useState<any>(new Chess());
    const [board,setBoard] = useState<any>(chess.board());

    useEffect(()=>{
        if(!socket)
             {
                return;
             }
             socket.onmessage = (event)=>{
                const message = JSON.parse(event.data);
                switch (message.type)
                 {
                    case INIT_GAME:
                        console.log("Game is initialized")

                        // setChess(new Chess());
                        setBoard(chess.board());
                        break;
                    case MOVE:
                        console.log("Move is made")
                        const move = message.payload
                        chess.move(move);
                        setBoard(chess.board())
                        break;
                    case GAME_OVER:
                        console.log("Game is over")
                        break;

                 }
             }
    },[socket])
    
    const handlePLay = ()=>{
        socket?.send(JSON.stringify({
            type: INIT_GAME
        }))
    }


  return (
    <div className='justify-center items-center flex h-screen bg-zinc-900'>
     <div className='pt-8 max-w-screen-lg w-full'>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-6'>
            <div className='col-span-4 mb-5 flex items-center justify-center'>
             <ChessBoard board={board} socket={socket} chess = {chess} setBoard={setBoard} />
            </div>
            <div className='col-span-2 flex items-center justify-center'>
                <button onClick={handlePLay} className='font-semibold text-lg px-3 text-white bg-cyan-500  py-2 rounded-md w-full transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-500'>
                    Play
                </button>
            </div>

        </div>

     </div>
    </div>
  )
}

export default Game