// Scripts que van en línea en el HTML (no esperan al bundle de React).

/**
 * <head>: decide antes del primer pintado si hay 3D, si corresponde la intro y si
 * se usan los revelados (.fx). Si el JS principal no llega en 6 s, se apagan los
 * revelados para que el contenido nunca quede oculto.
 */
export const HEAD_SCRIPT = `(function(){var h=document.documentElement,c=h.classList;c.add('js','fx');
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var gl='WebGLRenderingContext' in window;
var ios=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
var low=!ios&&(matchMedia('(pointer:coarse)').matches||innerWidth<981)&&(navigator.hardwareConcurrency||8)<=4;
c.add(gl&&!rm&&!low?'has3d':'no3d');
try{if(!rm&&sessionStorage.getItem('aspa-intro')!=='1')c.add('intro-pending')}catch(e){}
setTimeout(function(){if(!window.__fx)c.remove('fx','intro-pending');c.add('go')},6000);})();`;

/**
 * Final del <body>: intro isotipo → logo completo → isotipo → viaja al header.
 * Una vez por sesión; cualquier interacción la saltea. Mismos tiempos y curvas que el diseño.
 * No toca nodos que maneja React antes de la hidratación: arma la intro dentro de #introHost,
 * un contenedor vacío que React no compara al hidratar (con dos layouts raíz, un nodo extra
 * en el <body> rompe la hidratación), con un clon del logo del header; la clase que dispara
 * la entrada del contenido (go) va en <html>.
 */
export const INTRO_SCRIPT = `(function(){var d=document,h=d.documentElement;
function go(){h.classList.add('go')}
if(!h.classList.contains('intro-pending')){go();return}
var el=d.createElement('div');
try{el.className='intro';el.id='intro';
var en=/^en/.test(h.lang);
el.innerHTML='<div class="intro-bg" id="introBg"></div><div class="intro-logo" id="introLogo" aria-hidden="true"></div><button class="skip" type="button" aria-label="'+(en?'Skip intro':'Saltar intro')+'">'+(en?'Skip':'Saltar')+'</button>';
el.querySelector('#introLogo').appendChild(d.querySelector('#hdr .brand svg').cloneNode(true));
(d.getElementById('introHost')||d.body).appendChild(el);h.classList.add('intro-ready')}catch(e){h.classList.remove('intro-pending');go();return}
try{sessionStorage.setItem('aspa-intro','1')}catch(e){}
var hdr=d.getElementById('hdr'),fin=false,T=[],EV=['wheel','touchstart','keydown','click'];
window.__introRunning=true;d.body.classList.add('intro-on');if(hdr)hdr.classList.add('compact');
function at(ms,f){T.push(setTimeout(f,ms))}
function end(){if(fin)return;fin=true;T.forEach(clearTimeout);window.__introRunning=false;d.body.classList.remove('intro-on');go();
if(hdr)hdr.classList.toggle('compact',scrollY>40);EV.forEach(function(t){removeEventListener(t,end,true)});
var done=function(){el.remove();h.classList.remove('intro-pending','intro-ready')};
if(el.animate){el.animate([{opacity:1},{opacity:0}],{duration:180,fill:'forwards'}).onfinish=done}else done();
dispatchEvent(new Event('aspa:introdone'))}
EV.forEach(function(t){addEventListener(t,end,{capture:true,passive:true,once:true})});
try{run()}catch(e){end()}
function run(){var box=d.getElementById('introLogo'),svg=box.querySelector('svg'),iso=svg.querySelector('.lg-iso'),phx=svg.querySelector('.lg-phx'),
vb=svg.viewBox.baseVal,W=innerWidth,H=innerHeight,hh=Math.min(W*.2,H*.16,150),u=hh/vb.height,w=vb.width*u,L0=(W-w)/2,T0=(H-hh)/2,
dIso=(vb.x+vb.width/2-(-16+400))*u,E1='cubic-bezier(.22,1,.36,1)',EZ='cubic-bezier(.65,0,.35,1)',
PX='translate(1563.8px,-493.7px) scale(3.0906)',L=[].slice.call(svg.querySelectorAll('.lg-l'));
box.style.height=hh+'px';box.style.width=w+'px';box.style.left=L0+'px';box.style.top=T0+'px';
svg.classList.add('cmp-logo');box.classList.add('pre');iso.style.fillOpacity=1;iso.style.strokeWidth=0;
box.style.transform='translate3d('+dIso+'px,0,0)';box.style.perspective='900px';svg.style.transformOrigin='14.8% 57%';box.classList.add('placed');
svg.animate([{transform:'rotateY(-35deg) scale(.9)',opacity:0},{transform:'rotateY(-12deg) scale(.97)',opacity:1,offset:.45},{transform:'none',opacity:1}],{duration:1000,easing:E1,fill:'forwards'});
at(900,function(){L.forEach(function(l){l.style.transitionDelay=((+l.style.getPropertyValue('--i')-1)*80)+'ms'});svg.classList.remove('cmp-logo');
box.animate([{transform:'translate3d('+dIso+'px,0,0)'},{transform:'translate3d(0,0,0)'}],{duration:700,easing:E1,fill:'forwards'})});
at(1050,function(){box.classList.remove('pre');phx.animate([{opacity:0,transform:PX+' translate(371px,195px) rotate(-14deg) translate(-371px,-195px)'},{opacity:1,transform:PX}],{duration:500,easing:E1,fill:'forwards'})});
at(2050,function(){phx.getAnimations().forEach(function(a){a.cancel()});L.forEach(function(l){l.style.transitionDelay='0ms'});svg.classList.add('cmp-logo');
box.getAnimations().forEach(function(a){a.cancel()});box.animate([{transform:'translate3d(0,0,0)'},{transform:'translate3d('+dIso+'px,0,0)'}],{duration:450,easing:E1,fill:'forwards'})});
at(2600,function(){var b=d.querySelector('#hdr .brand').getBoundingClientRect(),k=b.height/hh;box.getAnimations().forEach(function(a){a.cancel()});
box.animate([{transform:'translate3d('+dIso+'px,0,0) scale(1)'},{transform:'translate3d('+(b.left-L0)+'px,'+(b.top-T0)+'px,0) scale('+k+')'}],{duration:650,easing:EZ,fill:'forwards'});
d.getElementById('introBg').animate([{transform:'translateY(0)'},{transform:'translateY(-100%)'}],{duration:600,easing:EZ,fill:'forwards'});
el.querySelector('.skip').style.opacity=0});
at(2650,go);at(3200,end)}})();`;
