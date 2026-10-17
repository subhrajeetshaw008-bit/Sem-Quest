var S0=new Date(2026,9,16),N=56,DN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],MN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function key(d){return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
function plan(d){
  var dow=d.getDay(),diff=Math.round((d-S0)/864e5),wk=Math.floor(diff/7),late=diff>=31;
  var D=["Complexity + searching","Stacks & queues","Linked lists + basic sorting (bubble, selection, insertion)","Trees (BST, AVL, heaps)","Graphs (BFS, DFS, Dijkstra) + merge/quick sort","Hashing + sorting revision","Mixed DSA revision"];
  var P=["Core revision + NumPy basics","Pandas basics (DataFrames)","Pandas: filtering, sorting","Pandas + simple plots","Matplotlib (bar, histogram, scatter)"];
  var L=["DSA lab programs","Digital Fundamentals lab","Python lab","DSA lab programs","Digital Fundamentals lab","Python lab","Viva questions, all 3 labs"];
  var dsa="DSA: "+D[Math.min(wk,6)]+" (1.5 hrs)";
  var py=late?"Python revision (30 min)":"Python: "+P[Math.min(wk,4)]+" (1.5 hrs)";
  var lab="Lab practice: "+L[Math.min(wk,6)]+" (1 hr)";
  var first="Exam study: ",second=late?"Timed past paper: ":"Exam study: ";
  var G=["9:30 PM","Genshin Impact (1.25 hrs)","game"],WD=["10:45 PM","Wind down","rest"],SL=["11:30 PM","Sleep","rest"];
  var coll6=[["9:00 AM","College (till 6 PM)","rest"],["6:30 PM","Rest + dinner","rest"]];
  var aft=[["9:00 AM","College (till 1 PM)","rest"],["1:30 PM","Lunch + rest","rest"]];
  var mt=[["4:30 PM","Break: snack + walk","rest"],["5:15 PM",dsa,"dsa"],["6:45 PM","Free time + dinner","rest"]];
  var r;
  if(dow==1){r=aft.concat([["2:30 PM",first+"Probability & Statistics (2 hrs)","study"]],mt,[["8:00 PM",py,"py"],G,["10:45 PM","Wind down, no screens/study","rest"],SL]);}
  else if(dow==2){r=aft.concat([["2:30 PM",first+"Digital Fundamentals & Architecture (2 hrs)","study"]],mt,[["8:00 PM",lab,"py"],["9:00 PM","Recap: write 5 key points from this week's study (30 min)","study"],G,["10:45 PM","Wind down, no screens/study","rest"],SL]);}
  else if(dow==3){r=coll6.concat([["7:30 PM",first+"Artificial Intelligence (2 hrs)","study"],G,WD,SL]);}
  else if(dow==4){r=coll6.concat([["7:30 PM",first+"Automata Theory (2 hrs)","study"],G,WD,SL]);}
  else if(dow==5){r=coll6.concat([["7:30 PM",second+"Automata Theory (2 hrs)","study"],G,WD,SL]);}
  else if(dow==6){r=[["9:00 AM",second+"Probability & Statistics (2 hrs)","study"],["11:00 AM","Break","rest"],["1:00 PM","Lunch + rest","rest"],["2:30 PM",second+"Digital Fundamentals (1 hr), 10-min break, then Artificial Intelligence (1 hr)","study"],["4:40 PM",dsa,"dsa"],["6:10 PM","Outing / hobby / friends","rest"],["7:30 PM","Dinner","rest"],["8:30 PM","Genshin Impact","game"],SL];}
  else{r=[["10:00 AM","Economics for Engineers (1 hr)","study"],["11:00 AM","Weekly recap + catch-up of anything missed this week (1 hr)","study"],["12:00 PM","Rest day starts: no more study","rest"],["Afternoon","Genshin Impact + relax (as long as you like)","game"],["Optional","Mini-project (Python or DSA), only if you feel like it","py"],["Evening","Prep bag/laptop for Monday, plan the week (15 min)","rest"],["11:00 PM","Sleep","rest"]];}
  return r;
}
const $=id=>document.getElementById(id);
const h=(t,a={},...c)=>{const e=document.createElement(t);for(const k in a){if(k==='class')e.className=a[k];else if(k.startsWith('on'))e.addEventListener(k.slice(2),a[k]);else if(k in e)e[k]=a[k];else e.setAttribute(k,a[k])}c.flat().forEach(x=>e.append(x));return e};
const KEY='sem3-quest-v1';
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!S.t)S={t:{},c:{},o:{}};S.c=S.c||{};S.o=S.o||{};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const days=[];for(let i=0;i<N;i++)days.push(new Date(S0.getFullYear(),S0.getMonth(),S0.getDate()+i));
const now=new Date(),td=new Date(now.getFullYear(),now.getMonth(),now.getDate());
let sel=0;days.forEach((d,i)=>{if(d<=td)sel=i});
let editing=null,snap=null,tt;

function items(d){const k=key(d),o=S.o[k]||{},a=[];
  plan(d).forEach((p,i)=>{const id='p'+i,ov=o[id];if(ov&&ov.del)return;a.push({id,time:p[0],text:(ov&&ov.text)||p[1],orig:p[1],kind:p[2]})});
  (S.c[k]||[]).forEach(c=>a.push({id:c.id,time:c.time||'Extra',text:c.text,orig:c.text,kind:'bonus',custom:1}));return a}
const xp=x=>x.kind==='study'||x.kind==='dsa'?20:x.kind==='py'?(x.time==='Optional'?25:15):x.kind==='bonus'?10:x.kind==='rest'&&x.orig==='Sleep'?5:0;
const req=x=>(x.kind==='study'||x.kind==='dsa'||x.kind==='py')&&x.time!=='Optional';
function lvl(x){let L=1,n=150;while(x>=n){x-=n;L++;n+=50}return{L,x,n}}
const RK=["Rookie","Apprentice","Scholar","Adept","Master","Grandmaster","Legend"];
function calc(){const r={tot:0,cnt:0,best:0,perf:0,full:[],rq:[],rd:[],dxp:[],mult:1},ra=[];let run=0;
  for(let i=0;i<N;i++){const t=S.t[key(days[i])]||{};let b=0,q=0,dn=0;
    items(days[i]).forEach(x=>{if(t[x.id]){b+=xp(x);r.cnt++}if(req(x)){q++;if(t[x.id])dn++}});
    const f=q>0&&dn===q,m=1+.1*Math.min(run,10),dx=Math.round((b+(f?50:0))*m);
    r.tot+=dx;r.dxp.push(dx);r.full.push(f);r.rq.push(q);r.rd.push(dn);
    if(days[i]<=td&&+days[i]===+td)r.mult=m;
    run=f?run+1:0;ra.push(run);r.best=Math.max(r.best,run);if(f)r.perf++}
  let ti=0;days.forEach((d,i)=>{if(d<=td)ti=i});
  r.streak=r.full[ti]?ra[ti]:(ti>0?ra[ti-1]:0);return r}
const BADGES=[
 {n:'First step',d:'Tick your first task',f:r=>r.cnt>=1},
 {n:'Perfect day',d:'Finish every focus block in a day',f:r=>r.perf>=1},
 {n:'On a roll',d:'3 perfect days in a row',f:r=>r.best>=3},
 {n:'Week warrior',d:'7 perfect days in a row',f:r=>r.best>=7},
 {n:'Fortnight',d:'14 perfect days in a row',f:r=>r.best>=14},
 {n:'Unstoppable',d:'28 perfect days in a row',f:r=>r.best>=28},
 {n:'Centurion',d:'Tick 100 tasks',f:r=>r.cnt>=100},
 {n:'Scholar',d:'Reach level 5',f:r=>lvl(r.tot).L>=5}];

function toast(msg,undo){$('tmsg').textContent=msg;$('undo').style.display=undo?'':'none';$('toast').style.display='flex';clearTimeout(tt);tt=setTimeout(()=>$('toast').style.display='none',undo?6000:3500)}
$('undo').onclick=()=>{if(snap){S=JSON.parse(snap);snap=null;save();render()}$('toast').style.display='none'};
function tick(it,on){const k=key(days[sel]),b=calc();(S.t[k]=S.t[k]||{})[it.id]=on;save();const a=calc();render();
  const df=a.tot-b.tot;let m=(df>=0?'+':'')+df+' XP';
  if(a.full[sel]&&!b.full[sel])m+=' · Day complete!';
  if(lvl(a.tot).L>lvl(b.tot).L)m+=' · Level up! Level '+lvl(a.tot).L;
  BADGES.forEach(x=>{if(x.f(a)&&!x.f(b))m+=' · Badge: '+x.n});
  if(df!==0||m.length>10)toast(m)}
function remove(it){const before=JSON.stringify(S),k=key(days[sel]);
  if(it.custom)S.c[k]=S.c[k].filter(c=>c.id!==it.id);else(S.o[k]=S.o[k]||{})[it.id]={del:1};
  save();render();snap=before;toast('Task removed',1)}
function rename(it,v){v=v.trim();editing=null;const k=key(days[sel]);
  if(v){if(it.custom)S.c[k].find(c=>c.id===it.id).text=v;else(S.o[k]=S.o[k]||{})[it.id]={text:v};save()}render()}

function row(it,r,future){const t=S.t[key(days[sel])]||{},on=!!t[it.id];
  const lock=it.kind==='game'&&days[sel].getDay()%6!==0&&r.rd[sel]<r.rq[sel];
  const li=h('label',{class:'it k-'+it.kind+(on?' done':'')+(lock?' lock':'')});
  li.append(h('input',{type:'checkbox',checked:on,disabled:future||(lock&&!on),'aria-label':it.text,onchange:e=>tick(it,e.target.checked)}));
  const x=h('span',{class:'x'});
  if(editing===it.id){const inp=h('input',{class:'ed',value:it.text,maxLength:140,'aria-label':'Edit task',
    onkeydown:e=>{if(e.key==='Enter'){e.preventDefault();rename(it,inp.value)}if(e.key==='Escape'){editing=null;render()}},
    onblur:()=>{if(editing===it.id)rename(it,inp.value)}});
    x.append(h('span',{class:'t'},it.time),inp);setTimeout(()=>{inp.focus();inp.select()});li.append(x);return li}
  const p=xp(it);
  x.append(h('span',{class:'t'},it.time+(lock&&!on?' · Locked until focus blocks are done':'')),h('span',{class:'tx'},it.text),p?h('span',{class:'xp'},'+'+p+' XP'):'');
  li.append(x,h('span',{class:'act'},
    h('button',{class:'link',type:'button',onclick:e=>{e.preventDefault();editing=it.id;render()},'aria-label':'Edit '+it.text},'Edit'),
    h('button',{class:'link danger',type:'button',onclick:e=>{e.preventDefault();remove(it)},'aria-label':'Remove '+it.text},'Remove')));
  return li}

function render(){const r=calc(),lv=lvl(r.tot),d=days[sel],future=d>td;
  $('lvn').textContent=lv.L;$('rk').textContent=RK[Math.min(6,Math.floor((lv.L-1)/2))];
  $('xpb').style.width=lv.x/lv.n*100+'%';$('xt').textContent=lv.x+' / '+lv.n+' XP to level '+(lv.L+1)+' · '+r.tot+' XP total';
  const ch=$('chips');ch.replaceChildren(h('span',{class:'chip'},r.streak+(r.streak===1?' day':' days')+' in a row'),h('span',{class:'chip'},'x'+r.mult.toFixed(1)+' today'));
  const left=Math.ceil((new Date(2026,11,10)-td)/864e5);
  $('cd').textContent=left>0?left+' days until exams start (around 10 Dec)':'Exam time. You have got this.';
  const ds=$('days');ds.replaceChildren();
  days.forEach((x,i)=>{const b=h('button',{type:'button',class:'d'+(i===sel?' sel':'')+(+x===+td?' today':'')+(r.full[i]?' ok':''),onclick:()=>{sel=i;editing=null;render()}},DN[x.getDay()],h('b',{},x.getDate()),MN[x.getMonth()]+(r.full[i]?' ✓':''));ds.append(b)});
  const s=ds.children[sel];if(s&&s.scrollIntoView)s.scrollIntoView({inline:'center',block:'nearest'});
  const L=$('list');L.replaceChildren();
  if(future)L.append(h('p',{class:'sub'},'This day opens on '+d.toDateString()+'. You can still edit its tasks.'));
  items(d).forEach(it=>L.append(row(it,r,future)));
  $('c').textContent=r.rq[sel]?r.rd[sel]+' of '+r.rq[sel]+' focus blocks done':'No focus blocks today';
  $('dx').textContent='+'+r.dxp[sel]+' XP today';
  $('fill').style.width=(r.rq[sel]?r.rd[sel]*100/r.rq[sel]:0)+'%';
  const bd=$('bd');bd.replaceChildren();
  BADGES.forEach(x=>{const on=x.f(r);bd.append(h('div',{class:'bg'+(on?' on':'')},h('b',{},(on?'★ ':'')+x.n),h('span',{},x.d)))});
}
$('addf').onsubmit=e=>{e.preventDefault();const v=$('ntext').value.trim();if(!v)return;const k=key(days[sel]);
  (S.c[k]=S.c[k]||[]).push({id:'c'+Math.random().toString(36).slice(2,8),time:$('ntime').value.trim(),text:v});
  $('ntext').value='';$('ntime').value='';save();render()};
$('rs').onclick=()=>{const b=JSON.stringify(S);S.t[key(days[sel])]={};save();render();snap=b;toast('Day reset',1)};
$('theme').onclick=()=>{const r=document.documentElement,dk=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;r.dataset.theme=dk?'light':'dark';try{localStorage.setItem(KEY+'-theme',r.dataset.theme)}catch(e){}};
try{const t=localStorage.getItem(KEY+'-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}
render();
