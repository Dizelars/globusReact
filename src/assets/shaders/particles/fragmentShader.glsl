// varying float vDistance;
// varying float vRadius;

// void main() {
//   gl_FragColor = vec4(0.34, 0.53, 0.96, 1.0);
// }

// void main() {
//   vec3 color = vec3(0.682, 0.949, 0.121);
//   float strength = distance(gl_PointCoord, vec2(0.5));
//   strength = 1.0 - strength;
//   strength = pow(strength, 3.0);

//   color = mix(color, vec3(0.267, 0.137, 0.941), vDistance * 0.9);
//   // color = mix(color, vec3(0.267, 0.137, 0.941), vRadius * 0.9);
//   color = mix(vec3(0.0), color, strength);
//   gl_FragColor = vec4(color, strength);
// }

varying float vDistance;
varying float vRadius;

void main() {
  vec3 color = vec3(0.682, 0.949, 0.121);

  // Определяем расстояние от текущей позиции к окружности
  float distToEdge = abs(vRadius - length(gl_PointCoord - vec2(0.5, 0.5)));
  
  // Уменьшаем эффект окрашивания, если точка слишком далеко от окружности
  float strength = smoothstep(0.0, 0.1, distToEdge); // Можете регулировать этот порог для точности

  // Окрашиваем по радиусу
  color = mix(color, vec3(0.267, 0.137, 0.941), vDistance * 0.9);

  // Применяем эффект окрашивания по окружности
  color = mix(vec3(0.0), color, strength);
  
  gl_FragColor = vec4(color, strength);
}
