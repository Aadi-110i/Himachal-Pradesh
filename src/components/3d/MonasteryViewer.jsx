import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Center, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const MonasteryViewer = ({ modelUrl }) => {
  return (
    <div className="w-full h-full relative">
      <Canvas 
        camera={{ position: [0, 5, 12], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        shadows
      >
        <color attach="background" args={['#0a0a0b']} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Center top>
            <Model url={modelUrl} />
          </Center>
          <ContactShadows 
            opacity={0.4} 
            scale={20} 
            blur={2.4} 
            far={10} 
            resolution={256} 
            color="#000000" 
          />
        </Suspense>
        
        <OrbitControls 
          makeDefault 
          enableDamping 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2.1} 
        />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      </Canvas>
    </div>
  );
};

export default MonasteryViewer;
