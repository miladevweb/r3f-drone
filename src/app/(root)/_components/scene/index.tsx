'use client'
import { Color } from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, Grid, OrbitControls, Stage } from '@react-three/drei'
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'

import { Suspense } from 'react'
import { Model, Loader } from '../index'

export default function Scene() {
  return (
    <Canvas
      flat
      shadows
      style={{ height: '100vh' }}
      camera={{ position: [0, 0, 7], fov: 50 }}
    >
      <fog
        attach={'fog'}
        args={['#0D100F', 5, 22.5]}
      />

      {/* Stage is used to provide optimized lighting environment and shadow system for your Model */}
      <Suspense fallback={<Loader />}>
        <Stage
          intensity={0.5}
          environment={'city'}
          adjustCamera={false}
          /* Bias is used to prevent the grid from clipping through the mesh */
          shadows={{ type: 'accumulative', bias: -0.001, intensity: Math.PI }}
        >
          <Model rotation={[0, Math.PI, 0]} />
        </Stage>
      </Suspense>

      <Grid
        renderOrder={-1}
        position={[0, -1.85, 0]}
        infiniteGrid
        cellSize={0.6}
        cellThickness={0.6}
        sectionSize={3.3}
        sectionThickness={1.5}
        fadeDistance={30}
        sectionColor={new Color(0.5, 0.5, 10)}
      />

      <OrbitControls
        makeDefault
        autoRotate
        enableZoom={false}
        autoRotateSpeed={0.05}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />

      <EffectComposer enableNormalPass={false}>
        {/* Bloom is used to add a glow around the drone */}
        <Bloom
          mipmapBlur
          luminanceThreshold={2}
        />

        {/* ToneMapping is used to adjust the color temperature of the drone */}
        <ToneMapping />
      </EffectComposer>

      <Environment
        blur={0.8}
        preset="sunset"
        environmentIntensity={1.2}
      />
    </Canvas>
  )
}
