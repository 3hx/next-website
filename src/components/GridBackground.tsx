export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <div
        className="absolute inset-0 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: "radial-gradient(at 50% 0%, white, transparent 70%)",
        }}
      />
    </div>
  );
}
