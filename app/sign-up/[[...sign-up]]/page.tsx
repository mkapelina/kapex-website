import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#070d1a" }}
    >
      <div className="mb-8 text-center">
        <span className="text-white font-semibold text-xl tracking-[0.12em] uppercase">
          Kape<span style={{ color: "#c09040" }}>X</span>
        </span>
        <p className="text-white/40 text-sm mt-2 tracking-widest uppercase">
          Member Portal
        </p>
      </div>
      <SignUp />
    </div>
  );
}
