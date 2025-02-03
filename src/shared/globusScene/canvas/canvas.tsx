import React from "react";
import { Canvas as ThreeFiberCanvas, CanvasProps } from "@react-three/fiber";

export default function Canvas({ children, ...props }: CanvasProps) {
  return <ThreeFiberCanvas {...props}>{children}</ThreeFiberCanvas>;
}
