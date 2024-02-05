import * as THREE from "three";
const vertexShader = `attribute float scale;
void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = scale * ( 20.0 / - mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
}`;

const fragmentShader = `uniform vec3 color;
uniform float opacity;
void main() {
    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
    gl_FragColor = vec4( color, opacity );
 
}`;
export const addStars = (scene) => {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 4 - 2;
        const y = Math.random() * 4 - 2;
        const z = Math.random() * 4 - 2;
        vertices.push(x, y, z);
        scales[i] = 1;
    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute(
        "scale",
        new THREE.BufferAttribute(scales, 1).setUsage(THREE.DynamicDrawUsage)
    );

    const particles = [];

    for (let i = 0; i < 10; i++) {
        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0x22449a) },
                opacity: { value: 1 },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
        });

        const particle = new THREE.Points(geometry, material);
        particle.rotation.x = Math.random() * 6;
        particle.rotation.y = Math.random() * 6;
        particle.rotation.z = Math.random() * 6;
        scene.add(particle);
        particles.push(particle);
    }

    const animation = () => {
        const time = Date.now() * 0.000003;

        particles.forEach((particle, i) => {
            if (particle instanceof THREE.Points) {
                particle.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
                // console.log(Math.sin(i + time * 10) * 0.5 + 0.5);
                particle.material.uniforms.opacity.value =
                    Math.sin(i + time * 50) * 0.5 + 0.5;

                const scales = particle.geometry.attributes.scale.array;
                particle.geometry.attributes.scale.needsUpdate = true;

                for (let j = 0; j < scales.length; j++) {
                    scales[j] = Math.sin(1 * j + time);
                }
            }
        });

        requestAnimationFrame(animation);
    };
    animation();
};
