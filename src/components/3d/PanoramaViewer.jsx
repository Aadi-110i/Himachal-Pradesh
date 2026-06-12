import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Panorama({ url }) {
  const texture = useTexture(url);
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

const PanoramaViewer = ({ imageUrl }) => {
  return (
    <div className="w-full h-full relative cursor-all-scroll">
      <Canvas camera={{ position: [0, 0, 0.1] }}>
        <React.Suspense fallback={null}>
          <Panorama url={imageUrl} />
        </React.Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableDamping 
          rotateSpeed={-0.5} // Standard 360 viewer feel
        />
      </Canvas>
    </div>
  );
};

export default PanoramaViewer;
