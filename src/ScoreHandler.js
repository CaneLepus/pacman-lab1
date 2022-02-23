
export default class ScoreHandler{
    static player = '';
    static score = 0;

    constructor(){

    }

    #get_scores (callback){
        let file="/scores.json";// file location
        fetch(file,{cache: "no-cache"}) // fetch
            // If the response isnt OK
             .then(function(response){
                response.json().then(function(data){
                    data.sort(function(a,b){
                        return b.score - a.score;
                    })
                 let scores=JSON.stringify(data);
                
                 console.log(data);
                 callback (scores);
            })
        })
        // If there is an error
        .catch(function(err){
             Errors.innerHTML=err;
        });
   }
   highscores(){
       let List = document.getElementById("highscoreList");
       List.innerHTML = '';
    let list_scores=function (scores){
        let object=JSON.parse(scores);
        for (let i=0; i<object.length; i++){
            let li=document.createElement("LI");
            let text=document.createTextNode(object[i].player + " ... " + object[i].score);
            li.appendChild(text);
            List.appendChild(li);
           if (i===0){
               li.setAttribute("class","top1");
          }
           if (i===1){
               li.setAttribute("class","top2");
          }
           if (i===2){
                       li.setAttribute("class","top3");
          }
       }
   }
   this.#get_scores(list_scores);
}
}