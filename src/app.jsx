import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Viewer } from './components/Viewer';

// These paths assume files are in public/models/
const LOCAL_MODELS = [
  { id: 'Helmet-Damaged', name: 'Damaged Helmet', path: '/models/DamagedHelmet.glb' },
  { id: 'Mars-Rover', name: 'Mars-Rover', path: '/models/25042_Perseverance.glb' },
  { id: 'Ingenuity-Helicopter', name: 'Helicopter', path: '/models/25043_Ingenuity_v3.glb' },
  { id: 'Antique-Camera', name: 'Antique Camera', path: '/models/AntiqueCamera.glb' },
  { id: 'Old-Lantern', name: 'Lantern', path: '/models/Lantern.glb' },
];

export default function App() {
  const [currentModel, setCurrentModel] = useState(LOCAL_MODELS[0]);
  const [activeColor, setActiveColor] = useState('#ffffff');

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', overflow: 'hidden' }}>
      <nav style={{ padding: '30px 50px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111' }}>
        <span style={{ fontWeight: 900, letterSpacing: '2px' }}>PRO.VISUALIZER</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {LOCAL_MODELS.map((m) => (
            <button 
              key={m.id}
              onClick={() => setCurrentModel(m)}
              style={{
                background: 'none',
                border: 'none',
                color: currentModel.id === m.id ? '#fff' : '#444',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {m.name.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ position: 'relative' }}>
        {/* AnimatePresence makes the transition between models smooth */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModel.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Viewer modelPath={currentModel.path} customColor={activeColor} />
          </motion.div>
        </AnimatePresence>

        {/* Floating Controls */}
        <div style={{ position: 'absolute', bottom: '50px', left: '50px' }}>
          <h2 style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>{currentModel.name}</h2>
          <p style={{ color: '#444' }}>INTERNAL_ASSET_REF: {currentModel.id}</p>
        </div>
      </main>
    </div>
  );
}
