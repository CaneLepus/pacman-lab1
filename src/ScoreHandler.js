export default class ScoreHandler{
    static player = '';
   constructor(){

   }
   
   printScores() {
           console.log("prints score")
           let List = document.getElementById("highscoreList");
   
           const scores = (() => {
               const value = localStorage.getItem('scores');
               return value === null ? [] : JSON.parse(value);
             })();
           
           List.innerHTML = '';
         
           for (let score of scores) {
             
               let li=document.createElement("LI");
               let text=document.createTextNode(score.player + " ... " + score.score);
               li.appendChild(text);
               List.appendChild(li);
           }
         
           
         }
         
         
   saveScore(score) {
       console.log("Score handler: " + ScoreHandler.currentScore);
           const scores = (() => {
             const value = localStorage.getItem('scores');
             return value === null ? [] : JSON.parse(value);
           })();
         
           scores.push({ player: ScoreHandler.player, score: score });
         
           scores.sort(function (a, b) {
             return b.score - a.score;
           });
         
           while (scores.length > 10) {
             scores.pop();
           }
   
           localStorage.setItem('scores', JSON.stringify(scores));
   
           console.log(localStorage.getItem('scores'));
         
         }
         setName(name){
             ScoreHandler.player = name;
         }
}

