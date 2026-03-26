export const typeMessageReact = (setMessages, reply, onComplete) => {
  let i = 0;

  const interval = setInterval(() => {
    i++;

    setMessages((prev) => {
      const updated = [...prev];

      if (updated.length === 0) return prev;

      updated[updated.length - 1] = {
        text: reply.substring(0, i) + "|",
        sender: "bot",
      };

      return updated;
    });

    if (i >= reply.length) {
      clearInterval(interval);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          text: reply,
          sender: "bot",
        };

        return updated;
      });

      // CALL AFTER FINISH
      if (onComplete) onComplete();
    }
  }, 20);
};