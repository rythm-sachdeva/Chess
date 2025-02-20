
interface Game{
    id: number;
    name: string;
    player1: WebSocket;
    player2:WebSocket;
}

export class GameManager {
   private games: Game[];

   constructor() 
   {
    this.games= [];
   }
   addUser(socket: WebSocket)
    {

    }
    removeUser(socket:WebSocket)
     {

     }
     private handleMessage()
      {

      }
      

}