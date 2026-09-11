'use client';

/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import './Antigravity.css';

type ParticleShape = 'capsule' | 'sphere' | 'box' | 'tetrahedron';

type AntigravityProps = {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: ParticleShape;
  fieldStrength?: number;
  className?: string;
};

type Particle = {
  t: number;
  speed: number;
  mx: number;
  my: number;
  mz: number;
  cx: number;
  cy: number;
  cz: number;
  randomRadiusOffset: number;
};

type PointerPosition = { x: number; y: number };

type InnerProps = Omit<AntigravityProps, 'className'> & {
  pointerRef: MutableRefObject<PointerPosition>;
};

function AntigravityInner({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = '#FF9FFC',
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10,
  pointerRef,
}: InnerProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i += 1) {
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 12;
      temp.push({
        t: Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        randomRadiusOffset: (Math.random() - 0.5) * 2,
      });
    }

    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame(state => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const v = state.viewport;
    const m = pointerRef.current;
    const now = state.clock.elapsedTime;
    const mouseDist = Math.hypot(m.x - lastMousePos.current.x, m.y - lastMousePos.current.y);

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = now;
      lastMousePos.current = { x: m.x, y: m.y };
    }

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (autoAnimate && now - lastMouseMoveTime.current > 2) {
      destX = Math.sin(now * 0.5) * (v.width / 4);
      destY = Math.cos(now) * (v.height / 4);
    }

    virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.05;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.05;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;
    const globalRotation = now * rotationSpeed;

    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      const t = (particle.t += particle.speed / 2);
      const projectionFactor = 1 - particle.cz / 50;
      const projectedTargetX = targetX * projectionFactor;
      const projectedTargetY = targetY * projectionFactor;
      const dx = particle.mx - projectedTargetX;
      const dy = particle.my - projectedTargetY;
      const dist = Math.hypot(dx, dy);

      let targetXPos = particle.mx;
      let targetYPos = particle.my;
      let targetZPos = particle.mz * depthFactor;

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = particle.randomRadiusOffset * (5 / (fieldStrength + 0.1));
        const currentRingRadius = ringRadius + wave + deviation;

        targetXPos = projectedTargetX + currentRingRadius * Math.cos(angle);
        targetYPos = projectedTargetY + currentRingRadius * Math.sin(angle);
        targetZPos = particle.mz * depthFactor + Math.sin(t) * waveAmplitude * depthFactor;
      }

      particle.cx += (targetXPos - particle.cx) * lerpSpeed;
      particle.cy += (targetYPos - particle.cy) * lerpSpeed;
      particle.cz += (targetZPos - particle.cz) * lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);
      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const currentDistToMouse = Math.hypot(
        particle.cx - projectedTargetX,
        particle.cy - projectedTargetY,
      );
      const distFromRing = Math.abs(currentDistToMouse - ringRadius);
      const ringInfluence = Math.max(0, Math.min(1, 1 - distFromRing / 10));
      const pulse = 0.9 + Math.sin(t * pulseSpeed) * 0.1 * particleVariance;

      // Keep the full field plainly visible, then make the magnetic ring swell.
      // The old baseline was so tiny that the particles were effectively sub-pixel.
      const finalScale = particleSize * (0.5 + ringInfluence * 0.9) * pulse;

      dummy.scale.set(finalScale, finalScale, finalScale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      {particleShape === 'capsule' && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
      {particleShape === 'sphere' && <sphereGeometry args={[0.2, 12, 12]} />}
      {particleShape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.3]} />}
      <meshBasicMaterial color={color} transparent opacity={1} toneMapped={false} depthWrite={false} />
    </instancedMesh>
  );
}

export default function Antigravity({ className = '', ...props }: AntigravityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerPosition>({ x: 0, y: 0 });
  // Start mounted so the effect cannot miss its first intersection callback.
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry?.isIntersecting ?? true),
      { rootMargin: '260px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      const el = containerRef.current;
      if (!el || !isVisible) return;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) return;

      pointerRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => window.removeEventListener('pointermove', updatePointer);
  }, [isVisible]);

  return (
    <div ref={containerRef} className={`antigravity ${className}`.trim()} aria-hidden="true">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 50], fov: 35 }}
          dpr={1}
          frameloop="always"
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <AntigravityInner {...props} pointerRef={pointerRef} />
        </Canvas>
      )}
    </div>
  );
}
