import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/button/button";
import { Modal } from "@/components/ui/modal/modal";

function renderModal(props: Partial<Parameters<typeof Modal>[0]> = {}) {
  const onClose = vi.fn();
  render(
    <Modal open title="Título" onClose={onClose} {...props}>
      <Button>Ação principal</Button>
    </Modal>,
  );
  return { onClose };
}

function normalizeIds(html: string) {
  return html.replace(/(id|aria-labelledby)="[^"]*"/g, '$1="generated-id"');
}

describe("Modal", () => {
  it("does not render when closed", () => {
    renderModal({ open: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("is labelled by its title and receives focus", () => {
    renderModal();
    const dialog = screen.getByRole("dialog", { name: "Título" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveFocus();
  });

  it("closes with Escape", async () => {
    const { onClose } = renderModal();
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes with the close button", async () => {
    const { onClose } = renderModal();
    await userEvent.click(screen.getByRole("button", { name: "Fechar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when the backdrop is pressed but not when the content is", () => {
    const { onClose } = renderModal();
    const dialog = screen.getByRole("dialog");

    fireEvent.mouseDown(dialog);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.mouseDown(dialog.parentElement as HTMLElement);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("keeps the focus inside the dialog", async () => {
    renderModal();
    const closeButton = screen.getByRole("button", { name: "Fechar" });
    const actionButton = screen.getByRole("button", { name: "Ação principal" });

    await userEvent.tab();
    expect(closeButton).toHaveFocus();
    await userEvent.tab();
    expect(actionButton).toHaveFocus();
    await userEvent.tab();
    expect(closeButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(actionButton).toHaveFocus();
  });

  it("restores the focus to the trigger on close", () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();

    const { unmount } = render(
      <Modal open title="Título" onClose={vi.fn()}>
        <p>Conteúdo</p>
      </Modal>,
    );
    unmount();

    expect(trigger).toHaveFocus();
    trigger.remove();
  });

  it("matches the snapshot", () => {
    const { container } = render(
      <Modal open title="Título" onClose={vi.fn()}>
        <p>Conteúdo</p>
      </Modal>,
    );
    expect(normalizeIds(container.innerHTML)).toMatchSnapshot();
  });
});
