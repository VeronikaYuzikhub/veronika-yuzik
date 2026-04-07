// ─────────────────────────────────────────
//  LOADING  —  src/scenes/loading.ts
//  Flower bloom. Uniform sparkle ring.
//  Speed: ~4s. Name fades in at 80%.
// ─────────────────────────────────────────

interface Petal { angle:number; isBlue:boolean; sx:number; sy:number; tx:number; ty:number; delay:number; }
interface Gem   { sx:number; sy:number; tx:number; ty:number; delay:number; size:number; isBlue:boolean; }
interface Spark { x:number; y:number; size:number; delay:number; isBlue:boolean; }

function easeOut(t:number):number   { return 1-(1-t)**2; }
function easeInOut(t:number):number { return t<.5?2*t*t:-1+(4-2*t)*t; }

export class FlowerLoader {
  private canvas: HTMLCanvasElement;
  private ctx:    CanvasRenderingContext2D;
  private W=300; private H=300;
  private CX:number; private CY:number;
  private petals:Petal[]=[]; private gems:Gem[]=[]; private sparks:Spark[]=[];
  private progress=0; private raf=0;
  private onDone:()=>void;
  private nameShown=false;

  constructor(canvas:HTMLCanvasElement, onDone:()=>void){
    this.canvas=canvas;
    // DPR fix — crisp on retina/HiDPI displays
    const dpr=Math.min(devicePixelRatio||1,3);
    canvas.width=this.W*dpr; canvas.height=this.H*dpr;
    canvas.style.width=this.W+'px'; canvas.style.height=this.H+'px';
    this.ctx=canvas.getContext('2d')!;
    this.ctx.scale(dpr,dpr);
    this.CX=this.W/2; this.CY=this.H/2+5;
    this.onDone=onDone;
    this.build();
  }

  private build():void{
    const {CX,CY}=this;
    // 6 petals — evenly spaced
    for(let i=0;i<6;i++){
      const angle=(i/6)*Math.PI*2-Math.PI/2;
      const sA=angle+(Math.random()-.5)*1.4;
      const sD=125+Math.random()*44;
      this.petals.push({angle,isBlue:i%2===0,
        sx:CX+Math.cos(sA)*sD, sy:CY+Math.sin(sA)*sD,
        tx:CX+Math.cos(angle)*74, ty:CY+Math.sin(angle)*74,
        delay:i*0.09});
    }
    // 14 gems fly to centre
    for(let i=0;i<14;i++){
      const a=(i/14)*Math.PI*2;
      this.gems.push({
        sx:CX+Math.cos(a+Math.PI)*88+(Math.random()-.5)*26,
        sy:CY+Math.sin(a+Math.PI)*88+(Math.random()-.5)*26,
        tx:CX+Math.cos(a)*19, ty:CY+Math.sin(a)*19,
        delay:0.50+i*0.022, size:3+Math.random()*4.5, isBlue:i%3!==1});
    }
    // 16 sparkles — perfectly uniform ring
    for(let i=0;i<16;i++){
      const a=(i/16)*Math.PI*2;
      this.sparks.push({
        x:CX+Math.cos(a)*90, y:CY+Math.sin(a)*90,
        size:1.8,
        delay:0.54+i*(0.18/16),
        isBlue:i%2===0});
    }
  }

  private draw():void{
    const {ctx,CX,CY,W,H}=this;
    const p=this.progress;
    ctx.clearRect(0,0,W,H);

    // Glow
    const ag=ctx.createRadialGradient(CX,CY,0,CX,CY,p*85);
    ag.addColorStop(0,`rgba(212,168,184,${p*.13})`);
    ag.addColorStop(.55,`rgba(168,196,212,${p*.07})`);
    ag.addColorStop(1,'transparent');
    ctx.fillStyle=ag; ctx.beginPath(); ctx.arc(CX,CY,p*85,0,Math.PI*2); ctx.fill();

    // Petals
    this.petals.forEach(pt=>{
      const t=Math.max(0,Math.min(1,(p-pt.delay)/.58)); if(!t)return;
      const et=easeOut(t);
      const px=pt.sx+(pt.tx-pt.sx)*et, py=pt.sy+(pt.ty-pt.sy)*et;
      const bw=32*et, bA=pt.angle+Math.PI;
      const b1x=CX+Math.cos(bA+1)*bw, b1y=CY+Math.sin(bA+1)*bw;
      const b2x=CX+Math.cos(bA-1)*bw, b2y=CY+Math.sin(bA-1)*bw;
      const m1x=(px+b1x)/2+Math.cos(pt.angle+Math.PI/2)*22*et;
      const m1y=(py+b1y)/2+Math.sin(pt.angle+Math.PI/2)*22*et;
      const m2x=(px+b2x)/2+Math.cos(pt.angle-Math.PI/2)*22*et;
      const m2y=(py+b2y)/2+Math.sin(pt.angle-Math.PI/2)*22*et;
      const col=pt.isBlue?'rgba(168,196,212,':'rgba(212,168,184,';
      ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(m1x,m1y); ctx.lineTo(b1x,b1y);
      ctx.lineTo(CX,CY); ctx.lineTo(b2x,b2y); ctx.lineTo(m2x,m2y); ctx.closePath();
      ctx.fillStyle=col+(0.32*et)+')'; ctx.fill();
      ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(m1x,m1y); ctx.lineTo(b1x,b1y);
      ctx.moveTo(px,py); ctx.lineTo(m2x,m2y); ctx.lineTo(b2x,b2y);
      ctx.strokeStyle=col+(0.60*et)+')'; ctx.lineWidth=1; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(CX,CY); ctx.lineTo(px,py);
      ctx.strokeStyle=col+(0.22*et)+')'; ctx.lineWidth=.5;
      ctx.setLineDash([3,4]); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(px,py,3*et,0,Math.PI*2);
      ctx.fillStyle=col+(0.88*et)+')'; ctx.fill();
    });

    // Gems
    this.gems.forEach(g=>{
      const t=Math.max(0,Math.min(1,(p-g.delay)/.38)); if(!t)return;
      const et=easeOut(t);
      const gx=g.sx+(g.tx-g.sx)*et, gy=g.sy+(g.ty-g.sy)*et, s=g.size*et;
      const col=g.isBlue?'rgba(168,196,212,':'rgba(212,168,184,';
      ctx.beginPath();
      ctx.moveTo(gx,gy-s); ctx.lineTo(gx+s*.65,gy);
      ctx.lineTo(gx,gy+s*.5); ctx.lineTo(gx-s*.65,gy); ctx.closePath();
      ctx.fillStyle=col+(0.78*et)+')'; ctx.strokeStyle=col+(0.92*et)+')';
      ctx.lineWidth=.7; ctx.fill(); ctx.stroke();
    });

    // Sparkles — uniform, no save/restore (avoids context state bugs)
    this.sparks.forEach(sp=>{
      const t=Math.max(0,Math.min(1,(p-sp.delay)/.28)); if(!t)return;
      const et=easeInOut(t);
      const col=sp.isBlue?'rgba(168,196,212,':'rgba(212,168,184,';
      const s=sp.size*(et*(1-et)*4+et*.3);
      const rot=p*3.2;
      for(let i=0;i<4;i++){
        const r=rot+i*Math.PI/2;
        const cos=Math.cos(r), sin=Math.sin(r);
        const c90=Math.cos(r+Math.PI/2), s90=Math.sin(r+Math.PI/2);
        ctx.beginPath();
        ctx.moveTo(sp.x+cos*s*2,sp.y+sin*s*2);
        ctx.lineTo(sp.x+c90*s*.3,sp.y+s90*s*.3);
        ctx.lineTo(sp.x-cos*s*2,sp.y-sin*s*2);
        ctx.lineTo(sp.x-c90*s*.3,sp.y-s90*s*.3);
        ctx.closePath();
        ctx.fillStyle=col+(0.55*et)+')'; ctx.fill();
      }
    });

    // Centre core
    const cT=Math.max(0,Math.min(1,(p-.72)/.28));
    if(cT>0){
      const et=easeOut(cT), cR=12*et;
      const cg=ctx.createRadialGradient(CX,CY,0,CX,CY,cR);
      cg.addColorStop(0,'rgba(255,255,255,0.96)');
      cg.addColorStop(.5,'rgba(212,168,184,0.72)');
      cg.addColorStop(1,'rgba(168,196,212,0.32)');
      ctx.beginPath(); ctx.arc(CX,CY,cR,0,Math.PI*2); ctx.fillStyle=cg; ctx.fill();
      ctx.beginPath(); ctx.arc(CX,CY,cR+2.5,0,Math.PI*2);
      ctx.strokeStyle=`rgba(255,255,255,${0.45*et})`; ctx.lineWidth=.9; ctx.stroke();
    }
  }

  start():void{
    const bar  = document.getElementById('loading-line')!;
    const name = document.getElementById('loading-name');
    let lastTs = 0;
    const tick = (ts:number):void=>{
      // time-based: same ~3.5s on any display refresh rate
      if(!lastTs) lastTs=ts;
      const dt=Math.min((ts-lastTs)/1000, 0.05);
      lastTs=ts;
      this.progress=Math.min(this.progress+dt*0.30, 1);
      bar.style.width=(this.progress*100)+'%';
      this.draw();
      if(this.progress>=0.55&&!this.nameShown){
        this.nameShown=true; name?.classList.add('show');
      }
      if(this.progress<1){ this.raf=requestAnimationFrame(tick); }
      else{
        setTimeout(()=>{
          const screen=document.getElementById('loading-screen')!;
          screen.classList.add('fade-out');
          setTimeout(this.onDone,1400);
        },700);
      }
    };
    this.raf=requestAnimationFrame(tick);
  }
  stop():void{ cancelAnimationFrame(this.raf); }
}
