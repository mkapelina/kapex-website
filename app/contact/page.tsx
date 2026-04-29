"use client";

import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xvzlppww";

const SUBJECTS = [
  "General Inquiry",
  "Investment Opportunity",
  "Partnership",
  "Other",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Page header */}
      <div className="bg-[#0a1628] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c09040] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Contact
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-light tracking-tight">
            Get In Touch
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 section-pad">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left col — framing */}
          <div>
            <p className="text-[#6b655c] text-lg leading-relaxed">
              Whether you are an entrepreneur seeking a capital partner, a firm
              exploring co-investment, or simply looking to connect — we would
              like to hear from you.
            </p>
            <div className="mt-10 border-t border-[#e2ddd5] pt-8">
              <p className="text-[#a39d93] text-xs tracking-[0.2em] uppercase mb-2 font-medium">
                Email
              </p>
              <a
                href="mailto:mk@kapexllc.com"
                className="text-[#0a1628] text-base hover:text-[#c09040] transition-colors duration-200"
              >
                mk@kapexllc.com
              </a>
            </div>
          </div>

          {/* Right col — form */}
          <div>
            {status === "success" ? (
              <div className="border border-[#c09040] p-8">
                <p className="text-[#0a1628] font-semibold mb-2">Message sent.</p>
                <p className="text-[#6b655c] text-sm leading-relaxed">
                  Thank you for reaching out. We will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Full Name" name="name" type="text" required />
                  <Field label="Email Address" name="email" type="email" required />
                </div>
                <Field label="Organization / Company" name="organization" type="text" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#0a1628] text-xs font-semibold tracking-[0.15em] uppercase">
                    Subject
                  </label>
                  <select
                    name="subject"
                    className="w-full border border-[#e2ddd5] bg-white text-[#0a1628] px-4 py-3 text-sm focus:outline-none focus:border-[#c09040] transition-colors appearance-none"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#0a1628] text-xs font-semibold tracking-[0.15em] uppercase">
                    Message <span className="text-[#c09040]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full border border-[#e2ddd5] bg-white text-[#0a1628] px-4 py-3 text-sm focus:outline-none focus:border-[#c09040] transition-colors resize-none"
                    placeholder="Tell us about yourself and what you have in mind."
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-[#0a1628] text-white text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#163059] disabled:opacity-50 transition-colors duration-200"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#0a1628] text-xs font-semibold tracking-[0.15em] uppercase">
        {label} {required && <span className="text-[#c09040]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border border-[#e2ddd5] bg-white text-[#0a1628] px-4 py-3 text-sm focus:outline-none focus:border-[#c09040] transition-colors"
      />
    </div>
  );
}
