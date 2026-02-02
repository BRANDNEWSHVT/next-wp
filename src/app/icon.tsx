import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111111",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: 2,
          width: 8,
          height: 3,
          backgroundColor: "#CC0000",
        }}
      />
      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#F9F9F7",
          fontFamily: "Georgia, serif",
        }}
      >
        N
      </span>
    </div>,
    {
      ...size,
    },
  );
}
