uniform float uTime;
uniform float uRadius;

varying float vDistance;
varying float vRadius;

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

// void main() {
//   // Кручение из центра сферы (быстрее)
//   // float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
//   // vec3 particlePosition = position * rotation3dY(uTime * 0.3 * distanceFactor);

//   // Кручение из центра сферы (медленнее)
//   float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 2.0);
//   vec3 particlePosition = position * rotation3dY(uTime * 0.2 * distanceFactor);

//   vDistance = distanceFactor;

//   vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;

//   gl_Position = projectedPosition;
//   gl_PointSize = 3.0;
// }

void main() {
  float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
  float size = distanceFactor * 1.5 + 3.0;
  // vec3 particlePosition = position * rotation3dY(uTime * 0.3 * distanceFactor);
  vec3 particlePosition = position;

  vDistance = distanceFactor;

  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = size;
  // Size attenuation;
  gl_PointSize *= (3.0 / - viewPosition.z);
}