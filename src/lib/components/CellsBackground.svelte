<script module>
  // The instance currently animating; starting another one pauses it.
  let active = null;
</script>

<script>
  // Living cell-tissue background, plain WebGL (no three.js). Shaders, uniforms
  // and mouse smoothing are ported unchanged from kamburcito-cells-mid.html.
  // Fills its positioned parent, which supplies the background color.
  import { onMount, onDestroy } from 'svelte';

  const VS = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
  const FS = `precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uHover;
vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return fract(sin(p)*43758.5453);}
float h1(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h1(i),h1(i+vec2(1,0)),f.x),mix(h1(i+vec2(0,1)),h1(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
void vor(vec2 p,out float f1,out float f2,out vec2 id){
 vec2 ip=floor(p),fp=fract(p);f1=8.;f2=8.;id=vec2(0);
 for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
  vec2 g=vec2(float(x),float(y));vec2 o=h2(ip+g);
  o=.5+.42*sin(uTime*.25+6.2831*o);
  vec2 q=g+o-fp;float dd=dot(q,q);
  if(dd<f1){f2=f1;f1=dd;id=ip+g;}else if(dd<f2){f2=dd;}
 }
 f1=sqrt(f1);f2=sqrt(f2);}
void main(){
 vec2 uv=gl_FragCoord.xy/uRes.y;vec2 m=uMouse*vec2(uRes.x/uRes.y,1.);
 float t=uTime*.06;
 vec2 p=uv;
 vec2 d=p-m;float r=length(d);
 float lens=exp(-r*r*7.)*uHover;
 p-=d*lens*.55;
 p+=.12*vec2(fbm(p*2.+t),fbm(p*2.+7.3-t));
 p*=3.1;
 float f1,f2;vec2 id;vor(p,f1,f2,id);
 float edge=f2-f1;
 float mem=1.-smoothstep(.0,.04,edge);
 float tone=h1(id);
 vec2 sc=gl_FragCoord.xy/uRes;
 float light=smoothstep(-.1,1.1,sc.x*.75+sc.y*.55+.25*fbm(uv*1.6+t)-.15);
 vec3 deep=vec3(.039,.184,.208),teal=vec3(.055,.486,.525),lite=vec3(.55,.84,.86),tint=vec3(.90,.957,.96);
 vec3 col=mix(deep,teal,.35+.45*tone);
 col=mix(col,lite,light*(.35+.6*tone));
 col=mix(col,tint,light*light*.35*smoothstep(.6,.0,f1));
 float inner=smoothstep(.0,.5,f1);
 col*=.8+.2*(1.-inner*.6);
 float rim=smoothstep(.22,.0,edge)*(1.-mem);
 col=mix(col,col*1.15+vec3(.05),rim*.5);
 col=mix(col,mix(deep*.6,lite,.55+.25*light),mem*.7);
 col+=tint*lens*.08;
 col+=(h1(gl_FragCoord.xy+uTime)-.5)*.025;
 vec2 c=gl_FragCoord.xy/uRes;float vg=smoothstep(1.25,.15,length(c-.5));col*=.55+.45*vg;
 gl_FragColor=vec4(col,1.);}`;

  // opacity: canvas opacity once shown (it fades in from 0).
  // interactionTarget: element whose pointer moves drive the lens; defaults to the parent.
  // scale: render scale of CSS size × devicePixelRatio (capped at 1.5) from 768px up; 0.5 below.
  let { opacity = 1, interactionTarget = undefined, scale = 0.75 } = $props();

  let wrapper;
  let canvas;
  let shown = $state(false);
  let cleanup = () => {};

  onMount(() => {
    // Create the WebGL context lazily, once the element is within about one
    // screen of the viewport.
    let teardown;
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        teardown = start();
      },
      { rootMargin: '100% 0px' }
    );
    near.observe(wrapper);
    cleanup = () => {
      near.disconnect();
      teardown?.();
    };
  });

  onDestroy(() => cleanup());

  function start() {
    const target = interactionTarget ?? wrapper.parentElement;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    // No WebGL: the canvas stays hidden and the parent's background shows.
    if (!target || !gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VS);
    const fs = compile(gl.FRAGMENT_SHADER, FS);
    const pr = gl.createProgram();
    gl.attachShader(pr, vs);
    gl.attachShader(pr, fs);
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return;
    }
    gl.useProgram(pr);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(pr, 'a');
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

    const U = (n) => gl.getUniformLocation(pr, n);
    const uR = U('uRes'), uT = U('uTime'), uM = U('uMouse'), uH = U('uHover');

    let tm = [0.5, 0.5], cur = [0.5, 0.5], hov = 0, hovT = 0;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarseQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    let reduced = reducedQuery.matches;
    let onScreen = false;
    let raf = 0;
    let lost = false;

    const size = () => {
      const w = wrapper.clientWidth, h = wrapper.clientHeight;
      if (!w || !h) return;
      const s = (w < 768 ? 0.5 : scale) * Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(w * s));
      canvas.height = Math.max(1, Math.round(h * s));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (t) => {
      cur[0] += (tm[0] - cur[0]) * 0.08;
      cur[1] += (tm[1] - cur[1]) * 0.08;
      hov += (hovT - hov) * 0.06;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, t);
      gl.uniform2f(uM, cur[0], cur[1]);
      gl.uniform1f(uH, hov);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      shown = true;
    };

    const frame = (ts) => {
      const t = ts / 1000;
      if (coarseQuery.matches) {
        // Touch: drift the lens along a slow Lissajous path.
        tm = [0.5 + 0.3 * Math.sin(t * 0.13), 0.5 + 0.22 * Math.sin(t * 0.21 + 1.3)];
        hovT = 1;
      }
      draw(t);
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (active === instance) active = null;
    };
    const instance = { stop };

    const update = () => {
      const run = !lost && !reduced && onScreen && !document.hidden;
      if (run && !raf) {
        // Only one canvas animates at a time.
        if (active && active !== instance) active.stop();
        active = instance;
        raf = requestAnimationFrame(frame);
      }
      if (!run && raf) stop();
      if (reduced && !lost) draw(0); // One still frame, no animation.
    };

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      const r = wrapper.getBoundingClientRect();
      tm = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
      hovT = 1;
    };
    const onLeave = () => {
      hovT = 0;
    };
    const onReduced = (e) => {
      reduced = e.matches;
      update();
    };
    const onContextLost = (e) => {
      e.preventDefault();
      lost = true;
      shown = false;
      update();
    };

    size();
    const ro = new ResizeObserver(() => {
      size();
      if (reduced) draw(0);
    });
    ro.observe(wrapper);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(wrapper);

    target.addEventListener('pointermove', onMove);
    target.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', update);
    reducedQuery.addEventListener('change', onReduced);
    canvas.addEventListener('webglcontextlost', onContextLost);

    if (reduced) draw(0);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      target.removeEventListener('pointermove', onMove);
      target.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', update);
      reducedQuery.removeEventListener('change', onReduced);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(pr);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }
</script>

<div class="cells-bg" aria-hidden="true" bind:this={wrapper} style:--cells-opacity={opacity}>
  <canvas bind:this={canvas} class:is-shown={shown}></canvas>
</div>

<style>
  /* Transparent until the canvas is shown, so the parent's own background is
     both the first paint and the no-WebGL fallback. */
  .cells-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  canvas {
    width: 100%;
    height: 100%;
    max-width: none;
    opacity: 0;
    transition: opacity 500ms ease;
  }

  canvas.is-shown {
    opacity: var(--cells-opacity, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    canvas {
      transition: none;
    }
  }
</style>
