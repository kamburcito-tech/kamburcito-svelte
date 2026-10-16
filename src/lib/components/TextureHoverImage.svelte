<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let { src, fit = 'cover' } = $props();

  let wrapper;
  let canvas;

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch {
      return; // The image remains visible if WebGL is unavailable.
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const mouse = new THREE.Vector2(-10, -10);
    const targetMouse = new THREE.Vector2(-10, -10);

    let inside = false;
    let lastMovement = -Infinity;
    let fadeStart = 0;
    let fadeFrom = 0;
    let hover = 0;
    let lastFrame = 0;

    const uniforms = {
      uTexture: { value: null },
      uMouse: { value: mouse },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageResolution: { value: new THREE.Vector2(1, 1) },
      uFocal: { value: new THREE.Vector2(0.5, 0.5) },
      uFitMode: { value: fit === 'cover' ? 1 : 0 }
    };

    const loader = new THREE.TextureLoader();
    let disposed = false;
    loader.load(
      src,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        uniforms.uTexture.value = texture;
        uniforms.uImageResolution.value.set(texture.image.width, texture.image.height);
        requestRender();
      },
      undefined,
      () => {} // Keep the static image on texture load failure.
    );
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform float uHover;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uImageResolution;
        uniform vec2 uFocal;
        uniform int uFitMode;

        varying vec2 vUv;

        vec2 getUv(vec2 uv) {
          float imageRatio = uImageResolution.x / uImageResolution.y;
          float screenRatio = uResolution.x / uResolution.y;
          vec2 newUv = uv;

          if (uFitMode == 1) {
            if (screenRatio > imageRatio) {
              float crop = imageRatio / screenRatio;
              newUv.y = (uv.y - 0.5) * crop + 0.5 - (uFocal.y - 0.5) * (1.0 - crop);
            } else {
              float crop = screenRatio / imageRatio;
              newUv.x = (uv.x - 0.5) * crop + 0.5 + (uFocal.x - 0.5) * (1.0 - crop);
            }
          } else {
            if (screenRatio > imageRatio) {
              newUv.x = (uv.x - 0.5) * screenRatio / imageRatio + 0.5;
            } else {
              newUv.y = (uv.y - 0.5) * imageRatio / screenRatio + 0.5;
            }
          }
          return newUv;
        }


        void main() {
          vec2 uv = vUv;
          vec2 fromPointer = uv - uMouse;
          // Work in panel-height units so the bloat stays circular in pixels.
          float radius = length(fromPointer * vec2(uResolution.x / uResolution.y, 1.0));
          float falloff = 1.0 - smoothstep(0.0, 0.32, radius);

          // Inverse sampling: pull source UVs toward the pointer so the
          // photographed details appear to expand outward on screen.
          vec2 sampleUv = uv - fromPointer * (0.34 * uHover * falloff);
          vec2 sourceUv = getUv(sampleUv);
          vec4 image = texture2D(uTexture, sourceUv);

          // This photograph's LED display is a quadrilateral. Inset the matte
          // from its bezel so the ceiling, wall and floor reflections stay still.
          float topEdge = 0.804 + (sourceUv.x - 0.131) * 0.396;
          float bottomEdge = 0.354 - (sourceUv.x - 0.131) * 0.114;
          float led = smoothstep(0.143, 0.162, sourceUv.x)
            * smoothstep(bottomEdge + 0.012, bottomEdge + 0.027, sourceUv.y)
            * (1.0 - smoothstep(topEdge - 0.027, topEdge - 0.012, sourceUv.y));

          if (led > 0.0) {
            float phase = uTime * 0.35;
            float vertical = 0.0050 * sin(sourceUv.x * 8.0 + sourceUv.y * 4.0 - phase
              + 0.45 * sin(sourceUv.y * 5.0 + phase * 0.6))
              + 0.0014 * sin(sourceUv.x * 20.0 + sourceUv.y * 3.0 + phase * 0.7);
            float horizontal = 0.0022 * sin(sourceUv.y * 12.0 - phase * 0.8
              + 0.4 * sin(sourceUv.x * 6.0 + phase * 0.5))
              + 0.0008 * sin(sourceUv.y * 21.0 + sourceUv.x * 5.0 + phase * 0.35);
            vec3 moved = texture2D(uTexture, sourceUv + vec2(horizontal, vertical)).rgb;
            float light = 0.018 * sin(sourceUv.y * 9.0 - phase * 0.7 + sourceUv.x * 3.0)
              + 0.006 * sin(sourceUv.x * 11.0 + phase * 0.4);
            moved += light * moved * (1.0 - moved);
            image.rgb = mix(image.rgb, moved, led);
          }

          // Three.js textures are sampled in linear space; convert to display
          // color before adding a fixed, fine grain that does not shimmer.
          gl_FragColor = image;
          #include <colorspace_fragment>

          float grain = fract(sin(dot(floor(gl_FragCoord.xy * 0.7),
            vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
          gl_FragColor.rgb = clamp(gl_FragColor.rgb + grain * 0.018, 0.0, 1.0);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frame = 0;
    let flowTimer = 0;
    let visible = false;

    function requestRender() {
      if (!frame && visible && !document.hidden && !motionQuery.matches && uniforms.uTexture.value) {
        frame = requestAnimationFrame(animate);
      }
    }

    function scheduleFlow() {
      if (!flowTimer && visible && !document.hidden && !motionQuery.matches) {
        flowTimer = setTimeout(() => {
          flowTimer = 0;
          requestRender();
        }, 75);
      }
    }

    function resize() {
      const rect = wrapper.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      renderer.setSize(rect.width, rect.height, false);
      uniforms.uResolution.value.set(rect.width, rect.height);
      const [x, y] = getComputedStyle(wrapper.querySelector('img')).objectPosition.split(' ');
      uniforms.uFocal.value.set(parseFloat(x) / 100, parseFloat(y) / 100);
      requestRender();
    }

    function updatePointer(event) {
      const rect = wrapper.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      if (inside && Math.hypot(x - targetMouse.x, y - targetMouse.y) < 0.001) return;
      targetMouse.set(x, y);
      lastMovement = performance.now();
      fadeStart = 0;
      requestRender();
    }

    function handleMouseEnter(event) {
      inside = true;
      updatePointer(event);
      if (hover < 0.01) mouse.copy(targetMouse);
    }

    function handleMouseMove(event) {
      updatePointer(event);
    }

    function handleMouseLeave() {
      inside = false;
      fadeStart = 0;
      requestRender();
    }

    function animate(now) {
      frame = 0;
      if (!visible || document.hidden || motionQuery.matches || !uniforms.uTexture.value) return;

      const dt = lastFrame ? Math.min(now - lastFrame, 50) : 16;
      lastFrame = now;
      const active = inside && now - lastMovement < 150;
      if (active) {
        fadeStart = 0;
        hover += (1 - hover) * (1 - Math.exp(-dt / 100));
      } else if (hover > 0) {
        if (!fadeStart) {
          fadeStart = now;
          fadeFrom = hover;
        }
        const progress = Math.min((now - fadeStart) / 800, 1);
        hover = fadeFrom * (1 - progress) * (1 - progress);
      } else {
        fadeStart = 0;
      }

      mouse.lerp(targetMouse, 1 - Math.exp(-dt / 100));
      uniforms.uHover.value = hover;
      uniforms.uTime.value = now / 1000;
      renderer.render(scene, camera);
      canvas.style.opacity = '1';

      if ((active && hover < 0.999) ||
          (!active && hover > 0) ||
          (inside && now - lastMovement < 150) ||
          mouse.distanceToSquared(targetMouse) > 0.000001) {
        requestRender();
      } else {
        scheduleFlow();
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        resize();
        lastMovement = -Infinity;
        fadeStart = 0;
        requestRender();
      } else {
        cancelAnimationFrame(frame);
        clearTimeout(flowTimer);
        frame = 0;
        flowTimer = 0;
        lastFrame = 0;
      }
    });
    intersectionObserver.observe(wrapper);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)');
    function handleMotionChange() {
      if (motionQuery.matches) {
        cancelAnimationFrame(frame);
        clearTimeout(flowTimer);
        frame = 0;
        flowTimer = 0;
        lastFrame = 0;
        hover = 0;
        uniforms.uHover.value = 0;
        canvas.style.opacity = '0';
      } else {
        lastMovement = -Infinity;
        requestRender();
      }
    }
    motionQuery.addEventListener('change', handleMotionChange);
    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        clearTimeout(flowTimer);
        frame = 0;
        flowTimer = 0;
        lastFrame = 0;
      } else {
        lastMovement = -Infinity;
        fadeStart = 0;
        requestRender();
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    wrapper.addEventListener('mouseenter', handleMouseEnter);
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(flowTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      uniforms.uTexture.value?.dispose();
    };
  });
</script>

<div bind:this={wrapper} class="texture-hover-image">
  <img {src} alt="" width="1374" height="1145" fetchpriority="high" decoding="async" />
  <canvas bind:this={canvas} aria-hidden="true"></canvas>
</div>

<style>
  .texture-hover-image {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  img,
  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  img {
    object-fit: cover;
    object-position: var(--hero-focal-x, 58%) var(--hero-focal-y, 50%);
  }

  canvas {
    opacity: 0;
    pointer-events: none;
  }
</style>