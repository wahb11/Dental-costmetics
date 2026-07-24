"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  MeshDistortMaterial,
  Sparkles,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

function Tooth() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 1.5, 32]} />
        <MeshDistortMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          distort={0.2}
          speed={2}
        />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.9, 0.4, 0.9]} />
        <MeshDistortMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          distort={0.15}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function DentalTools() {
  return (
    <>
      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.8} position={[-2, 1, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
          <meshStandardMaterial color="#4299e1" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6} position={[2, -1, 0]}>
        <mesh castShadow>
          <torusGeometry args={[0.3, 0.08, 16, 32]} />
          <meshStandardMaterial color="#38b2ac" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={3.5} rotationIntensity={0.5} floatIntensity={0.7} position={[1.5, 1.5, -1]}>
        <mesh castShadow>
          <coneGeometry args={[0.2, 0.8, 16]} />
          <meshStandardMaterial color="#667eea" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </>
  );
}

function Particles() {
  return (
    <Sparkles
      count={100}
      scale={10}
      size={2}
      speed={0.5}
      opacity={0.6}
      color="#4299e1"
    />
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4299e1" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* 3D Objects */}
        <Tooth />
        <DentalTools />
        <Particles />

        {/* Environment */}
        <Environment preset="city" />
        
        {/* Controls - disabled for cleaner look */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}
