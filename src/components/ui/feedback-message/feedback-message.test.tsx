import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FeedbackMessage } from "@/components/ui/feedback-message/feedback-message";

describe("FeedbackMessage", () => {
  it("uses the alert role for errors", () => {
    render(<FeedbackMessage variant="error" title="Algo deu errado" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Algo deu errado");
  });

  it("uses the status role when empty", () => {
    render(<FeedbackMessage variant="empty" title="Nada por aqui" />);
    expect(screen.getByRole("status")).toHaveTextContent("Nada por aqui");
  });

  it("calls the action when the button is clicked", async () => {
    const onAction = vi.fn();
    render(
      <FeedbackMessage
        variant="error"
        title="Algo deu errado"
        actionLabel="Tentar novamente"
        onAction={onAction}
      />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Tentar novamente" }),
    );

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("does not render the button without an action", () => {
    render(
      <FeedbackMessage
        variant="error"
        title="Algo deu errado"
        actionLabel="Tentar novamente"
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it.each([
    [
      "error",
      "Algo deu errado",
      "Falha ao carregar dados (500)",
      "Tentar novamente",
    ],
    ["empty", "Nenhum Pokémon encontrado", undefined, undefined],
  ] as const)(
    "matches the snapshot for %s",
    (variant, title, description, actionLabel) => {
      const { container } = render(
        <FeedbackMessage
          variant={variant}
          title={title}
          description={description}
          actionLabel={actionLabel}
          onAction={vi.fn()}
        />,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
