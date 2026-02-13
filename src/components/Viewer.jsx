import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Float } from '@react-three/drei';

export const Viewer = ({ modelPath }) => {
  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 35 }}>
        <Suspense fallback={null}>
          <Stage environment="studio" intensity={0.5}>
            <Float speed={20}>
              <ModelLoader url={modelPath} />
            </Float>
          </Stage>
        </Suspense>
        <OrbitControls makeDefault enableZoom={false} />
      </Canvas>
    </div>
  );
};

// Separating the loader helps React handle the Suspense boundary better
const ModelLoader = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};
