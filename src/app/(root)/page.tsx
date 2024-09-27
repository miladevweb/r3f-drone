import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./_components/scene'), { ssr: false })

export default function Page() {
  return <Scene />
}

export const metadata = {
  title: 'React Three Fiber - Drone | Just Mila',
}
