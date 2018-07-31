import React, { Component } from 'react';
import './App.css';
import * as ai from './tttmm.js';
import Particles from 'react-particles-js';
const particleOptions = {
  particles: {
    number:{
      value:200
    }
  }
};
class App extends Component {    
  constructor()
  {
    super();
    this.board = new Array(9).fill('');
    this.state = {
      turn:'O',
      gameOver:false,
      winner:'',
      moves:0
    };
  }  
  check = () =>
  {
      var ways = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for(var i=0;i<8;++i)
      {
        let streak = true;
        for(var j=0;j<3;++j)
        {
          if(this.board[ways[i][j]]===this.state.turn)
            continue;
          else
          {
            streak=false;
            break;
          }
        }
        if(streak)
        {
          this.state.gameOver=true;
          this.state.winner=this.state.turn;
          this.refs.status.innerHTML=`AI (X) WON!`;
          break;
        }
      }
  }
  makeMove = (i) =>
  {
      
      switch(i){
        case 0 : return this.refs.x0;
                 break;
        case 1 : return this.refs.x1;
                 break; 
        case 2 : return this.refs.x2;
                 break;
        case 3 : return this.refs.x3;
                 break;
        case 4 : return this.refs.x4;
                 break;
        case 5 : return this.refs.x5;
                 break;
        case 6 : return this.refs.x6;
                 break;
        case 7 : return this.refs.x7;
                 break;
        case 8 : return this.refs.x8;
                 break;    
        default: return this.refs.x1;              
      }
  }
  onClickEvent = (event) =>
  {

      if(event.target.dataset.played==="false" && this.state.gameOver===false)
      {
          this.state.moves++;  
          this.board[event.target.dataset.id]=this.state.turn;
          event.target.innerHTML=this.state.turn;
          this.state.turn="X";
          this.check();
          if(this.state.moves===9)
          {
            this.refs.status.innerHTML=`MATCH DRAWN!!`;
            this.setState({txtc:"maroon"});
            this.state.gameOver=true;
            return;
          }
          if(this.state.gameOver===false)
          {
              let move = ai.findBestMove(this.board);
              this.makeMove(Number(move)).innerHTML=this.state.turn;
              this.board[move]=this.state.turn;
              this.makeMove(Number(move)).dataset.played=true;
              this.check();
              this.state.turn="O";
              this.state.moves++;
          }
      }      
  }
  ngClick = (event) =>
  {
      window.location.reload();
  }
  render() {

    return (
      <div clas>
        <Particles params={particleOptions} className="particles"/>
        <h1 className="tc headT"> The Unbeatable TicTacToe </h1>
        <div className="boardPos">
          <div className="grid">
            <div className="box grow blue " ref="x0" data-id='0' data-played={false} onClick={this.onClickEvent}></div> 
            <div className="box grow blue " ref="x1" data-id='1' data-played={false} onClick={this.onClickEvent}></div>
            <div className="box grow blue " ref="x2" data-id='2' data-played={false} onClick={this.onClickEvent}></div>
            <div className="box grow blue " ref="x3" data-id='3' data-played={false} onClick={this.onClickEvent}></div>
            <div className="box grow blue " ref="x4" data-id='4' data-played={false} onClick={this.onClickEvent}></div>
            <div className="box grow blue " ref="x5" data-id='5' data-played={false} onClick={this.onClickEvent}></div>
            <div className="box grow blue " ref="x6" data-id='6' data-played={false} onClick={this.onClickEvent}></div>
            <div className="box grow blue " ref="x7" data-id='7' data-played={false} onClick={this.onClickEvent}></div>
            <div className="box grow blue " ref="x8" data-id='8' data-played={false} onClick={this.onClickEvent}></div>
          </div>
        </div>
        <h4 ref="status" className={`tc scoreCSS`}> You are O. AI is X. Make your move. </h4>
        <div className="justify-center flex">
          <button className="btn f6 link dim ph3 pv2 mb2 dib white bg-dark-blue" onClick={this.ngClick}>New Game</button>
        </div>
        <div className="tc foot">
            Made with ReactJS, JS, HTML5, CSS3 and mostly love. Happy playing. 
        </div>
      </div>
    );
  }
}

export default App;
