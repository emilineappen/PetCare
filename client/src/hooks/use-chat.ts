import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useChat() {
  return useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch(api.chat.send.path, {
        method: api.chat.send.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation error");
        }
        throw new Error("Failed to send message");
      }

      return api.chat.send.responses[200].parse(await res.json());
    },
  });
}
