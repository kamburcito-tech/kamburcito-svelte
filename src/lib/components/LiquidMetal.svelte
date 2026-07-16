<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

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

    const mouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    let targetIntensity = 0;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: mouse },
      uIntensity: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uIntensity;
        uniform vec2 uResolution;

        float blob(vec2 p, vec2 center, float radius) {
          float d = length(p - center);
          return radius / d;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          float aspect = uResolution.x / uResolution.y;

          vec2 p = uv;
          p.x *= aspect;

          vec2 m = uMouse;
          m.x *= aspect;

          float t = uTime;

          float field = 0.0;

          field += blob(p, m, 0.050);

          field += blob(
            p,
            m + vec2(sin(t * 1.3) * 0.11, cos(t * 1.1) * 0.08),
            0.032
          );

          field += blob(
            p,
            m + vec2(cos(t * 1.6) * 0.14, sin(t * 1.4) * 0.09),
            0.026
          );

          field += blob(
            p,
            m + vec2(sin(t * 0.9) * 0.18, cos(t * 1.7) * 0.06),
            0.020
          );

          float metalMask = smoothstep(0.85, 1.25, field);
          float edge = smoothstep(1.0, 1.35, field) - smoothstep(1.35, 1.85, field);

          vec2 lightDir = normalize(vec2(-0.4, 0.9));
          float highlight = pow(max(dot(normalize(p - m), lightDir), 0.0), 10.0);

          float chromeBands =
            sin((p.x + p.y) * 22.0 + t * 1.2) * 0.5 + 0.5;

          float reflection =
            sin(p.x * 28.0 - t * 1.5) *
            sin(p.y * 18.0 + t * 1.1);

          reflection = reflection * 0.5 + 0.5;

          vec3 deep = vec3(0.02, 0.025, 0.04);
          vec3 silver = vec3(0.82, 0.86, 0.92);
          vec3 white = vec3(1.0);

          vec3 cyan = vec3(0.0, 0.95, 1.0);
          vec3 violet = vec3(0.65, 0.25, 1.0);
          vec3 pink = vec3(1.0, 0.15, 0.62);
          vec3 gold = vec3(1.0, 0.72, 0.26);

          vec3 metal = mix(deep, silver, reflection);
          metal = mix(metal, white, highlight * 0.9);

          vec3 iridescent = mix(cyan, violet, chromeBands);
          iridescent = mix(iridescent, pink, sin(p.y * 16.0 + t) * 0.5 + 0.5);
          iridescent = mix(iridescent, gold, edge * 0.8);

          vec3 color = mix(metal, iridescent, edge * 0.9);
          color = mix(color, white, highlight * 0.6);

          float alpha = metalMask * 0.82;
          alpha += edge * 0.28;
          alpha *= uIntensity;

          gl_FragColor = vec4(color, alpha);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function resize() {
      const parent = canvas.parentElement;
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;

      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    }

    function onMouseMove(event) {
      const rect = canvas.parentElement.getBoundingClientRect();

      targetMouse.x = (event.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (event.clientY - rect.top) / rect.height;

      targetIntensity = 1;
    }

    function onMouseLeave() {
      targetIntensity = 0;
    }

    let frame;

    function animate() {
      frame = requestAnimationFrame(animate);

      uniforms.uTime.value += 0.016;

      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      uniforms.uIntensity.value += (targetIntensity - uniforms.uIntensity.value) * 0.08;

      renderer.render(scene, camera);
    }

    resize();
    animate();

    const parent = canvas.parentElement;

    window.addEventListener('resize', resize);
    parent.addEventListener('mousemove', onMouseMove);
    parent.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', onMouseMove);
      parent.removeEventListener('mouseleave', onMouseLeave);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  });
</script>