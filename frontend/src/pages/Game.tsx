import React, { useEffect, useState,useRef } from 'react'
import ChessBoard from '../components/ChessBoard'
import { useSocket } from '../hooks/useSocket'
import { GAME_OVER, INIT_GAME,MOVE } from '../lib/constants';
import { Chess } from 'chess.js';
import { userStore } from '../store/userStore';

const Game = () => {
    const socket = useSocket();
    const [chess,setChess] = useState<any>(new Chess());
    const [board,setBoard] = useState<any>(chess.board());
    //@ts-ignore
    const {searchingOppenent,setSearchingOppenent,yourColor,setYourColor,opponent,setOpponent} = userStore();
    const boardRef = useRef(null);

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
                        setSearchingOppenent(false);
                        setYourColor(message.payload.color);
                        if(message.payload.color === "white")
                        {
                            setOpponent("black")
                        }
                        else
                        {
                            setOpponent("white")
                            //@ts-ignore
                            boardRef.current.style.transform = "rotate(180deg)"
                        }
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
        setSearchingOppenent(true);
        socket?.send(JSON.stringify({
            type: INIT_GAME
        }))
    }


  return (
    <div className='justify-center w-full items-center flex h-screen bg-zinc-900'>
     <div className='pt-8  w-full'>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-6'>
            <div ref={boardRef} className='col-span-4 mb-5 flex items-center justify-center'>
             <ChessBoard board={board} socket={socket} chess = {chess} setBoard={setBoard} />
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col mx-4 md:mr-7 items-center justify-center transition-all ease-out duration-300">
  {searchingOppenent && (
    <div className="text-white mb-3 font-semibold  translate-y-2 animate-fade-in">
      Searching For Opponent
    </div>
  )}
  {
    yourColor &&  <div className="text-white mb-3 font-semibold  translate-y-2 animate-fade-in">
    You are playing as {yourColor}
  </div>
  }
  {
  opponent &&  <div className="text-white mb-3 font-semibold  translate-y-2 animate-fade-in">
  Your Opponent is {opponent}
</div>
  }
  
  <button
    onClick={handlePLay}
    className="font-semibold text-lg  text-white bg-cyan-500 py-2 rounded-md w-full 
      transition-all duration-300 ease-in-out hover:bg-green-500 hover:scale-105"
  >
    Play
  </button>
</div>


        </div>

     </div>
    </div>
  )
}

export default Game