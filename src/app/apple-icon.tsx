import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
          top: 12,
          left: 12,
          width: 40,
          height: 10,
          backgroundColor: "#CC0000",
        }}
      />
      <span
        style={{
          fontSize: 120,
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
