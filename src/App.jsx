import { useEffect, useState } from 'react';
import Board from './component/Board';
import './index.css';

function App() {
  const [isStart, setIsStart] = useState(false);
  const [localData, setLocalData] = useState();

  useEffect(() => {
    //This is for fetching scores of users at the first time
    const res = localStorage.getItem("playerScore");
    setLocalData(JSON.parse(res));
  }, [isStart]);


  return (
    <div className='bg-orange-200 h-screen w-full'>
      <div className='max-w-[90%] lg:max-w-[60%] mx-auto'>

        {!isStart && <div className='flex justify-center flex-col gap-5 pt-[15%]'>
          <h1 className='font-bold text-[2rem] text-indigo-700 text-center'>Hello Players, Welcome</h1>
          <button onClick={() => setIsStart(true)} className='text-white font-semibold p-3 rounded-md duration-150 bg-indigo-700 hover:duration-150 hover:bg-indigo-600'>Click To Start Tic-Tac-Toe Game</button>
        </div>}

        <div className='pt-[7%]'>
          {isStart && <Board onExit={() => setIsStart(false)} reloadData={localData} />}
        </div>

      </div>
    </div >
  )
}

export default App;