<br />
<p align="center">
  <a href="https://domino-game-ehab.netlify.app/ ">
   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZugKG6CcnRac4CKhi9rWi7HokXpZ0g-WYEg&usqp=CAU" alt="Logo" width="120" height="100">
<h2 align="center"> Domino Game :100:</h2>
<p align="center"> :pushpin: Please  Cick on image to find the live demo 	:rocket:	:rocket: </p>
  </a>
   
       
<details open="open">
  <summary><h3>:point_right: Table of Contents</h3></summary>
  <ol>
    <li>
      <a href="#about-the-project"><h4> :wave: About The Game</h4></a> 
      <ul>
        <li>Dominoes is a family of tile-based games played with gaming pieces, commonly known as dominoes. Each domino is a rectangular tile with a line dividing its face into two square ends.there are 28 tiles each player get randomily 7 tile and select another random tile to start the game Board  </li>
      </ul>
      <ul>
        <li>Who should start ?? According to the tile's count for each player, the payer who has the greatest count will play automatically </li>
      </ul>
            <ul>
        <li>Each player shoud not see the tile's of other one </li>
      </ul>
         <ul>
        <li>The player should choose a tile whose end matches any of the board tile's end ,if the player doesn't have the correct tile, he should draw from the stock </li>
         <li>The Game ends when one player wins by plaing the his last tile </li>
      </ul>
    </li>
    <li>
       <h4>:love_you_gesture:  What I did</h4>
       <ul>
         <li>
         The Game start with the first bage with start button to  start the game 
         </li>
          <li>
         After clicking on the start button the playing page appearing with 13 stocks and the board has random tiles and the tiles shuffled and each player has 7 random tiles the player who has the greatest count will start the play 
         </li>
         <li>The player should choose a tile whose end matches any of the board tile's end ,if the player doesn't have the correct tile, he should draw from the stock </li>
         <li>The Game ends when one player wins by plaing the his last tile </li>
      </ul></li>
     <li>
       <h4> :writing_hand: How I did it </h4>
       <ul>
          <li>first i made an array for 28 array which represents the  stocks</li> 
           <li> i used neasted loops for generate 28 tiles which talie is array  </li> 
         <li> i made shuffleTiles function to shuffle Tiles to make them in rondam order  </li>
         <li>then i create distributeDominoes function to distrbute 7 tiles for each player </li>
         li>Then i used special function to find the sum of tiles numbers for each player using reduce method and comparingCount function to decide who will play first  </li>
         <li> then function to check if the tile is matching to any of board end if not i made function to draw the tile from stock and the playes should  draw until gitting the correct tile if he didn't find the correct tile the the other player will win </li>
     <li> also i have to add functions to update the sock and the player tile according to the player turn and draw tiles </li>
     </ul></li>
      <li>
     <h4> :facepunch:
:fist_oncoming:
:punch: what I faced </h4>
       <ul>
          <li> At the begening I had problem with genrate the stock with  arrays like this  [[1,2],[3,5],......28] so i used  neasted arrays to solve this problem  </li> 
         <li How can i find the sum of neated arrays of each player  </li>
         <li> How can i shufel the tiles  </li>
         <li> How can i find the match for tiles with the ends of the board and revers it to display it in the correct order </li>
      </ul></li>
    
  </ol>
</details>
