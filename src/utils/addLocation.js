import * as THREE from 'three';

// Массив для хранения лейблов (html-элемент)
const labels = [];

// Массив для хранения типонов (сама координата)
const points = [];

// Счетчик точек на глобусе + флаг готовности сцены
let countPoints = 1;

export default function addLocation(earth, latitude, longitude, radiusEarth, cityName) {
    // coordSpherical - Объект с преобразованными градусами (широта и долгота) в радианы
    // degToRad - Преобразует градусы в радианы.
    // Выражение (90 - latitude) используется для корректировки координаты широты: в географической системе, 0° широты — это экватор, а в сферической системе (используемой в этом коде), полюс находится в направлении оси Y. Таким образом, координата широты lat указывается как угол отклонения от оси Y (полярный угол).
    let coordSpherical = {
        lat: THREE.MathUtils.degToRad(90 - latitude),
        lon: THREE.MathUtils.degToRad(longitude)
    };
    // console.log(coordSpherical);

    // setFromSphericalCoords: Устанавливаем вектор из сферических координат радиуса, phi и theta.
    // phi - полярный угол в радианах от оси y (вверх). По умолчанию 0. 
    // theta - экваторный угол в радианах вокруг оси y (вверх). По умолчанию 0.
    let positionVector = new THREE.Vector3().setFromSphericalCoords(
        radiusEarth,        // радиус сферы (например, радиус Земли)
        coordSpherical.lat, // полярный угол (широта в радианах)
        coordSpherical.lon  // экваторный угол (долгота в радианах)
    );

    // Проверка, правильно ли пересчитаны координаты
    // let spherical = new THREE.Spherical().setFromVector3(positionVector);
    // console.log(`Широта: ${latitude}`);
    // console.log(`Долгота: ${longitude}`);
    // console.log(`Пересчитанная координата: ${spherical}`);

    // Начальная и конечная точки линии по полученным координатам
    // Линия идет из центра глобуса
    const start = new THREE.Vector3(0, 0, 0); // Начало линии
    const end = positionVector.clone();       // Конец линии

    // Вычисляем направление линии
    const direction = end.clone().sub(start).normalize();

    // Увеличиваем длину линии на, например, 10 единиц
    const lengthIncrease = 0.5;
    const newEnd = end.clone().add(direction.multiplyScalar(lengthIncrease));

    // Создаём новую геометрию с удлинённой линией
    let lineGeom = new THREE.BufferGeometry().setFromPoints([start, newEnd]);

    // Создаём линию с материалом
    let line = new THREE.Line(
        lineGeom,
        new THREE.LineBasicMaterial({ color: "yellow" })
    );

    // Добавляем линию к сцене
    earth.add(line);
    
    // Создаем HTML-элемент для точки в координате города
    const label = document.createElement('div');
    label.classList.add('point', `point_${countPoints}`);

    // Создаем элемент круга на координате
    const labelCircle = document.createElement('div');
    labelCircle.classList.add('label');
    label.appendChild(labelCircle);

    // Создаем элемент с анимацией пульсации
    const pulseCircle = document.createElement('div');
    pulseCircle.classList.add('pulseTipon');
    label.appendChild(pulseCircle);

    // Создаем элемент с текстом-описанием точки на координате
    const textInfo = document.createElement('div');
    textInfo.classList.add('text');

    const cityTitle = document.createElement('div');
    cityTitle.classList.add('city_name');
    cityTitle.textContent = cityName;
    textInfo.appendChild(cityTitle);

    const latitudeInfo = document.createElement('div');
    latitudeInfo.classList.add('city_latitude');
    latitudeInfo.textContent = latitude;
    textInfo.appendChild(latitudeInfo);

    const longitudeInfo = document.createElement('div');
    longitudeInfo.classList.add('city_longitude');
    longitudeInfo.textContent = longitude;
    textInfo.appendChild(longitudeInfo);

    label.appendChild(textInfo);

    // Добавляем элемент на страницу
    document.body.appendChild(label);

    // Добавляем новому элементу точки обработчик клика
    label.addEventListener('click', () => {
        label.classList.toggle('show');

        // Проверка наличия класса 'show' у остальных точек
        labels.forEach((otherLabel) => {
            if (otherLabel.label !== label) {
                otherLabel.label.classList.remove('show');
            }
        });
    });

    // Сохраняем лейбл и позицию в массив labels
    labels.push({ label, position: newEnd });

    // Добавляем уникальные координаты каждой созданной точки в массиве
    points.push({
        position: new THREE.Vector3(positionVector.x, positionVector.y, positionVector.z), 
        element: document.querySelector(`.point_${countPoints}`)
    })

    countPoints++;
    console.log(points);
}