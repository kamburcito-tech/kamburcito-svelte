<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let { src, fit = 'cover' } = $props();

  let wrapper;
  let canvas;

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const mouse = new THREE.Vector2(-10, -10);
    const targetMouse = new THREE.Vector2(-10, -10);

    let hoverTarget = 0;
    let hover = 0;
    let velocity = 0;
    let targetVelocity = 0;
    let lastX = 0;
    let lastY = 0;

    const uniforms = {
      uTexture: { value: null },
      uTime: { value: 0 },
      uMouse: { value: mouse },
      uHover: { value: 0 },
      uVelo: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageResolution: { value: new THREE.Vector2(1, 1) },
      uFitMode: { value: fit === 'cover' ? 1 : 0 }
    };

    const loader = new THREE.TextureLoader();

    loader.load(src, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.colorSpace = THREE.SRGBColorSpace;

      uniforms.uTexture.value = texture;
      uniforms.uImageResolution.value.set(texture.image.width, texture.image.height);
    });

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
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uHover;
        uniform float uVelo;
        uniform vec2 uResolution;
        uniform vec2 uImageResolution;
        uniform int uFitMode;

        varying vec2 vUv;

        vec2 getUv(vec2 uv) {
          float imageRatio = uImageResolution.x / uImageResolution.y;
          float screenRatio = uResolution.x / uResolution.y;

          vec2 newUv = uv;

        if (uFitMode == 1) {
  // cover + slightly zoomed in
  float zoom = 1.62;

  if (screenRatio > imageRatio) {
    float scale = imageRatio / screenRatio;
    newUv.y = (uv.y - 0.5) / scale + 0.5;
  } else {
    float scale = screenRatio / imageRatio;
    newUv.x = (uv.x - 0.5) / scale + 0.5;
  }

  // zoom toward center
  newUv = (newUv - 0.5) / zoom + 0.5;
} else {
  // contain
  if (screenRatio > imageRatio) {
    float scale = imageRatio / screenRatio;
    newUv.x = (uv.x - 0.5) / scale + 0.5;
  } else {
    float scale = screenRatio / imageRatio;
    newUv.y = (uv.y - 0.5) / scale + 0.5;
  }
}
          return newUv;
        }

        float circle(vec2 uv, vec2 center, float radius, float blur) {
          float d = distance(uv, center);
          return smoothstep(radius + blur, radius, d);
        }

        void main() {
          vec2 uv = vUv;
          vec2 fittedUv = getUv(uv);

          float mask = circle(uv, uMouse, 0.0, 0.48);
          float strength = mask * uHover * (0.18 + uVelo * 1.4);
          float dist = distance(uv, uMouse);

          vec2 direction = normalize(uv - uMouse);

          vec2 distortedUv = fittedUv;

          // clean liquid push, not zoom
          distortedUv += direction * strength * 0.069;

          // small ripple only
          float ripple = sin(dist * 38.0 - uTime * 6.5) * 0.018;
          distortedUv += ripple * strength;

          vec4 base = texture2D(uTexture, distortedUv);

          // subtle chromatic split
          float split = strength * 0.014;

          vec3 color;
          color.r = texture2D(uTexture, distortedUv + vec2(split, 0.0)).r;
          color.g = texture2D(uTexture, distortedUv).g;
          color.b = texture2D(uTexture, distortedUv - vec2(split, 0.0)).b;

          // very soft shine, not a second image
          vec3 shine = vec3(0.12, 0.95, 1.0);
          color = mix(color, shine, mask * strength * 0.22);

          gl_FragColor = vec4(color, base.a);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function resize() {
      const rect = wrapper.getBoundingClientRect();

      renderer.setSize(rect.width, rect.height, false);
      uniforms.uResolution.value.set(rect.width, rect.height);
    }

    function handleMouseEnter(event) {
      const rect = wrapper.getBoundingClientRect();

      lastX = event.clientX;
      lastY = event.clientY;

      targetMouse.set(
        (event.clientX - rect.left) / rect.width,
        1.0 - (event.clientY - rect.top) / rect.height
      );

      hoverTarget = 1;
    }

    function handleMouseMove(event) {
      const rect = wrapper.getBoundingClientRect();

      targetMouse.set(
        (event.clientX - rect.left) / rect.width,
        1.0 - (event.clientY - rect.top) / rect.height
      );

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;

      targetVelocity = Math.min(Math.sqrt(dx * dx + dy * dy) / 80, 1);

      lastX = event.clientX;
      lastY = event.clientY;
    }

    function handleMouseLeave() {
      hoverTarget = 0;
      targetVelocity = 0;
      targetMouse.set(-10, -10);
    }

    let frame;

    function animate() {
      frame = requestAnimationFrame(animate);

      uniforms.uTime.value += 0.016;

      mouse.x += (targetMouse.x - mouse.x) * 0.12;
      mouse.y += (targetMouse.y - mouse.y) * 0.12;

      hover += (hoverTarget - hover) * 0.1;
      velocity += (targetVelocity - velocity) * 0.14;
      velocity *= 0.94;

      uniforms.uHover.value = hover;
      uniforms.uVelo.value = velocity;

      renderer.render(scene, camera);
    }

    resize();
    animate();

    window.addEventListener('resize', resize);
    wrapper.addEventListener('mouseenter', handleMouseEnter);
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener('resize', resize);
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (uniforms.uTexture.value) {
        uniforms.uTexture.value.dispose();
      }
    };
  });
</script>

<div bind:this={wrapper} class="texture-hover-image">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .texture-hover-image {
    width: 100%;
    height: 100%;
    min-height: inherit;
    position: relative;
    overflow: hidden;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>