import { easing } from 'maath'
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PointLight } from 'three'

type GLTFResult = ReturnType<typeof useGLTF> & {
  nodes: {
    body001: Mesh
    head001: Mesh
    stripe001: Mesh
  }

  materials: {
    Body: MeshStandardMaterial
    Head: MeshStandardMaterial
    Stripe: MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const head = useRef<Group>(null)
  const light = useRef<PointLight>(null)
  const stripe = useRef<MeshBasicMaterial>(null)

  const { nodes, materials } = useGLTF('/3D/drone.glb') as GLTFResult

  useFrame((state, delta) => {
    const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2

    if (stripe.current && head.current && light.current) {
      stripe.current.color.setRGB(2 + t * 20, 2, 20 + t * 50)

      easing.dampE(head.current.rotation, [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0], 0.4, delta)

      light.current.intensity = 1 + t * 4
    }
  })

  return (
    <group {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.body001.geometry}
        material={materials.Body}
      />

      <group ref={head}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.head001.geometry}
          material={materials.Head}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.stripe001.geometry}
        >
          <meshBasicMaterial
            ref={stripe}
            toneMapped={false}
          />

          <pointLight
            ref={light}
            intensity={1}
            distance={2.5}
            color={[10, 2, 5]}
          />
        </mesh>
      </group>
    </group>
  )
}
