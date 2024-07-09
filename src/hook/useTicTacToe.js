import { useState } from "react";

const useTicTacToe = (playerData,reloadData)=>{
    const [board,setBoard] = useState(new Array(9).fill(null));
    const [isXPlayerTurn, setIsXPlayerTurn] = useState(true);
    const [score,setScore] = useState({player1Score:reloadData ? reloadData.player1Score : 0,player2Score:reloadData ? reloadData.player2Score : 0});
    const {player1,player2} = playerData;
      
    const winner_pattern = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    const getWinner = (currentBoard)=>{
        for(let i=0;i<winner_pattern.length;i++){
            const [a,b,c] = winner_pattern[i];
            if(currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c])
                return currentBoard[a];
        }
        return null;
    }

    const handleClick = (id)=>{
        const winner = getWinner(board);
        if(winner || board[id] !== null) return;
        const newBoard = [...board];
        newBoard[id] = isXPlayerTurn ? "X" : "O";
        setBoard(newBoard);
        setIsXPlayerTurn(!isXPlayerTurn);
        const winnerName = getWinner(newBoard);
        calculateScore(winnerName);
    }

    const calculateScore = (winnerName)=>{
        if(winnerName === "X")
            setScore((prev)=>({...prev,player1Score:prev.player1Score + 1}));
        else if(winnerName === "O")
            setScore((prev)=>({...prev,player2Score:prev.player2Score + 1}));   
    }

    const getCurrentMessage = ()=>{
        //This is for getting current status of the game
        const winner = getWinner(board);
        if(winner)
            return {isGameOver:true,message:`Player ${winner === "X" ? player1 : player2} won the game.`}
        if(!board.includes(null))
            return {isGameOver:true,message:"Game is Draw."}
        else
            return {isGameOver:false, message:`Player ${isXPlayerTurn ? "X" : "O"} turn is now.`}
    }

    const resetGame = ()=>{
        setBoard(new Array(9).fill(null));
        setIsXPlayerTurn(true);
    }

    const exitGame = ()=>{
        resetGame();
        setScore({player1Score:0,player2Score:0})
    }

    return {board,getCurrentMessage,handleClick,resetGame,score,exitGame};
}

export default useTicTacToe;