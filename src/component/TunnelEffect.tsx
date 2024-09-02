// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { TweenMax, Power1, Power2 } from 'gsap';
// import RoughEase from 'gsap/EasePack';

// const TunnelEffect: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const ww = window.innerWidth;
//     const wh = window.innerHeight;

//     class Tunnel {
//       private speed: number = 8;
//       private mouse: any;
//       private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
//       private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 1000);
//       private scene: THREE.Scene = new THREE.Scene();
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

//         this.camera.position.x = this.mouse.ratio.x * 0.044 - 0.025 + this.cameraShake.x;
//         this.camera.position.y = this.mouse.ratio.y * 0.044 - 0.025;
//       }

//       updateCurve() {
//         if (!this.tubeGeometry || !this.tubeGeometry_o || !this.splineMesh || !this.curve) return;

//         let vertice_o: THREE.Vector3;
//         let vertice: THREE.Vector3;
//         for (let i = 0; i < this.tubeGeometry.attributes.position.count; i += 1) {
//           vertice_o = new THREE.Vector3().fromBufferAttribute(this.tubeGeometry_o.attributes.position, i);
//           vertice = new THREE.Vector3().fromBufferAttribute(this.tubeGeometry.attributes.position, i);
//           const index = Math.floor(i / 30);
//           vertice.x += (vertice_o.x + this.splineMesh.geometry.attributes.position.getX(index) - vertice.x) / 15;
//           vertice.y += (vertice_o.y + this.splineMesh.geometry.attributes.position.getY(index) - vertice.y) / 15;
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
//     <canvas ref={canvasRef} />
//   );
// };

// export default TunnelEffect;

//-- TUNNEL EFFECT -- 2nd try --

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { gsap, Power1, Power2, RoughEase } from 'gsap';
// import { RoughEasePlugin } from 'gsap/RoughEasePlugin';

// // Register the RoughEase plugin
// gsap.registerPlugin(RoughEasePlugin);

// const TunnelEffect: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const ww = window.innerWidth;
//     const wh = window.innerHeight;

//     class Tunnel {
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
//         this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current! });
//         this.camera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 1000);
//         this.scene = new THREE.Scene();
//         this.init();
//         this.createMesh(texture);
//         this.handleEvents();
//         this.initAnimation();
//         window.requestAnimationFrame(this.render.bind(this));
//       }

//       init() {
//         this.mouse = {
//           position: new THREE.Vector2(ww * 0.5, wh * 0.5),
//           ratio: new THREE.Vector2(0, 0),
//           target: new THREE.Vector2(ww * 0.5, wh * 0.5),
//         };

//         this.renderer.setSize(ww, wh);
//         this.camera.rotation.y = Math.PI;
//         this.camera.position.z = 0.35;
//       }

//       createMesh(texture: THREE.Texture) {
//         const points: THREE.Vector3[] = [];

//         this.scene.remove(this.tubeMesh!);

//         for (let i = 0; i < 5; i += 1) {
//           points.push(new THREE.Vector3(0, 0, 3 * (i / 4)));
//         }
//         points[4].y = -0.06;

//         this.curve = new THREE.CatmullRomCurve3(points);

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

//         gsap.to(this.textureParams, {
//           duration: 12,
//           repeatX: 10,
//           ease: Power2.easeInOut,
//         });

//         gsap.to(this.textureParams, {
//           duration: 4,
//           repeatX: 0.3,
//           ease: Power1.easeInOut,
//         });

//         gsap.to(this.textureParams, {
//           duration: 12,
//           offsetX: 8,
//           ease: Power2.easeInOut,
//         });

//         gsap.to(this.cameraShake, {
//           duration: 2,
//           x: 0.01,
//           ease: RoughEase.ease.config({
//             template: Power1.easeNone,
//             strength: 0.5,
//             points: 100,
//             taper: "none",
//             randomize: true,
//             clamp: false,
//           }),
//         });

//         gsap.to(this.cameraShake, {
//           duration: 2,
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

//         this.camera.position.x = this.mouse.ratio.x * 0.044 - 0.025 + this.cameraShake.x;
//         this.camera.position.y = this.mouse.ratio.y * 0.044 - 0.025;
//       }

//       updateCurve() {
//         if (!this.tubeGeometry || !this.tubeGeometry_o || !this.splineMesh || !this.curve) return;

//         let vertice_o: THREE.Vector3;
//         let vertice: THREE.Vector3;
//         for (let i = 0; i < this.tubeGeometry.attributes.position.count; i += 1) {
//           vertice_o = new THREE.Vector3().fromBufferAttribute(this.tubeGeometry_o.attributes.position, i);
//           vertice = new THREE.Vector3().fromBufferAttribute(this.tubeGeometry.attributes.position, i);
//           const index = Math.floor(i / 30);
//           vertice.x += (vertice_o.x + this.splineMesh.geometry.attributes.position.getX(index) - vertice.x) / 15;
//           vertice.y += (vertice_o.y + this.splineMesh.geometry.attributes.position.getY(index) - vertice.y) / 15;
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
//     <canvas ref={canvasRef} />
//   );
// };

// export default TunnelEffect;

//-------------------------------------------------------------------------------
// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { gsap, Power1, Power2 } from 'gsap';
// import RoughEase from 'gsap/EasePack';

// // Register the RoughEase plugin
// gsap.registerPlugin(RoughEase);

// const TunnelEffect: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const ww = window.innerWidth;
//     const wh = window.innerHeight;

//     class Tunnel {
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
//         this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current! });
//         this.camera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 1000);
//         this.scene = new THREE.Scene();
//         this.init();
//         this.createMesh(texture);
//         this.handleEvents();
//         this.initAnimation();
//         window.requestAnimationFrame(this.render.bind(this));
//       }

//       init() {
//         this.mouse = {
//           position: new THREE.Vector2(ww * 0.5, wh * 0.5),
//           ratio: new THREE.Vector2(0, 0),
//           target: new THREE.Vector2(ww * 0.5, wh * 0.5),
//         };

//         this.renderer.setSize(ww, wh);
//         this.camera.rotation.y = Math.PI;
//         this.camera.position.z = 0.35;
//       }

//       createMesh(texture: THREE.Texture) {
//         const points: THREE.Vector3[] = [];

//         this.scene.remove(this.tubeMesh!);

//         for (let i = 0; i < 5; i += 1) {
//           points.push(new THREE.Vector3(0, 0, 3 * (i / 4)));
//         }
//         points[4].y = -0.06;

//         this.curve = new THREE.CatmullRomCurve3(points);

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

//         gsap.to(this.textureParams, {
//           duration: 12,
//           repeatX: 10,
//           ease: Power2.easeInOut,
//         });

//         gsap.to(this.textureParams, {
//           duration: 4,
//           repeatX: 0.3,
//           ease: Power1.easeInOut,
//         });

//         gsap.to(this.textureParams, {
//           duration: 12,
//           offsetX: 8,
//           ease: Power2.easeInOut,
//         });

//         gsap.to(this.cameraShake, {
//           duration: 2,
//           x: 0.01,
//           ease: RoughEase.config({
//             template: Power1.easeInOut,
//             strength: 0.5,
//             points: 100,
//             taper: "none",
//             randomize: true,
//             clamp: false,
//           }),
//         });

//         gsap.to(this.cameraShake, {
//           duration: 2,
//           x: 0,
//           ease: RoughEase.config({
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

//         this.camera.position.x = this.mouse.ratio.x * 0.044 - 0.025 + this.cameraShake.x;
//         this.camera.position.y = this.mouse.ratio.y * 0.044 - 0.025;
//       }

//       updateCurve() {
//         if (!this.tubeGeometry || !this.tubeGeometry_o || !this.splineMesh || !this.curve) return;

//         let vertice_o: THREE.Vector3;
//         let vertice: THREE.Vector3;
//         for (let i = 0; i < this.tubeGeometry.attributes.position.count; i += 1) {
//           vertice_o = new THREE.Vector3().fromBufferAttribute(this.tubeGeometry_o.attributes.position, i);
//           vertice = new THREE.Vector3().fromBufferAttribute(this.tubeGeometry.attributes.position, i);
//           const index = Math.floor(i / 30);
//           vertice.x += (vertice_o.x + this.splineMesh.geometry.attributes.position.getX(index) - vertice.x) / 15;
//           vertice.y += (vertice_o.y + this.splineMesh.geometry.attributes.position.getY(index) - vertice.y) / 15;
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
//     <canvas ref={canvasRef} />
//   );
// };

// export default TunnelEffect;

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap, Power1, Power2 } from 'gsap';
import { RoughEase } from 'gsap/EasePack'; // Correctly import RoughEase from EasePack

const TunnelEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ww = window.innerWidth;
    const wh = window.innerHeight;

    class Tunnel {
      private mouse: any;
      private renderer: THREE.WebGLRenderer;
      private camera: THREE.PerspectiveCamera;
      private scene: THREE.Scene;
      private tubeMesh?: THREE.Mesh;
      private tubeMaterial?: THREE.MeshBasicMaterial;
      private tubeGeometry?: THREE.TubeGeometry;
      private tubeGeometry_o?: THREE.TubeGeometry;
      private splineMesh?: THREE.Line;
      private curve?: THREE.CatmullRomCurve3;
      private textureParams: any;
      private cameraShake: any;

      constructor(texture: THREE.Texture) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current! });
        this.camera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 1000);
        this.scene = new THREE.Scene();
        this.init();
        this.createMesh(texture);
        this.handleEvents();
        this.initAnimation();
        window.requestAnimationFrame(this.render.bind(this));
      }

      init() {
        this.mouse = {
          position: new THREE.Vector2(ww * 0.5, wh * 0.5),
          ratio: new THREE.Vector2(0, 0),
          target: new THREE.Vector2(ww * 0.5, wh * 0.5),
        };

        this.renderer.setSize(ww, wh);
        this.camera.rotation.y = Math.PI;
        this.camera.position.z = 0.35;
      }

      createMesh(texture: THREE.Texture) {
        const points: THREE.Vector3[] = [];

        this.scene.remove(this.tubeMesh!);

        for (let i = 0; i < 5; i += 1) {
          points.push(new THREE.Vector3(0, 0, 3 * (i / 4)));
        }
        points[4].y = -0.06;

        this.curve = new THREE.CatmullRomCurve3(points);

        const splinePoints = this.curve.getPoints(70);
        const splineGeometry = new THREE.BufferGeometry().setFromPoints(splinePoints);
        this.splineMesh = new THREE.Line(splineGeometry, new THREE.LineBasicMaterial());

        this.tubeMaterial = new THREE.MeshBasicMaterial({
          side: THREE.BackSide,
          map: texture,
        });
        this.tubeMaterial.map!.wrapS = THREE.MirroredRepeatWrapping;
        this.tubeMaterial.map!.wrapT = THREE.MirroredRepeatWrapping;
        this.tubeMaterial.map!.repeat.set(10, 4);

        this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 30, false);
        this.tubeGeometry_o = this.tubeGeometry.clone();
        this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);

        this.scene.add(this.tubeMesh);
      }

      handleEvents() {
        window.addEventListener("resize", this.onResize.bind(this), false);
        document.body.addEventListener("mousemove", this.onMouseMove.bind(this), false);
      }

      onResize() {
        const ww = window.innerWidth;
        const wh = window.innerHeight;

        this.camera.aspect = ww / wh;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(ww, wh);
      }

      onMouseMove(e: MouseEvent) {
        this.mouse.target.x = e.clientX;
        this.mouse.target.y = e.clientY;
      }

      initAnimation() {
        this.textureParams = {
          offsetX: 0,
          offsetY: 0,
          repeatX: 10,
          repeatY: 4,
        };
        this.cameraShake = {
          x: 0,
          y: 0,
        };

        gsap.to(this.textureParams, {
          duration: 12,
          repeatX: 10,
          ease: Power2.easeInOut,
        });

        gsap.to(this.textureParams, {
          duration: 4,
          repeatX: 0.3,
          ease: Power1.easeInOut,
        });

        gsap.to(this.textureParams, {
          duration: 12,
          offsetX: 8,
          ease: Power2.easeInOut,
        });

        gsap.to(this.cameraShake, {
          duration: 2,
          x: 0.01,
          ease: RoughEase.config({
            template: Power1.easeInOut,
            strength: 0.5,
            points: 100,
            taper: "none",
            randomize: true,
            clamp: false,
          }),
        });

        gsap.to(this.cameraShake, {
          duration: 2,
          x: 0,
          ease: RoughEase.config({
            template: Power1.easeInOut,
            strength: 0.5,
            points: 100,
            taper: "none",
            randomize: true,
            clamp: false,
          }),
        });
      }

      updateMaterialOffset() {
        if (!this.tubeMaterial) return;

        this.tubeMaterial.map!.offset.x = this.textureParams.offsetX;
        this.tubeMaterial.map!.offset.y += 0.001;
        this.tubeMaterial.map!.repeat.set(this.textureParams.repeatX, this.textureParams.repeatY);
      }

      updateCameraPosition() {
        this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 50;
        this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 50;

        this.mouse.ratio.x = this.mouse.position.x / window.innerWidth;
        this.mouse.ratio.y = this.mouse.position.y / window.innerHeight;

        this.camera.position.x = this.mouse.ratio.x * 0.044 - 0.025 + this.cameraShake.x;
        this.camera.position.y = this.mouse.ratio.y * 0.044 - 0.025;
      }

      updateCurve() {
        if (!this.tubeGeometry || !this.tubeGeometry_o || !this.splineMesh || !this.curve) return;

        let vertice_o: THREE.Vector3;
        let vertice: THREE.Vector3;
        for (let i = 0; i < this.tubeGeometry.attributes.position.count; i += 1) {
          vertice_o = new THREE.Vector3().fromBufferAttribute(this.tubeGeometry_o.attributes.position, i);
          vertice = new THREE.Vector3().fromBufferAttribute(this.tubeGeometry.attributes.position, i);
          const index = Math.floor(i / 30);
          vertice.x += (vertice_o.x + this.splineMesh.geometry.attributes.position.getX(index) - vertice.x) / 15;
          vertice.y += (vertice_o.y + this.splineMesh.geometry.attributes.position.getY(index) - vertice.y) / 15;
        }
        this.tubeGeometry.attributes.position.needsUpdate = true;

        this.curve.points[2].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;
        this.curve.points[3].x = 0;
        this.curve.points[4].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;

        this.curve.points[2].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;
        this.curve.points[3].y = 0;
        this.curve.points[4].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;

        this.splineMesh.geometry.attributes.position.needsUpdate = true;
        const newPoints = this.curve.getPoints(70);
        this.splineMesh.geometry.setFromPoints(newPoints);
      }

      render() {
        this.updateMaterialOffset();
        this.updateCameraPosition();
        this.updateCurve();
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
      }
    }

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "Anonymous";
    loader.load(
      "img/galaxyTexture.jpg",
      (texture) => {
        document.body.classList.remove("loading");
        new Tunnel(texture);
      }
    );

  }, []);

  return <canvas ref={canvasRef} />;
};

export default TunnelEffect;
