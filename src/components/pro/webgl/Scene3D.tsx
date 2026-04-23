'use client';
import { useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import type * as THREE from 'three';

interface Props {
  scrollRef: RefObject<number>;
  mouseRef: RefObject<{ x: number; y: number }>;
}

export default function Scene3D({ scrollRef, mouseRef }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    const m = meshRef.current;
    if (!m) return;
    const scroll = scrollRef.current;
    const mx = mouseRef.current.x - 0.5;
    const my = mouseRef.current.y - 0.5;

    m.rotation.y += dt * 0.18;
    m.rotation.x += dt * 0.08 + scroll * 0.006;

    m.rotation.x += (my * 0.25 - (m.rotation.x % (Math.PI * 2)) * 0.004) * 0.04;
    m.rotation.z += (mx * 0.18 - m.rotation.z * 0.04) * 0.05;

    const fade = Math.max(0, 1 - scroll * 1.4);
    m.scale.setScalar(1.15 * fade);
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <hemisphereLight args={['#ffffff', '#F5F1EB', 0.6]} />
      <directionalLight position={[3, 5, 4]} intensity={1.0} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#FFD9C5" />
      <Float floatIntensity={0.5} rotationIntensity={0.15} speed={1.3}>
        <mesh ref={meshRef} position={[2.8, 0.9, -0.5]} scale={1.15}>
          <icosahedronGeometry args={[1, 48]} />
          <MeshDistortMaterial
            color="#E88A67"
            roughness={0.45}
            metalness={0.05}
            distort={0.3}
            speed={1.6}
            transparent
            opacity={0.82}
          />
        </mesh>
      </Float>
    </>
  );
}
