'use client';
import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO, useTexture } from "@react-three/drei";
import * as THREE from "three";
import useMouse from "@/hooks/useMouse";
import useDimension from "@/hooks/useDimension";
import { vertex } from "@/shaders/vertex";
import { fragment } from "@/shaders/fragment";

export default function Model() {
  const { gl, camera, viewport } = useThree();
  const brushTexture = useTexture("/images/brush.png");
  const meshRefs = useRef([]);
  const [meshes, setMeshes] = useState([]);
  const mouse = useMouse();
  const device = useDimension();
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });
  const [currentWave, setCurrentWave] = useState(0);

  const scene = new THREE.Scene();
  const max = 100;

  // ✅ Only keep displacement + resolution
  const uniforms = useRef({
    uDisplacement: { value: null },
    winResolution: { value: new THREE.Vector2(0, 0) },
  });

  const fboBase = useFBO(device.width, device.height);

  // Create brush meshes
  useEffect(() => {
    const generatedMeshes = Array.from({ length: max }).map((_, i) => (
      <mesh
        key={i}
        position={[0, 0, 0]}
        ref={(el) => (meshRefs.current[i] = el)}
        rotation={[0, 0, Math.random()]}
        visible={false}
      >
        <planeGeometry args={[60, 60, 1, 1]} />
        <meshBasicMaterial transparent={true} map={brushTexture} />
      </mesh>
    ));
    setMeshes(generatedMeshes);
  }, [brushTexture]);

  function setNewWave(x, y, currentWave) {
    const mesh = meshRefs.current[currentWave];
    if (mesh) {
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.visible = true;
      mesh.material.opacity = 1;
      mesh.scale.set(1.75, 1.75, 1);
    }
  }

  function trackMousePos(x, y) {
    if (Math.abs(x - prevMouse.x) > 0.1 || Math.abs(y - prevMouse.y) > 0.1) {
      setCurrentWave((currentWave + 1) % max);
      setNewWave(x, y, currentWave);
    }
    setPrevMouse({ x, y });
  }

  // Main loop
  useFrame(({ gl, scene: finalScene }) => {
    const x = mouse.x - device.width / 2;
    const y = -mouse.y + device.height / 2;
    trackMousePos(x, y);

    // Animate waves
    meshRefs.current.forEach((mesh) => {
      if (mesh.visible) {
        mesh.rotation.z += 0.025;
        mesh.material.opacity *= 0.95;
        mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
        mesh.scale.y = 0.98 * mesh.scale.y + 0.155;
      }
    });

    if (device.width > 0 && device.height > 0) {
      // Render wave brushes into FBO
      gl.setRenderTarget(fboBase);
      gl.clear();
      meshRefs.current.forEach((mesh) => mesh.visible && scene.add(mesh));
      gl.render(scene, camera);
      meshRefs.current.forEach((mesh) => mesh.visible && scene.remove(mesh));

      uniforms.current.uDisplacement.value = fboBase.texture;

      // Set resolution
      uniforms.current.winResolution.value = new THREE.Vector2(
        device.width,
        device.height
      ).multiplyScalar(device.pixelRatio);

      // Render final scene with shader
      gl.setRenderTarget(null);
      gl.render(finalScene, camera);
    }
  }, 1);

  return (
    <group>
      {meshes}

      {/* Fullscreen plane with wave overlay shader */}
      <mesh>
        <planeGeometry args={[device.width, device.height, 1, 1]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent={true}
          uniforms={uniforms.current}
        />
      </mesh>
    </group>
  );
}
