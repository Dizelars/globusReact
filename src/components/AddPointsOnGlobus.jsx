import * as THREE from 'three';

export default function AddPointsOnGlobus({ towns }) {
    // Проверяем, что массив городов не пустой
    if (!towns || !Array.isArray(towns)) return null;

    // Функция для преобразования координат в линию
    const createLine = (id, lat, lng) => {
        const coordSpherical = {
            lat: THREE.MathUtils.degToRad(90 - lat), // Широта в радианах
            lon: THREE.MathUtils.degToRad(lng),     // Долгота в радианах
        };

        const positionVector = new THREE.Vector3().setFromSphericalCoords(
            2, // Радиус сферы
            coordSpherical.lat,
            coordSpherical.lon
        );

        const start = new THREE.Vector3(0, 0, 0); // Центр глобуса
        const end = positionVector.clone();      // Конечная точка линии

        const direction = end.clone().sub(start).normalize();
        const newEnd = end.clone().add(direction.multiplyScalar(0.5)); // Удлинение линии

        const lineGeom = new THREE.BufferGeometry().setFromPoints([start, newEnd]);

        return (
            <line geometry={lineGeom} userData={{ id }} key={`${lat}-${lng}`}>
                <lineBasicMaterial color="yellow" />
            </line>
        );
    };

    return (
        <group>
            {towns.map((town, index) => createLine(town.id, town.lat, town.lng))}
        </group>
    );
}