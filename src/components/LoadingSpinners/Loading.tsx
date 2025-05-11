import { RotateLoader, ScaleLoader } from "react-spinners"

export function RotateLoadingSpinner() {
  return (
    <RotateLoader
      color="#dedede"
      speedMultiplier={0.65}
    />
  )
}

export function ScaleLoadingSpinner() {
  <ScaleLoader
    barCount={7}
    color="#DEDEDE"
    speedMultiplier={1.25}
  />
}