"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SmokeShader } from "./shaders/SmokeShader";

const Smoke = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const mousePos = useRef([0.5, 0.5]); // Default center

  // Track mouse movement
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mousePos.current = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight];
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  // Update shader values
  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = clock.getElapsedTime();
      shaderRef.current.uniforms.mouse.value = new THREE.Vector2(...mousePos.current);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={{
          time: { value: 0 },
          mouse: { value: new THREE.Vector2(0.5, 0.5) },
        }}
        vertexShader={SmokeShader.vertexShader}
        fragmentShader={SmokeShader.fragmentShader}
        transparent
      />
    </mesh>
  );
};

const SmokeEffect = () => {
  return (
    <Canvas>
      <Smoke />
    </Canvas>
  );
};

export default SmokeEffect;
