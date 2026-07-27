"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// Animated 3D Tooth Model
function ToothModel() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Gentle floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    
    // Gentle rotation
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Main tooth body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 0.8, 3, 32]} />
        <meshPhysicalMaterial
          color="#e8f4ff"
          metalness={0.1}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Crown (top part) */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[1.3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#f0f8ff"
          metalness={0.1}
          roughness={0.15}
          clearcoat={1}
        />
      </mesh>

      {/* Roots */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, -2, 0]} rotation={[0, 0, x * 0.1]}>
          <cylinderGeometry args={[0.3, 0.15, 1.5, 16]} />
          <meshPhysicalMaterial
            color="#dceeff"
            metalness={0.05}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#4a9eff"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// Main Scene Component
export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 5, 5]} intensity={0.5} color="#4a9eff" />
        
        <Environment preset="city" />
        
        <ToothModel />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
