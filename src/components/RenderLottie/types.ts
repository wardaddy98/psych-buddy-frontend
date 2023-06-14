export interface IRenderLottie {
  lottieJson: unknown;
  height?: number;
  width?: number;
  className?: string;
  options?: Record<string, unknown>;
}
