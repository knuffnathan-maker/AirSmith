"use client";

import { Component, type ReactNode, Suspense, useLayoutEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

import { ProceduralPart } from "@/components/viewer/procedural-part";
import {
  CATEGORY_LAYOUT,
  getModelUrl,
  isGltfUrl,
} from "@/lib/viewer/category-layout";
import type { BuildPart } from "@/lib/types";

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function normalizeGeometry(geometry: THREE.BufferGeometry, targetSize = 0.5) {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  if (!box) return geometry;

  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);

  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = targetSize / maxDim;
    geometry.scale(scale, scale, scale);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function StlMesh({ url, color }: { url: string; color: string }) {
  const rawGeometry = useLoader(STLLoader, url);
  const geometry = useMemo(
    () => normalizeGeometry(rawGeometry.clone()),
    [rawGeometry]
  );

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.5} />
    </mesh>
  );
}

function GltfMesh({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    root.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) root.scale.setScalar(0.5 / maxDim);
    return root;
  }, [scene]);

  useLayoutEffect(() => {
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [cloned]);

  return <primitive object={cloned} />;
}

function LoadedPartModel({ part }: { part: BuildPart }) {
  const url = getModelUrl(part.stl_url);
  const layout = CATEGORY_LAYOUT[part.category];
  const fallback = <ProceduralPart category={part.category} />;

  return (
    <group
      position={layout.position}
      rotation={layout.rotation}
      scale={layout.scale}
    >
      <ModelErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          {isGltfUrl(url) ? (
            <GltfMesh url={url} />
          ) : (
            <StlMesh url={url} color={layout.color} />
          )}
        </Suspense>
      </ModelErrorBoundary>
    </group>
  );
}

export function PartModel({ part }: { part: BuildPart }) {
  return <LoadedPartModel part={part} />;
}
