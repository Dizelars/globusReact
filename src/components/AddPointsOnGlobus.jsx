import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useState } from 'react';

export default function AddPointsOnGlobus({ towns, refSphere}) {
    if (!towns || !Array.isArray(towns)) return null;

    const createLine = (id, lat, lng) => {
        // console.log(id)
        const coordSpherical = {
            lat: THREE.MathUtils.degToRad(90 - lat),
            lon: THREE.MathUtils.degToRad(lng),
        };

        const positionVector = new THREE.Vector3().setFromSphericalCoords(
            2, // Радиус сферы
            coordSpherical.lat,
            coordSpherical.lon
        );

        const start = new THREE.Vector3(0, 0, 0); // Центр глобуса
        const end = positionVector.clone();

        // const direction = end.clone().sub(start).normalize();
        // const newEnd = end.clone().add(direction.multiplyScalar(0.5)); // Удлинение линии

        // const lineGeom = new THREE.BufferGeometry().setFromPoints([start, newEnd]);
        const lineGeom = new THREE.BufferGeometry().setFromPoints([start, end]);

        const [showDetails, setShowDetails] = useState(false);

        return (
            <line geometry={lineGeom} userData={{ id }} key={`${lat}-${lng}`}>
                <lineBasicMaterial color="yellow" />
                <Html
                    position={end.toArray()} // Передаем координаты конца линии
                    wrapperClass="point"
                    center
                    distanceFactor={7}
                    occlude={[refSphere]}
                >
                    <div
                        className='pulseTipon'
                    />
                    <div
                        className="label"
                        onMouseEnter={() => setShowDetails(true)} // Наведение
                        onMouseLeave={() => setShowDetails(false)} // Отведение
                        onClick={() => console.log(`Clicked on point ID: ${id}`)} // Клик
                    >
                        {showDetails ? (
                            <>
                                <div
                                    className='text'
                                >
                                    <p className='city_name'>{id}</p>
                                    <p className='city_latitude'>{lat}</p>
                                    <p className='city_longitude'>{lng}</p>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </Html>
            </line>
        );
    };

    // Используем Set для проверки уникальности координат
    const uniqueCoords = new Set();
    const filteredTowns = towns.filter((town) => {
        const coordKey = `${town.lat}-${town.lng}`;
        if (uniqueCoords.has(coordKey)) {
            return false; // Повторяющиеся координаты игнорируем
        }
        uniqueCoords.add(coordKey);
        return true; // Уникальные координаты добавляем
    });

    return (
        <group>
            {filteredTowns.map((town) => createLine(town.id, town.lat, town.lng))}
        </group>
    );
}