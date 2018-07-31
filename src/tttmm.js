let player='X', opponent='O';
export const isMoveLeft=(board)=>
{
	for(var i=0;i<9;++i)
	{
		if(board[i]==='')
			return true;
	}
	return false;
}

export const check=(BOARD)=>
{
  let ways = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(var i=0;i<8;++i)
  {
    if(BOARD[ways[i][0]]===BOARD[ways[i][1]] && BOARD[ways[i][1]]===BOARD[ways[i][2]])
    {
      if(BOARD[ways[i][0]]===player)
        return 10;
      else if(BOARD[ways[i][0]]===opponent)
      	return -10;
    }
  }
  return 0;
}

export const minimax=(BOARD, isPlayer)=>
{
	let score = check(BOARD);

	if(score===10)
		return score;
	else if(score===-10)
		return score;
	else
	{
		/*Draw Case*/
		if(isMoveLeft(BOARD)===false)
			return score;

		if(isPlayer)
		{
			/*cpu turn*/
			let maxVal = -10000;
			for(var p=0;p<9;++p)
			{
				if(BOARD[p]==='')
				{
					BOARD[p]=player;
					maxVal=Math.max(maxVal, minimax(BOARD,!isPlayer)) 
					BOARD[p]='';
				}
			}
			return maxVal;
		}
		else
		{
			let minVal = 10000;
			for(p=0;p<9;++p)
			{
				if(BOARD[p]==='')
				{
					BOARD[p]=opponent;
					minVal=Math.min(minVal, minimax(BOARD,!isPlayer)) 
					BOARD[p]='';
				}
			}
			return minVal;
		}
	}
}

export const findBestMove=(BOARD)=>
{
	let MAX = -1000;
	let move=-1;
	for(var p=0;p<9;++p)
	{
		let temp;
		if(BOARD[p]==='')
		{	
			BOARD[p]=player;
			temp = minimax(BOARD,false);
			BOARD[p]='';
			if(temp > MAX)
			{
				MAX=temp;
				move=p;
			}
		}
	}
	return move;
}
