import { useEffect } from 'react';
import useTicTacToe from '../hook/useTicTacToe';

function Board({ onExit, reloadData }) {
    const playerData = { player1: "Blue", player2: "Red" };
    //Using Custom Hook for Tic-Tac-Toe Logic
    const { board, score, handleClick, getCurrentMessage, resetGame, exitGame } = useTicTacToe(playerData, reloadData);
    const res = getCurrentMessage();

    useEffect(() => {
        //This for setting the current score to localStorage
        localStorage.setItem("playerScore", JSON.stringify(score));
    }, [score]);

    const handleExit = () => {
        localStorage.removeItem("playerScore");
        exitGame();
        onExit();
    }

    return (
        <div className='w-full mx-auto bg-[rgba(0,0,0,0.2)] shadow-2xl p-8 rounded-lg mt-[40%] lg:mt-0'>

            <h2 className='font-bold text-[2rem] text-center text-purple-600 mb-5'>Tic-Tac-Toe Game</h2>

            {/* This logic is for conditional rendering if the player wins or draws then congratulations message and Play again along with score will be shown else game board will be shown */}
            {res.isGameOver ?
                (<div className='flex flex-col justify-center p-2 shadow-sm bg-[rgba(175,247,235,0.2)] mb-5 rounded-lg'>
                    <h3 className='text-center text-[1.5rem] font-bold text-teal-700 '>{res.message}</h3>
                    <button className='text-white font-semibold p-3 rounded-md duration-150 bg-indigo-700 hover:duration-150 hover:bg-indigo-600 mt-5' onClick={resetGame}>Play Again</button>
                </div>) :

                (<div className='grid gap-2 w-full lg:w-[40%] mx-auto' style={{ gridTemplateColumns: `repeat(${3},1fr)` }}>
                    {board.map((item, id) => (
                        <button className={`bg-[#fffffff0] p-5`} key={id} onClick={() => handleClick(id)}>
                            <span className={` ${item ? `opacity-100 font-bold text-[1.5rem] ${item === "X" ? "text-blue-600" : "text-red-600"}` : "opacity-0 font-bold text-[1.5rem]"}`}>{item ? item : "X"}</span>
                        </button>))}
                </div>)}

            <div className='flex gap-3 p-2 justify-between rounded-lg font-semibold bg-white shadow-lg mt-8'>
                <p className='text-blue-600'>Player {playerData.player1}<span> Score : {score ? score.player1Score : 0}</span></p>
                <p className='text-red-600'>Player {playerData.player2}<span> Score : {score ? score.player2Score : 0}</span></p>
            </div>

            <div>
                <button onClick={handleExit} className='text-white font-semibold p-3 rounded-md duration-150 bg-rose-700 hover:duration-150 hover:bg-rose-600 mt-5'>Exit Game</button>
                <p className="opacity-80 text-gray-300 text-[0.8rem]">Exit Game will clear all stored score data of player</p>
            </div>

        </div>
    )
}

export default Board;
