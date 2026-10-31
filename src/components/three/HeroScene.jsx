import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Palette colours mapped to Three.js Color objects.
 * Order from bottom to top (darkest → lightest) for the stacked pill layers.
 */
const PALETTE = [
  '#111715', // c900
  '#1B2420', // c800
  '#29342E', // c700
  '#3D4B42', // c600
  '#B5C4B4', // c400
  '#F2F1E9', // c100
];

/** Single glossy capsule/pill mesh. */
function CapsuleLayer({ color, positionY, rotationZ, delay = 0 }) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() + delay;
    // Slow idle rotation around Y-axis
    meshRef.current.rotation.y = t * 0.18;
    // Gentle Y-axis bob
    meshRef.current.position.y = positionY + Math.sin(t * 0.6 + delay) * 0.04;
  });

  return (
    <mesh ref={meshRef} position={[0, positionY, 0]} rotation={[0, 0, rotationZ]}>
      {/* CapsuleGeometry: radius=0.35, length=1.2, capSegments=8, radialSegments=20 */}
      <capsuleGeometry args={[0.35, 1.2, 8, 20]} />
      <MeshTransmissionMaterial
        color={color}
        transmission={color === '#F2F1E9' ? 0.4 : 0.0}
        roughness={color === '#F2F1E9' ? 0.05 : 0.25}
        metalness={color === '#F2F1E9' ? 0.1 : 0.55}
        clearcoat={1}
        clearcoatRoughness={0.08}
        reflectivity={0.6}
        envMapIntensity={1.2}
        ior={1.5}
        thickness={0.3}
        chromaticAberration={0.02}
      />
    </mesh>
  );
}

/** Floating ambient particles */
function Particles({ count = 90 }) {
  const pointsRef = useRef(null);

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return { positions: pos, sizes: sz };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#B5C4B4"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/** Scene content: stacked pills + lighting + particles + mouse parallax */
function SceneContents({ mouseX, mouseY }) {
  const groupRef = useRef(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Lerp group rotation toward mouse position for parallax
    const targetRX = mouseY.current * 0.25;
    const targetRY = mouseX.current * 0.35;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRX,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRY,
      0.05
    );
  });

  const layers = PALETTE.map((color, i) => ({
    color,
    positionY: (i - 2.5) * 0.52,
    // Alternate slight Z-rotation for a staggered stacked feel
    rotationZ: (i % 2 === 0 ? 1 : -1) * 0.12 + (i * 0.04),
    delay: i * 0.4,
  }));

  return (
    <group ref={groupRef}>
      {/* Mint spotlight from top-left */}
      <spotLight
        position={[-3, 4, 2]}
        angle={0.45}
        penumbra={0.7}
        intensity={3.5}
        color="#F2F1E9"
        castShadow={false}
      />

      {/* Warm fill light from the right */}
      <pointLight position={[3, 1, 2]} intensity={1.2} color="#B5C4B4" />

      {/* Soft ambient */}
      <ambientLight intensity={0.4} color="#29342E" />

      {/* Back rim light */}
      <pointLight position={[0, -3, -2]} intensity={0.8} color="#3D4B42" />

      {/* Stacked capsule layers */}
      {layers.map((layer, i) => (
        <Float
          key={i}
          speed={0.8 + i * 0.15}
          rotationIntensity={0.05}
          floatIntensity={0.06}
        >
          <CapsuleLayer
            color={layer.color}
            positionY={layer.positionY}
            rotationZ={layer.rotationZ}
            delay={layer.delay}
          />
        </Float>
      ))}

      {/* Ambient particles */}
      <Particles count={90} />
    </group>
  );
}

/**
 * HeroScene — React Three Fiber canvas with:
 * - 6 stacked glossy capsule/pill layers in the brand palette
 * - Mouse parallax tilt (±12° via lerp)
 * - Mint spotlight from top-left
 * - Floating particles
 *
 * Must be lazy-loaded by the parent with React.lazy + Suspense.
 *
 * @param {{ mouseX: React.MutableRefObject<number>, mouseY: React.MutableRefObject<number> }} props
 */
export default function HeroScene({ mouseX, mouseY }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <SceneContents mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </Canvas>
  );
}

