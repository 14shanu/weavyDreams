"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl w-full bg-[var(--color-bg-alt)] border border-gray-200 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-dark)] mb-1">
            Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full border border-gray-300 text-xs sm:text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-dark)] mb-1">
            Company
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            className="w-full border border-gray-300 text-xs sm:text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-dark)] mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full border border-gray-300 text-xs sm:text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-dark)] mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full border border-gray-300 text-xs sm:text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[var(--color-text-dark)] mb-1">
          Tell us about your project *
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          className="w-full border border-gray-300 text-xs sm:text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center px-5 sm:px-6 py-2 rounded-full bg-[var(--color-primary)] text-[var(--color-text-dark)] text-xs sm:text-sm font-medium hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Enquiry"}
      </button>

      {status === "success" && (
        <p className="text-xs text-green-600 mt-1">
          Message sent successfully.
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-600 mt-1">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
