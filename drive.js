
let km=0; let speed=80;
setInterval(()=>{
 km+=speed/60;
 document.getElementById("km").innerText=km.toFixed(1);
},1000);
