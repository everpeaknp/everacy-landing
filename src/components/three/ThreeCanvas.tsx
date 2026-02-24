"use client";

import { Canvas } from "@react-three/fiber";
import { THREE_DEFAULTS } from "@/lib/constants";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

/** Placeholder animated mesh — replace with your actual 3D scene. */
function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.35, 128, 16]} />
      <meshStandardMaterial
        color="#3b82f6"
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
}

/**
 * Root Three.js canvas component.
 * Always lazy-loaded with { ssr: false } — never imported directly on the server.
 * Wrap scenes in <Suspense> for code-splitting support.
 */
export function ThreeCanvas() {
  return (
    <Canvas
      camera={{
        fov: THREE_DEFAULTS.fov,
        near: THREE_DEFAULTS.near,
        far: THREE_DEFAULTS.far,
        position: [0, 0, 4],
      }}
      gl={{ antialias: THREE_DEFAULTS.antialias }}
      dpr={[1, THREE_DEFAULTS.pixelRatioMax]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#818cf8" />

      <Suspense fallback={null}>
        <RotatingTorus />
      </Suspense>
    </Canvas>
  );
}
