
let songs=[];
let songIndex=0;
let first=true;
let masterplay=document.getElementById('masterplay');
let myProgressBar=document.getElementById('progress');
let gif=document.getElementById('gif');
let audioElement;
let firstsong;
let firstplay=false;
function create_playlist(files){
    console.log(files);
    console.log('1');
    firstsong=files[0].name;
    if(first){
        var playlist=document.querySelector(".songList");
       var str="";
        for(var one=0;one<files.length;one++){
            if(files[one].type!="audio/mpeg"){
                continue;
            }
            let ha=toString(one);
            songs.push(files[one].name);
            str+="<div class='song'> <span>"+files[one].name+"</span> <span class='songPlay'><i id="+"\""+one+"\""+" class='fa-regular songItemPlay fa-circle-play'></i></span>"+"</div>";
        }
        first=false;
        playlist.innerHTML=str;
        
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.addEventListener('click',(e)=>{
            makeAllPlayes();
            songIndex=parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src=songs[songIndex];
            audioElement.play();
            audioElement.currentTime=0;
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
        })
    }) 
    }
}

audioElement=new Audio(firstsong);

const makeAllPlayes=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
           element.classList.remove('fa-pause-circle');
           element.classList.add('fa-play-circle');
    }) 
 }
        //listen to events
    audioElement.addEventListener('timeupdate',()=>{
        console.log('timeupdate');
        //update seekbar
        Progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
        myProgressBar.value=Progress;
        
        })
    myProgressBar.addEventListener('change',()=>{
        var value=myProgressBar.value*audioElement.duration/100;
        if(isFinite(value)){
            audioElement.currentTime=value;
        }
        
        })
        
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0 || (songIndex===0 && firstplay===false)){
        audioElement.src=songs[songIndex];
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        firstplay=true;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        firstplay=true;
    }
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=songs.length-1){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=songs[songIndex];
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
})
document.getElementById('prev').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=songs.length-1;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=songs[songIndex];
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
})






