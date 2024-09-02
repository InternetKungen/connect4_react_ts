// import React, { useRef, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// const Tunnel: React.FC = () => {
//   const tunnelRef = useRef<THREE.Mesh>(null);
//   const tunnelSpeed = 0.01;

//   useFrame(() => {
//     if (tunnelRef.current) {
//       tunnelRef.current.rotation.y += tunnelSpeed;

//       // Kontrollera om materialet är av typen MeshBasicMaterial
//       const material = tunnelRef.current.material;
//       if (material instanceof THREE.MeshBasicMaterial) {
//         material.color.setHSL(
//           (Date.now() * 0.0001) % 1,
//           0.5,
//           0.5
//         );
//       }
//     }
//   });

//   return (
//     <mesh ref={tunnelRef}>
//       <cylinderGeometry args={[5, 5, 20, 32, 32, true]} />
//       <meshBasicMaterial side={THREE.BackSide} wireframe />
//     </mesh>
//   );
// };

// const NeonTunnel: React.FC = () => {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 0], fov: 75, rotation: [Math.PI / 2, 0, 0]}}
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       <ambientLight intensity={0.5} />
//       <Tunnel />
//     </Canvas>
//   );
// };

// export default NeonTunnel;

//------------------- other code -------------------

// const Tunnel: React.FC<{ y: number }> = ({ y }) => {
//   const segmentRef = useRef<THREE.Mesh>(null);

//   useFrame(() => {
//     if (segmentRef.current) {
//       segmentRef.current.position.y += 0.1; // Rörelse framåt

//       // Återställ position när cylindern passerar kameran
//       if (segmentRef.current.position.y > 10) {
//         segmentRef.current.position.y = -30; // Placera tillbaka segmentet längre fram
//       }
//     }
//   });

//   return (
//     <mesh ref={segmentRef} position={[0, y, 0]}>
//       <cylinderGeometry args={[5, 5, 20, 32, 32, true]} />
//       <meshBasicMaterial side={THREE.BackSide} wireframe />
//     </mesh>
//   );
// };

// const NeonTunnel: React.FC = () => {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 5], fov: 75, rotation: [0, 0, 0] }} // Kamerarotation 90 grader
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       <ambientLight intensity={0.5} />

//       {/* Skapa flera segment för tunneln */}
//       <Tunnel y={-10} />
//       <Tunnel y={-30} />
//       <Tunnel y={-50} />
//       <Tunnel y={-70} />
//     </Canvas>
//   );
// };

// export default NeonTunnel;

//------------------- other code -------------------

// const TunnelSegment: React.FC<{ y: number }> = ({ y }) => {
//   const segmentRef = useRef<THREE.Mesh>(null);

//   useFrame(() => {
//     if (segmentRef.current) {
//       segmentRef.current.position.y += 0.1; // Rörelse framåt

//       // Återställ position när cylindern passerar kameran
//       if (segmentRef.current.position.y > 0) {
//         segmentRef.current.position.y = -180; // Placera tillbaka segmentet längre fram
//       }
//     }
//   });

//   return (
//     <mesh ref={segmentRef} position={[0, y, 0]}>
//       <cylinderGeometry args={[5, 5, 20, 32, 32, true]} />
//       <meshBasicMaterial side={THREE.BackSide} wireframe />
//     </mesh>
//   );
// };

// const NeonTunnel: React.FC = () => {
//   return (
//     <Canvas
//       camera={{ position: [0, -20, 0], fov: 75, rotation: [-Math.PI / 2, 0, 0] }} // Kameran tittar rakt fram i tunneln
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       <ambientLight intensity={0.5} />

//       {/* Skapa flera segment för tunneln */}
//       <TunnelSegment y={-20} />
//       <TunnelSegment y={-40} />
//       <TunnelSegment y={-60} />
//       <TunnelSegment y={-80} />
//     </Canvas>
//   );
// };

// export default NeonTunnel;

//------------------- other code -------------------

// const TunnelSegment: React.FC<{ y: number }> = ({ y }) => {
//   const segmentRef = useRef<THREE.Mesh>(null);

//   useFrame(() => {
//     if (segmentRef.current) {
//       segmentRef.current.position.y += 0.1; // Rörelse framåt

//       // Återställ position när cylindern passerar kameran
//       if (segmentRef.current.position.y > 0) {
//         segmentRef.current.position.y = -160; // Placera tillbaka segmentet längre fram
//       }
//     }
//   });

//   return (
//     <mesh ref={segmentRef} position={[0, y, 0]}>
//       <cylinderGeometry args={[5, 5, 40, 32, 32, true]} />
//       <meshBasicMaterial side={THREE.BackSide} wireframe />
//     </mesh>
//   );
// };

// const NeonTunnel: React.FC = () => {
//   const segmentCount = 20; // Antal segment
//   const segmentSpacing = 40; // Avstånd mellan segmenten

//   const segments = Array.from({ length: segmentCount }, (_, i) => (
//     <TunnelSegment key={i} y={-i * segmentSpacing - 20} />
//   ));

//   return (
//     <Canvas
//       camera={{ position: [0, -40, 0], fov: 75, rotation: [-Math.PI / 2, 0, 0] }} // Kameran tittar rakt fram i tunneln
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       <ambientLight intensity={0.5} />
//       {segments}
//     </Canvas>
//   );
// };

// export default NeonTunnel;

//------------------- other code -------------------


// const TunnelSegment: React.FC<{ y: number }> = ({ y }) => {
//   const segmentRef = useRef<THREE.Mesh>(null);

//   useFrame(({ clock }) => {
//     if (segmentRef.current) {
//       segmentRef.current.position.y += 0.1; // Rörelse framåt

//       // Återställ position när cylindern passerar kameran
//       if (segmentRef.current.position.y > 0) {
//         segmentRef.current.position.y = -160; // Placera tillbaka segmentet längre fram
//       }

//       // Lägg till rotation för extra dynamik
//       segmentRef.current.rotation.y = clock.getElapsedTime() * 0.5;
//     }
//   });

//   const shaderMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       time: { value: 1.0 },
//       resolution: { value: new THREE.Vector2() },
//     },
//     vertexShader: `
//       varying vec2 vUv;
//       uniform float time;

//       void main() {
//         vUv = uv;
//         vec3 pos = position;
        
//         // // Skapa vågig deformation
//         // pos.x += sin(uv.y * 10.0 + time * 2.0) * 0.2;
//         // pos.y += cos(uv.y * 10.0 + time * 2.0) * 0.2;
//         // Skapa en wobblig deformation
//         pos.x += sin(uv.y * 10.0 + time * 2.0) * 0.3;
//         pos.x += sin(uv.y * 20.0 + time * 3.0) * 0.15;
//         pos.z += sin(uv.y * 50.0 + time * 4.0) * 0.2;

//         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform float time;
//       varying vec2 vUv;

//       void main() {
//         // Skiftande färger baserade på position och tid
//         gl_FragColor = vec4(
//           0.5 + 0.5 * sin(time + vUv.y * 10.0),
//           0.5 + 0.5 * sin(time + vUv.y * 15.0),
//           0.5 + 0.5 * sin(time + vUv.y * 20.0),
//           1.0
//         );
//       }
//     `,
//     side: THREE.BackSide, // Rendera insidan av tunneln
//     wireframe: false,
//   });

//   return (
//     <mesh ref={segmentRef} position={[0, y, 0]} material={shaderMaterial}>
//       <cylinderGeometry args={[5, 5, 40, 32, 32, true]} />
//     </mesh>
//   );
// };

// const NeonTunnel: React.FC = () => {
//   const segmentCount = 20; // Antal segment
//   const segmentSpacing = 40; // Avstånd mellan segmenten

//   const segments = Array.from({ length: segmentCount }, (_, i) => (
//     <TunnelSegment key={i} y={-i * segmentSpacing - 20} />
//   ));

//   return (
//     <Canvas
//       camera={{ position: [0, -40, 0], fov: 75, rotation: [-Math.PI / 2, 0, 0] }} // Kameran tittar rakt fram i tunneln
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       <ambientLight intensity={0.5} />
//       {segments}
//     </Canvas>
//   );
// };

// export default NeonTunnel;

//------------------------------------
// import React, { useRef } from 'react';
// import { Canvas, useFrame, extend } from '@react-three/fiber';
// import * as THREE from 'three';
// import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
// import { PointLightHelper } from 'three';

// const TunnelSegment: React.FC<{ y: number }> = ({ y }) => {
//   const segmentRef = useRef<THREE.Mesh>(null);

//   useFrame(({ clock }) => {
//     if (segmentRef.current) {
//       segmentRef.current.position.y += 0.1; // Rörelse framåt

//       // Återställ position när cylindern passerar kameran
//       if (segmentRef.current.position.y > 0) {
//         segmentRef.current.position.y = -160; // Placera tillbaka segmentet längre fram
//       }

//       // Lägg till rotation för extra dynamik
//       segmentRef.current.rotation.y = clock.getElapsedTime() * 0.5;
//     }
//   });

//   const shaderMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       time: { value: 1.0 },
//       resolution: { value: new THREE.Vector2() },
//     },
//     vertexShader: `
//       varying vec2 vUv;
//       uniform float time;

//       void main() {
//         vUv = uv;
//         vec3 pos = position;

//         // Skapa en wobblig deformation
//         pos.x += sin(uv.y * 10.0 + time * 2.0) * 0.3;
//         pos.x += sin(uv.y * 20.0 + time * 3.0) * 0.15;
//         pos.z += sin(uv.y * 50.0 + time * 4.0) * 0.2;

//         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform float time;
//       varying vec2 vUv;

//       void main() {
//         // Skiftande färger baserade på position och tid
//         gl_FragColor = vec4(
//           0.5 + 0.5 * sin(time + vUv.y * 10.0),
//           0.5 + 0.5 * sin(time + vUv.y * 15.0),
//           0.5 + 0.5 * sin(time + vUv.y * 20.0),
//           1.0
//         );
//       }
//     `,
//     side: THREE.BackSide, // Rendera insidan av tunneln
//     wireframe: false,
//   });

//   return (
//     <mesh ref={segmentRef} position={[0, y, 0]} material={shaderMaterial}>
//       <cylinderGeometry args={[5, 5, 40, 32, 32, true]} />
//     </mesh>
//   );
// };

// const NeonTunnel: React.FC = () => {
//   const segmentCount = 20; // Antal segment
//   const segmentSpacing = 40; // Avstånd mellan segmenten

//   const segments = Array.from({ length: segmentCount }, (_, i) => (
//     <TunnelSegment key={i} y={-i * segmentSpacing - 20} />
//   ));

//   return (
//     <Canvas
//       camera={{ position: [0, -40, 0], fov: 75, rotation: [-Math.PI / 2, 0, 0] }} // Kameran tittar rakt fram i tunneln
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       <ambientLight intensity={0.5} />
      
//       {/* Lägg till en punktljuskälla i slutet av tunneln */}
//       <pointLight position={[0, -segmentCount * segmentSpacing, 0]} intensity={2} distance={150} />
//       <primitive object={new PointLightHelper(new THREE.PointLight(0xffffff, 2), 1)} />

//       {segments}

//       {/* Lägg till efterbearbetningseffekter */}
//       <EffectComposer>
//         <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
//         <GodRays sunPosition ={[0, -segmentCount * segmentSpacing, 0]} decay={0.95} density={0.96} weight={0.6} samples={100} />
//       </EffectComposer>
//     </Canvas>
//   );
// };

// export default NeonTunnel;

//---------------------------------------------------
// import React, { useRef } from 'react';
// import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
// import * as THREE from 'three';
// import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
// import { PointLightHelper } from 'three';

// const TunnelSegment: React.FC<{ y: number }> = ({ y }) => {
//   const segmentRef = useRef<THREE.Mesh>(null);

//   useFrame(({ clock }) => {
//     if (segmentRef.current) {
//       segmentRef.current.position.y += 0.1; // Rörelse framåt

//       // Återställ position när cylindern passerar kameran
//       if (segmentRef.current.position.y > 0) {
//         segmentRef.current.position.y = -160; // Placera tillbaka segmentet längre fram
//       }

//       // Lägg till rotation för extra dynamik
//       segmentRef.current.rotation.y = clock.getElapsedTime() * 0.5;
//     }
//   });

//   const shaderMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       time: { value: 1.0 },
//       resolution: { value: new THREE.Vector2() },
//     },
//     vertexShader: `
//       varying vec2 vUv;
//       uniform float time;

//       void main() {
//         vUv = uv;
//         vec3 pos = position;

//         // Skapa en wobblig deformation
//         pos.x += sin(uv.y * 10.0 + time * 2.0) * 0.3;
//         pos.x += sin(uv.y * 20.0 + time * 3.0) * 0.15;
//         pos.z += sin(uv.y * 50.0 + time * 4.0) * 0.2;

//         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform float time;
//       varying vec2 vUv;

//       void main() {
//         // Skiftande färger baserade på position och tid
//         gl_FragColor = vec4(
//           0.5 + 0.5 * sin(time + vUv.y * 10.0),
//           0.5 + 0.5 * sin(time + vUv.y * 15.0),
//           0.5 + 0.5 * sin(time + vUv.y * 20.0),
//           1.0
//         );
//       }
//     `,
//     side: THREE.BackSide, // Rendera insidan av tunneln
//     wireframe: false,
//   });

//   return (
//     <mesh ref={segmentRef} position={[0, y, 0]} material={shaderMaterial}>
//       <cylinderGeometry args={[5, 5, 40, 32, 32, true]} />
//     </mesh>
//   );
// };

// const NeonTunnel: React.FC = () => {
//   const segmentCount = 20; // Antal segment
//   const segmentSpacing = 40; // Avstånd mellan segmenten

//   const segments = Array.from({ length: segmentCount }, (_, i) => (
//     <TunnelSegment key={i} y={-i * segmentSpacing - 20} />
//   ));

//   const lightRef = useRef<THREE.PointLight>(null);
//   const { gl, scene, camera } = useThree();

//   return (
//     <Canvas
//       camera={{ position: [0, -40, 0], fov: 75, rotation: [-Math.PI / 2, 0, 0] }} // Kameran tittar rakt fram i tunneln
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       <ambientLight intensity={0.5} />

//       {/* Lägg till en punktljuskälla i slutet av tunneln */}
//       <pointLight
//         ref={lightRef}
//         position={[0, -segmentCount * segmentSpacing, 0]}
//         intensity={2}
//         distance={150}
//       />
//       <primitive
//         object={new PointLightHelper(new THREE.PointLight(0xffffff, 2), 1)}
//       />

//       {segments}

//       {/* Lägg till efterbearbetningseffekter */}
//       <EffectComposer>
//         <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
//         {lightRef.current! && (
//           <GodRays
//             sun={lightRef.current}
//             decay={0.95}
//             density={0.96}
//             weight={0.6}
//             samples={100}
//           />
//         )}
//       </EffectComposer>
//     </Canvas>
//   );
// };

// export default NeonTunnel;

//---------------------------------------------
// Fungerar typ, men använder godrays och bloom , och dessa gör inget mer än tar prestanda i denna version
// import React, { useRef } from 'react';
// import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
// import * as THREE from 'three';
// import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
// import { PointLightHelper } from 'three';

// const TunnelSegment: React.FC<{ y: number }> = ({ y }) => {
//   const segmentRef = useRef<THREE.Mesh>(null);

//   useFrame(({ clock }) => {
//     if (segmentRef.current) {
//       segmentRef.current.position.y += 0.1; // Rörelse framåt

//       // Återställ position när cylindern passerar kameran
//       if (segmentRef.current.position.y > 0) {
//         segmentRef.current.position.y = -160; // Placera tillbaka segmentet längre fram
//       }

//       // Lägg till rotation för extra dynamik
//       segmentRef.current.rotation.y = clock.getElapsedTime() * 0.5;
//     }
//   });

//   const shaderMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       time: { value: 1.0 },
//       resolution: { value: new THREE.Vector2() },
//     },
//     vertexShader: `
//       varying vec2 vUv;
//       uniform float time;

//       void main() {
//         vUv = uv;
//         vec3 pos = position;

//         // Skapa en wobblig deformation
//         pos.x += sin(uv.y * 10.0 + time * 2.0) * 0.9;
//         pos.x += sin(uv.y * 20.0 + time * 3.0) * 0.15;
//         pos.z += sin(uv.y * 30.0 + time * 4.0) * 0.2;

//         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform float time;
//       varying vec2 vUv;

//       void main() {
//         // Skiftande färger baserade på position och tid
//         gl_FragColor = vec4(
//           0.5 + 0.5 * sin(time + vUv.y * 10.0),
//           0.5 + 0.5 * sin(time + vUv.y * 15.0),
//           0.5 + 0.5 * sin(time + vUv.y * 20.0),
//           1.0
//         );
//       }
//     `,
//     side: THREE.BackSide, // Rendera insidan av tunneln
//     wireframe: false,
//   });

//   // [radiusTop, radiusBottom, height, segmentsRadial, segmentsHeight, openEnded] - defaults [5, 5, 40, 32, 32, true]
//   return (
//     <mesh ref={segmentRef} position={[0, y, 0]} material={shaderMaterial}>
//       <cylinderGeometry args={[10, 5, 50, 32, 52, true]} />
      
//     </mesh>
//   );
// };

// const NeonTunnel: React.FC = () => {
//   const segmentCount = 20; // Antal segment
//   const segmentSpacing = 40; // Avstånd mellan segmenten

//   const segments = Array.from({ length: segmentCount }, (_, i) => (
//     <TunnelSegment key={i} y={-i * segmentSpacing - 20} />
//   ));

//   const lightRef = useRef<THREE.PointLight>(null);
//   const meshRef = useRef<THREE.Mesh>(null); // Ny referens till den lilla sfären

//   return (
//     <Canvas
//       camera={{ position: [0, -40, 0], fov: 75, rotation: [-Math.PI / 2, 0, 0] }} // Kameran tittar rakt fram i tunneln
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       <ambientLight intensity={0.5} />

//       {/* Lägg till en punktljuskälla i slutet av tunneln */}
//       <pointLight
//         ref={lightRef}
//         position={[0, -segmentCount * segmentSpacing, 0]}
//         intensity={2}
//         distance={150}
//       />
//       <primitive
//         object={new PointLightHelper(new THREE.PointLight(0xffffff, 2), 1)}
//       />

//       {/* Skapa en liten sfär som representerar ljuset för GodRays */}
//       <mesh ref={meshRef} position={[0, -segmentCount * segmentSpacing, 0]}>
//         <sphereGeometry args={[1, 32, 32]} />
//         <meshBasicMaterial color="white" />
//       </mesh>

//       {segments}

//       {/* Lägg till efterbearbetningseffekter */}
//       <EffectComposer>
//         <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
//         {meshRef.current! && (
//           <GodRays
//             sun={meshRef.current}
//             decay={0.95}
//             density={0.96}
//             weight={0.6}
//             samples={100}
//           />
//         )}
//       </EffectComposer>
//     </Canvas>
//   );
// };

// export default NeonTunnel;

//-- Test med spotlight-- Gav inget direkt..
// import React, { useRef } from 'react';
// import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
// import * as THREE from 'three';
// import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
// import { SpotLightHelper } from 'three';

// const TunnelSegment: React.FC<{ y: number }> = ({ y }) => {
//   const segmentRef = useRef<THREE.Mesh>(null);

//   useFrame(({ clock }) => {
//     if (segmentRef.current) {
//       segmentRef.current.position.y += 0.1; // Rörelse framåt

//       // Återställ position när cylindern passerar kameran
//       if (segmentRef.current.position.y > 0) {
//         segmentRef.current.position.y = -160; // Placera tillbaka segmentet längre fram
//       }

//       // Lägg till rotation för extra dynamik
//       segmentRef.current.rotation.y = clock.getElapsedTime() * 0.5;
//     }
//   });

//   const shaderMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       time: { value: 1.0 },
//       resolution: { value: new THREE.Vector2() },
//     },
//     vertexShader: `
//       varying vec2 vUv;
//       uniform float time;

//       void main() {
//         vUv = uv;
//         vec3 pos = position;

//         // Skapa en wobblig deformation
//         pos.x += sin(uv.y * 10.0 + time * 2.0) * 0.9;
//         pos.x += sin(uv.y * 20.0 + time * 3.0) * 0.15;
//         pos.z += sin(uv.y * 30.0 + time * 4.0) * 0.2;

//         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform float time;
//       varying vec2 vUv;

//       void main() {
//         // Skiftande färger baserade på position och tid
//         gl_FragColor = vec4(
//           0.5 + 0.5 * sin(time + vUv.y * 10.0),
//           0.5 + 0.5 * sin(time + vUv.y * 15.0),
//           0.5 + 0.5 * sin(time + vUv.y * 20.0),
//           1.0
//         );
//       }
//     `,
//     side: THREE.BackSide, // Rendera insidan av tunneln
//     wireframe: false,
//   });

//   // [radiusTop, radiusBottom, height, segmentsRadial, segmentsHeight, openEnded]
//   return (
//     <mesh
//       ref={segmentRef}
//       position={[0, y, 0]}
//       material={shaderMaterial}
//       castShadow
//       receiveShadow
//     >
//       <cylinderGeometry args={[10, 5, 50, 32, 52, true]} />
//     </mesh>
//   );
// };

// const NeonTunnel: React.FC = () => {
//   const segmentCount = 20; // Antal segment
//   const segmentSpacing = 40; // Avstånd mellan segmenten

//   const segments = Array.from({ length: segmentCount }, (_, i) => (
//     <TunnelSegment key={i} y={-i * segmentSpacing - 20} />
//   ));

//   const lightRef = useRef<THREE.SpotLight>(null);
//   const meshRef = useRef<THREE.Mesh>(null); // Ny referens till den lilla sfären

//   return (
//     <Canvas
//       shadows
//       camera={{ position: [0, -40, 0], fov: 75, rotation: [-Math.PI / 2, 0, 0] }} // Kameran tittar rakt fram i tunneln
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       <ambientLight intensity={0.2} />

//       {/* Lägg till en spotljuskälla i slutet av tunneln */}
//       <spotLight
//         ref={lightRef}
//         position={[0, -segmentCount * segmentSpacing, 0]}
//         intensity={3}
//         angle={0.3}
//         distance={300}
//         penumbra={0.5}
//         castShadow
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//       />
//       <primitive object={new SpotLightHelper(new THREE.SpotLight(0xffffff, 2))} />

//       {/* Skapa en liten sfär som representerar ljuset för GodRays */}
//       <mesh ref={meshRef} position={[0, -segmentCount * segmentSpacing, 0]}>
//         <sphereGeometry args={[1, 32, 32]} />
//         <meshBasicMaterial color="white" />
//       </mesh>

//       {segments}

//       {/* Lägg till efterbearbetningseffekter */}
//       <EffectComposer>
//         <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
//         {meshRef.current! && (
//           <GodRays
//             sun={meshRef.current}
//             decay={0.95}
//             density={0.96}
//             weight={0.9}
//             samples={120}
//           />
//         )}
//       </EffectComposer>
//     </Canvas>
//   );
// };

// export default NeonTunnel;

// --- transarent tube -- inge vidare

// import React, { useRef } from 'react';
// import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
// import * as THREE from 'three';
// import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
// import { SpotLightHelper } from 'three';

// const TunnelSegment: React.FC<{ y: number }> = ({ y }) => {
//   const segmentRef = useRef<THREE.Mesh>(null);

//   useFrame(({ clock }) => {
//     if (segmentRef.current) {
//       segmentRef.current.position.y += 0.1; // Rörelse framåt

//       // Återställ position när cylindern passerar kameran
//       if (segmentRef.current.position.y > 0) {
//         segmentRef.current.position.y = -160; // Placera tillbaka segmentet längre fram
//       }

//       // Lägg till rotation för extra dynamik
//       segmentRef.current.rotation.y = clock.getElapsedTime() * 0.5;
//     }
//   });

//   const shaderMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       time: { value: 1.0 },
//       resolution: { value: new THREE.Vector2() },
//     },
//     vertexShader: `
//       varying vec2 vUv;
//       uniform float time;

//       void main() {
//         vUv = uv;
//         vec3 pos = position;

//         // Skapa en wobblig deformation
//         pos.x += sin(uv.y * 10.0 + time * 2.0) * 0.9;
//         pos.x += sin(uv.y * 20.0 + time * 3.0) * 0.15;
//         pos.z += sin(uv.y * 30.0 + time * 4.0) * 0.2;

//         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform float time;
//       varying vec2 vUv;

//       void main() {
//         // Skiftande färger baserade på position och tid
//         gl_FragColor = vec4(
//           0.5 + 0.5 * sin(time + vUv.y * 10.0),
//           0.5 + 0.5 * sin(time + vUv.y * 15.0),
//           0.5 + 0.5 * sin(time + vUv.y * 20.0),
//           0.5 // Opacitet satt till 0.5 för transparens
//         );
//       }
//     `,
//     side: THREE.BackSide, // Rendera insidan av tunneln
//     wireframe: false,
//     transparent: true, // Aktivera transparens
//     opacity: 0.2, // Justera opaciteten för att göra tunneln transparent
//   });

//   // [radiusTop, radiusBottom, height, segmentsRadial, segmentsHeight, openEnded]
//   return (
//     <mesh
//       ref={segmentRef}
//       position={[0, y, 0]}
//       material={shaderMaterial}
//       castShadow
//       receiveShadow
//     >
//       <cylinderGeometry args={[10, 5, 50, 32, 52, true]} />
//     </mesh>
//   );
// };

// const NeonTunnel: React.FC = () => {
//   const segmentCount = 20; // Antal segment
//   const segmentSpacing = 40; // Avstånd mellan segmenten

//   const segments = Array.from({ length: segmentCount }, (_, i) => (
//     <TunnelSegment key={i} y={-i * segmentSpacing - 20} />
//   ));

//   const lightRef = useRef<THREE.SpotLight>(null);
//   const meshRef = useRef<THREE.Mesh>(null); // Ny referens till den lilla sfären

//   return (
//     <Canvas
//       shadows
//       camera={{ position: [0, -40, 0], fov: 75, rotation: [-Math.PI / 2, 0, 0] }} // Kameran tittar rakt fram i tunneln
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       <ambientLight intensity={0.2} />

//       {/* Lägg till en spotljuskälla i slutet av tunneln */}
//       <spotLight
//         ref={lightRef}
//         position={[0, -segmentCount * segmentSpacing, 0]}
//         intensity={3}
//         angle={0.3}
//         distance={300}
//         penumbra={0.5}
//         castShadow
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//       />
//       <primitive object={new SpotLightHelper(new THREE.SpotLight(0xffffff, 2))} />

//       {/* Skapa en liten sfär som representerar ljuset för GodRays */}
//       <mesh ref={meshRef} position={[0, -segmentCount * segmentSpacing, 0]}>
//         <sphereGeometry args={[1, 32, 32]} />
//         <meshBasicMaterial color="white" />
//       </mesh>

//       {segments}

//       {/* Lägg till efterbearbetningseffekter */}
//       <EffectComposer>
//         <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
//         {meshRef.current! && (
//           <GodRays
//             sun={meshRef.current}
//             decay={0.95}
//             density={0.96}
//             weight={0.9}
//             samples={120}
//           />
//         )}
//       </EffectComposer>
//     </Canvas>
//   );
// };

// export default NeonTunnel;

// -- något helt nytt -- Bytta namn till Tunnel.tsx -- denna fungerar inte

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { TweenMax, Power1, Power2, RoughEase } from 'gsap';

// // Include any additional CSS as needed
// import './Tunnel.css';

// const Tunnel: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const ww = window.innerWidth;
//     const wh = window.innerHeight;

//     class Tunnel {
//       private speed: number;
//       private mouse: any;
//       private renderer: THREE.WebGLRenderer;
//       private camera: THREE.PerspectiveCamera;
//       private scene: THREE.Scene;
//       private tubeMesh?: THREE.Mesh;
//       private tubeMaterial?: THREE.MeshBasicMaterial;
//       private tubeGeometry?: THREE.TubeGeometry;
//       private tubeGeometry_o?: THREE.TubeGeometry;
//       private splineMesh?: THREE.Line;
//       private curve?: THREE.CatmullRomCurve3;
//       private textureParams: any;
//       private cameraShake: any;

//       constructor(texture: THREE.Texture) {
//         this.init();
//         this.createMesh(texture);
//         this.handleEvents();
//         this.initAnimation();
//         window.requestAnimationFrame(this.render.bind(this));
//       }

//       init() {
//         this.speed = 8;

//         this.mouse = {
//           position: new THREE.Vector2(ww * 0.5, wh * 0.5),
//           ratio: new THREE.Vector2(0, 0),
//           target: new THREE.Vector2(ww * 0.5, wh * 0.5),
//         };

//         this.renderer = new THREE.WebGLRenderer({
//           antialias: true,
//           canvas: canvasRef.current!,
//         });
//         this.renderer.setSize(ww, wh);

//         this.camera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 1000);
//         this.camera.rotation.y = Math.PI;
//         this.camera.position.z = 0.35;

//         this.scene = new THREE.Scene();
//       }

//       createMesh(texture: THREE.Texture) {
//         const points: THREE.Vector3[] = [];
//         const geometry = new THREE.BufferGeometry();

//         this.scene.remove(this.tubeMesh!);

//         for (let i = 0; i < 5; i += 1) {
//           points.push(new THREE.Vector3(0, 0, 3 * (i / 4)));
//         }
//         points[4].y = -0.06;

//         this.curve = new THREE.CatmullRomCurve3(points);
//         this.curve.type = "catmullrom";

//         geometry.vertices = this.curve.getPoints(70);
//         this.splineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());

//         this.tubeMaterial = new THREE.MeshBasicMaterial({
//           side: THREE.BackSide,
//           map: texture,
//         });
//         this.tubeMaterial.map.wrapS = THREE.MirroredRepeatWrapping;
//         this.tubeMaterial.map.wrapT = THREE.MirroredRepeatWrapping;
//         this.tubeMaterial.map.repeat.set(10, 4);

//         this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 30, false);
//         this.tubeGeometry_o = this.tubeGeometry.clone();
//         this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);

//         this.scene.add(this.tubeMesh);
//       }

//       handleEvents() {
//         window.addEventListener("resize", this.onResize.bind(this), false);
//         document.body.addEventListener("mousemove", this.onMouseMove.bind(this), false);
//       }

//       onResize() {
//         const ww = window.innerWidth;
//         const wh = window.innerHeight;

//         this.camera.aspect = ww / wh;
//         this.camera.updateProjectionMatrix();
//         this.renderer.setSize(ww, wh);
//       }

//       onMouseMove(e: MouseEvent) {
//         this.mouse.target.x = e.clientX;
//         this.mouse.target.y = e.clientY;
//       }

//       update() {
//         this.createMesh(this.tubeMaterial!.map!);
//       }

//       initAnimation() {
//         this.textureParams = {
//           offsetX: 0,
//           offsetY: 0,
//           repeatX: 10,
//           repeatY: 4,
//         };
//         this.cameraShake = {
//           x: 0,
//           y: 0,
//         };

//         const hyperSpace = new TweenMax({ repeat: -1 });
//         hyperSpace.to(this.textureParams, 4, {
//           repeatX: 0.3,
//           ease: Power1.easeInOut,
//         });
//         hyperSpace.to(this.textureParams, 12, {
//           offsetX: 8,
//           ease: Power2.easeInOut,
//         }, 0);
//         hyperSpace.to(this.textureParams, 6, {
//           repeatX: 10,
//           ease: Power2.easeInOut,
//         }, "-=5");

//         const shake = new TweenMax({ repeat: -1, repeatDelay: 5 });
//         shake.to(this.cameraShake, 2, {
//           x: -0.01,
//           ease: RoughEase.ease.config({
//             template: Power1.easeNone,
//             strength: 0.5,
//             points: 100,
//             taper: "none",
//             randomize: true,
//             clamp: false,
//           }),
//         }, 4);
//         shake.to(this.cameraShake, 2, {
//           x: 0,
//           ease: RoughEase.ease.config({
//             template: Power1.easeNone,
//             strength: 0.5,
//             points: 100,
//             taper: "none",
//             randomize: true,
//             clamp: false,
//           }),
//         });
//       }

//       updateMaterialOffset() {
//         this.tubeMaterial!.map.offset.x = this.textureParams.offsetX;
//         this.tubeMaterial!.map.offset.y += 0.001;
//         this.tubeMaterial!.map.repeat.set(this.textureParams.repeatX, this.textureParams.repeatY);
//       }

//       updateCameraPosition() {
//         this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 50;
//         this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 50;

//         this.mouse.ratio.x = this.mouse.position.x / window.innerWidth;
//         this.mouse.ratio.y = this.mouse.position.y / window.innerHeight;

//         this.camera.position.x =
//           this.mouse.ratio.x * 0.044 - 0.025 + this.cameraShake.x;
//         this.camera.position.y = this.mouse.ratio.y * 0.044 - 0.025;
//       }

//       updateCurve() {
//         let vertice_o: THREE.Vector3;
//         let vertice: THREE.Vector3;
//         for (let i = 0; i < this.tubeGeometry!.vertices.length; i += 1) {
//           vertice_o = this.tubeGeometry_o!.vertices[i];
//           vertice = this.tubeGeometry!.vertices[i];
//           const index = Math.floor(i / 30);
//           vertice.x +=
//             (vertice_o.x + this.splineMesh!.geometry.vertices[index].x - vertice.x) / 15;
//           vertice.y +=
//             (vertice_o.y + this.splineMesh!.geometry.vertices[index].y - vertice.y) / 15;
//         }
//         this.tubeGeometry!.verticesNeedUpdate = true;

//         this.curve!.points[2].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;
//         this.curve!.points[3].x = 0;
//         this.curve!.points[4].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;

//         this.curve!.points[2].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;
//         this.curve!.points[3].y = 0;
//         this.curve!.points[4].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;

//         this.splineMesh!.geometry.verticesNeedUpdate = true;
//         this.splineMesh!.geometry.vertices = this.curve!.getPoints(70);
//       }

//       render() {
//         this.updateMaterialOffset();
//         this.updateCameraPosition();
//         this.updateCurve();
//         this.renderer.render(this.scene, this.camera);
//         window.requestAnimationFrame(this.render.bind(this));
//       }
//     }

//     const loader = new THREE.TextureLoader();
//     loader.crossOrigin = "Anonymous";
//     loader.load(
//       "img/demo3/galaxyTexture.jpg",
//       (texture) => {
//         document.body.classList.remove("loading");
//         new Tunnel(texture);
//       }
//     );
//   }, []);

//   return (
//     <main className="demo-3">
//       <header className="codrops-header">
//         <div className="codrops-links">
//           <a className="codrops-icon codrops-icon--prev" href="https://tympanus.net/Development/ScrollSpiral/" title="Previous Demo">
//             <span>Previous Demo</span>
//           </a>
//           <a className="codrops-icon codrops-icon--next" href="https://tympanus.net/Development/ElasticImages/" title="Next Demo">
//             <span>Next Demo</span>
//           </a>
//         </div>
//         <h1>
//           <a href="https://tympanus.net/codrops" title="Codrops">Codrops</a>
//           <span>Demo: Tunnel</span>
//         </h1>
//       </header>
//       <canvas ref={canvasRef} />
//     </main>
//   );
// };

// export default Tunnel;

//----- Nytt försök att få den att fungera
// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { TweenMax, Power1, Power2 } from 'gsap';

// // Include any additional CSS as needed
// import './Tunnel.css';

// const Tunnel: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const ww = window.innerWidth;
//     const wh = window.innerHeight;

//     class Tunnel {
//       private speed: number | undefined;
//       private mouse: any;
//       private renderer: THREE.WebGLRenderer | undefined;
//       private camera: THREE.PerspectiveCamera | undefined;
//       private scene: THREE.Scene | undefined;
//       private tubeMesh?: THREE.Mesh;
//       private tubeMaterial?: THREE.MeshBasicMaterial;
//       private tubeGeometry?: THREE.TubeGeometry;
//       private tubeGeometry_o?: THREE.TubeGeometry;
//       private splineMesh?: THREE.Line;
//       private curve?: THREE.CatmullRomCurve3;
//       private textureParams: any;
//       private cameraShake: any;

//       constructor(texture: THREE.Texture) {
//         this.init();
//         this.createMesh(texture);
//         this.handleEvents();
//         this.initAnimation();
//         window.requestAnimationFrame(this.render.bind(this));
//       }

//       init() {
//         this.speed = 8;

//         this.mouse = {
//           position: new THREE.Vector2(ww * 0.5, wh * 0.5),
//           ratio: new THREE.Vector2(0, 0),
//           target: new THREE.Vector2(ww * 0.5, wh * 0.5),
//         };

//         this.renderer = new THREE.WebGLRenderer({
//           antialias: true,
//           canvas: canvasRef.current!,
//         });
//         this.renderer.setSize(ww, wh);

//         this.camera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 1000);
//         this.camera.rotation.y = Math.PI;
//         this.camera.position.z = 0.35;

//         this.scene = new THREE.Scene();
//       }

//       createMesh(texture: THREE.Texture) {
//         const points: THREE.Vector3[] = [];
//         const geometry = new THREE.BufferGeometry();

//         this.scene!.remove(this.tubeMesh!);

//         for (let i = 0; i < 5; i += 1) {
//           points.push(new THREE.Vector3(0, 0, 3 * (i / 4)));
//         }
//         points[4].y = -0.06;

//         this.curve = new THREE.CatmullRomCurve3(points);
//         // Removed setting type as it is read-only

//         const splinePoints = this.curve.getPoints(70);
//         const splineGeometry = new THREE.BufferGeometry().setFromPoints(splinePoints);
//         this.splineMesh = new THREE.Line(splineGeometry, new THREE.LineBasicMaterial());

//         this.tubeMaterial = new THREE.MeshBasicMaterial({
//           side: THREE.BackSide,
//           map: texture,
//         });
//         this.tubeMaterial.map!.wrapS = THREE.MirroredRepeatWrapping;
//         this.tubeMaterial.map!.wrapT = THREE.MirroredRepeatWrapping;
//         this.tubeMaterial.map!.repeat.set(10, 4);

//         this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 30, false);
//         this.tubeGeometry_o = this.tubeGeometry.clone();
//         this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);

//         this.scene!.add(this.tubeMesh);
//       }

//       handleEvents() {
//         window.addEventListener("resize", this.onResize.bind(this), false);
//         document.body.addEventListener("mousemove", this.onMouseMove.bind(this), false);
//       }

//       onResize() {
//         const ww = window.innerWidth;
//         const wh = window.innerHeight;

//         this.camera!.aspect = ww / wh;
//         this.camera!.updateProjectionMatrix();
//         this.renderer!.setSize(ww, wh);
//       }

//       onMouseMove(e: MouseEvent) {
//         this.mouse.target.x = e.clientX;
//         this.mouse.target.y = e.clientY;
//       }

//       update() {
//         this.createMesh(this.tubeMaterial!.map!);
//       }

//       initAnimation() {
//         this.textureParams = {
//           offsetX: 0,
//           offsetY: 0,
//           repeatX: 10,
//           repeatY: 4,
//         };
//         this.cameraShake = {
//           x: 0,
//           y: 0,
//         };

//         const hyperSpace = TweenMax.to(this.textureParams, 12, {
//           repeatX: 10,
//           ease: Power2.easeInOut,
//         });
//         TweenMax.to(this.textureParams, 4, {
//           repeatX: 0.3,
//           ease: Power1.easeInOut,
//         });
//         TweenMax.to(this.textureParams, 12, {
//           offsetX: 8,
//           ease: Power2.easeInOut,
//         });

//         const shake = TweenMax.to(this.cameraShake, 2, {
//           x: 0.01,
//           ease: RoughEase.ease.config({
//             template: Power1.easeInOut,
//             strength: 0.5,
//             points: 100,
//             taper: "none",
//             randomize: true,
//             clamp: false,
//           }),
//         });
//         TweenMax.to(this.cameraShake, 2, {
//           x: 0,
//           ease: RoughEase.ease.config({
//             template: Power1.easeInOut,
//             strength: 0.5,
//             points: 100,
//             taper: "none",
//             randomize: true,
//             clamp: false,
//           }),
//         });
//       }

//       updateMaterialOffset() {
//         if (!this.tubeMaterial) return;

//         this.tubeMaterial.map!.offset.x = this.textureParams.offsetX;
//         this.tubeMaterial.map!.offset.y += 0.001;
//         this.tubeMaterial.map!.repeat.set(this.textureParams.repeatX, this.textureParams.repeatY);
//       }

//       updateCameraPosition() {
//         this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 50;
//         this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 50;

//         this.mouse.ratio.x = this.mouse.position.x / window.innerWidth;
//         this.mouse.ratio.y = this.mouse.position.y / window.innerHeight;

//         this.camera!.position.x =
//           this.mouse.ratio.x * 0.044 - 0.025 + this.cameraShake.x;
//         this.camera!.position.y = this.mouse.ratio.y * 0.044 - 0.025;
//       }

//       updateCurve() {
//         if (!this.tubeGeometry || !this.tubeGeometry_o || !this.splineMesh || !this.curve) return;

//         let vertice_o: THREE.Vector3;
//         let vertice: THREE.Vector3;
//         for (let i = 0; i < this.tubeGeometry.attributes.position.count; i += 1) {
//           vertice_o = new THREE.Vector3().fromBufferAttribute(this.tubeGeometry_o.attributes.position, i);
//           vertice = new THREE.Vector3().fromBufferAttribute(this.tubeGeometry.attributes.position, i);
//           const index = Math.floor(i / 30);
//           vertice.x +=
//             (vertice_o.x + this.splineMesh.geometry.attributes.position.getX(index) - vertice.x) / 15;
//           vertice.y +=
//             (vertice_o.y + this.splineMesh.geometry.attributes.position.getY(index) - vertice.y) / 15;
//         }
//         this.tubeGeometry.attributes.position.needsUpdate = true;

//         this.curve.points[2].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;
//         this.curve.points[3].x = 0;
//         this.curve.points[4].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;

//         this.curve.points[2].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;
//         this.curve.points[3].y = 0;
//         this.curve.points[4].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;

//         this.splineMesh.geometry.attributes.position.needsUpdate = true;
//         const newPoints = this.curve.getPoints(70);
//         this.splineMesh.geometry.setFromPoints(newPoints);
//       }

//       render() {
//         this.updateMaterialOffset();
//         this.updateCameraPosition();
//         this.updateCurve();
//         this.renderer!.render(this.scene!, this.camera!);
//         window.requestAnimationFrame(this.render.bind(this));
//       }
//     }

//     const loader = new THREE.TextureLoader();
//     loader.crossOrigin = "Anonymous";
//     loader.load(
//       "img/demo3/galaxyTexture.jpg",
//       (texture) => {
//         document.body.classList.remove("loading");
//         new Tunnel(texture);
//       }
//     );
//   }, []);

//   return (
//     <main className="demo-3">
//       <header className="codrops-header">
//         <div className="codrops-links">
//           <a className="codrops-icon codrops-icon--prev" href="https://tympanus.net/Development/ScrollSpiral/" title="Previous Demo">
//             <span>Previous Demo</span>
//           </a>
//           <a className="codrops-icon codrops-icon--next" href="https://tympanus.net/Development/ElasticImages/" title="Next Demo">
//             <span>Next Demo</span>
//           </a>
//         </div>
//         <h1>
//           <a href="https://tympanus.net/codrops" title="Codrops">Codrops</a>
//           <span>Demo: Tunnel</span>
//         </h1>
//       </header>
//       <canvas ref={canvasRef} />
//     </main>
//   );
// };

// export default Tunnel;
