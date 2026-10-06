const $=id=>document.getElementById(id);
let stream=null, nanoIP="", voiceOn=false, locked=false, target="";
function speak(t){if(voiceOn&&"speechSynthesis"in window){speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(t));}}
async function camera(){try{stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false});$("video").srcObject=stream;$("aiStatus").textContent="AI: CAMERA READY";speak("Camera ready");}catch(e){$("aiStatus").textContent="AI: CAMERA ERROR";alert("Camera permission is required.");}}
async function cmd(c){if(!nanoIP){$("nanoState").textContent="Enter Nano IP first";return}try{await fetch(`http://${nanoIP}/api/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:c,speed:+$("speed").value,target})});}catch(e){$("nanoState").textContent="Nano connection failed"}}
$("camera").onclick=camera;
$("voice").onclick=()=>{voiceOn=!voiceOn;$("voice").textContent=voiceOn?"VOICE ON":"VOICE OFF";if(voiceOn)speak("Voice feedback enabled")};
$("connect").onclick=()=>{nanoIP=$("nano").value.trim();$("nanoState").textContent=nanoIP?`Connected target: ${nanoIP}`:"Not connected";$("status").textContent=nanoIP?"READY":"OFFLINE";$("status").className=nanoIP?"pill ok":"pill"};
$("target").oninput=e=>target=e.target.value.trim();
$("lock").onclick=()=>{target=$("target").value.trim();if(!target)return;locked=true;$("targetStatus").textContent="TARGET: "+target.toUpperCase();$("aiStatus").textContent="AI: LOCK REQUESTED";speak("Locking onto "+target);cmd("lock")};
$("unlock").onclick=()=>{locked=false;$("targetStatus").textContent="TARGET: NONE";$("aiStatus").textContent="AI: READY";speak("Target unlocked");cmd("unlock")};
document.querySelectorAll("[data-cmd]").forEach(b=>b.onclick=()=>cmd(b.dataset.cmd));
$("estop").onclick=()=>{locked=false;cmd("estop");$("aiStatus").textContent="AI: EMERGENCY STOP";speak("Emergency stop")};
$("speed").oninput=e=>$("speedVal").textContent=e.target.value;
if("SpeechRecognition"in window||"webkitSpeechRecognition"in window){const R=window.SpeechRecognition||window.webkitSpeechRecognition;const r=new R();r.continuous=true;r.interimResults=false;r.onresult=e=>{const t=e.results[e.results.length-1][0].transcript.toLowerCase();if(t.includes("stop")){$("estop").click();return}const m=t.match(/lock onto (.+)/);if(m){$("target").value=m[1];$("lock").click()}};try{r.start()}catch(e){}}
