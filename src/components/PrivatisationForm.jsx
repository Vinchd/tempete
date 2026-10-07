"use client";

import { useActionState } from "react";
import { sendPrivatisationRequest } from "@/app/privatisation/actions";

const fieldClass =
  "w-full rounded-2xl border-3 border-secondary bg-transparent px-4 py-[clamp(8px,1.6dvh,12px)] text-base font-bold normal-case tracking-tighter placeholder:uppercase placeholder:text-secondary/40 focus:border-tertiary focus:outline-none duration-300 ease-in";

export default function PrivatisationForm() {
  const [state, formAction, isPending] = useActionState(
    sendPrivatisationRequest,
    { status: "idle" },
  );

  const isSuccess = state.status === "success";

  return (
    <div className="relative">
      {isSuccess && (
        <output className="absolute inset-0 flex justify-center items-center text-[clamp(18px,2.6dvh,22px)] leading-snug">
          Merci ! Votre message a bien été envoyé, nous revenons vers vous au
          plus vite.
        </output>
      )}

      <form
        action={formAction}
        className={`flex flex-col gap-[clamp(8px,1.4dvh,12px)] w-full ${isSuccess ? "invisible [&_*]:transition-none" : ""}`}
      >
        <label htmlFor="privatisation-email" className="sr-only">
          Votre email
        </label>
        <input
          id="privatisation-email"
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="Votre email"
          defaultValue={state.values?.email}
          className={fieldClass}
        />

        <label htmlFor="privatisation-message" className="sr-only">
          Votre message
        </label>
        <textarea
          id="privatisation-message"
          name="message"
          required
          maxLength={2000}
          placeholder="Votre message"
          defaultValue={state.values?.message}
          className={`${fieldClass} h-[clamp(3.5rem,12dvh,8rem)] resize-none`}
        />

        {/* Champ piège anti-spam, invisible pour les humains */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="top-0 -left-[9999px] absolute"
        />

        {state.status === "error" && (
          <p role="alert" className="text-tertiary text-sm normal-case">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="self-center hover:bg-tertiary disabled:opacity-50 mt-1 px-6 py-[clamp(6px,1.4dvh,12px)] border-3 hover:border-tertiary rounded-2xl text-[20px] hover:text-primary uppercase duration-300 ease-in cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending ? "Envoi…" : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
