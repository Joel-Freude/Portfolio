"use client"; // Crucial for Next.js to prevent SSR errors with WebGL

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

interface PolygonBallProps {
  color?: string;
  wireframe?: boolean;
  roughness?: number;
  metalness?: number;
  rotationSpeed?: number;
  sphereSize?: number;
  sphereDetail?: [number, number];
  icosahedronDetail?: number;
  geometry?: 'sphere' | 'icosahedron';
  ambientLightIntensity?: number;
  directionalLightIntensity?: number;
  pointLightIntensity?: number;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

function RotatingSphere({
  color = "gray",
  wireframe = true,
  roughness = 0.2,
  metalness = 0.1,
  rotationSpeed = 0.2,
  sphereSize = 1.6,
  sphereDetail = [5, 3],
  icosahedronDetail = 0,
  geometry = 'icosahedron',
}: Partial<PolygonBallProps>) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.x += delta * rotationSpeed;
    }
  });

  if (geometry === 'icosahedron') {
    return (
      <Icosahedron ref={meshRef} args={[sphereSize, icosahedronDetail]}>
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
        />
      </Icosahedron>
    );
  }

  return (
    <Sphere ref={meshRef} args={[sphereSize, ...sphereDetail]}>
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        roughness={roughness}
        metalness={metalness}
      />
    </Sphere>
  );
}

export default function PolygonBall({
  color = "gray",
  wireframe = true,
  roughness = 0.2,
  metalness = 0.1,
  rotationSpeed = 0.2,
  sphereSize = 1.6,
  sphereDetail = [5, 3],
  icosahedronDetail = 0,
  geometry = 'icosahedron',
  ambientLightIntensity = 1.5,
  directionalLightIntensity = 2,
  pointLightIntensity = 1,
  cameraPosition = [0, 0, 5],
  cameraFov = 45,
}: PolygonBallProps) {
  return (
    <div className="w-full h-full bg-transparent">
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        gl={{ antialias: true }}
      >
        {/* Lights required to see 3D shading */}
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight position={[10, 10, 5]} intensity={directionalLightIntensity} />
        <pointLight position={[-10, -10, -5]} intensity={pointLightIntensity} />

        <RotatingSphere
          color={color}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
          rotationSpeed={rotationSpeed}
          sphereSize={sphereSize}
          sphereDetail={sphereDetail}
          icosahedronDetail={icosahedronDetail}
          geometry={geometry}
        />
      </Canvas>
    </div>
  );
}