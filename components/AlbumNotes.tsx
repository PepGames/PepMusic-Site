"use client";

import { useRef, type ReactNode } from "react";

type Props = { title: string; href: string; status: string; children: ReactNode };

export function AlbumNotes({ title, href, status, children }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <a className="album" href={href} aria-haspopup="dialog" onClick={event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
        event.preventDefault();
        dialog.current.showModal();
      }}>
        <span className="album-status">{status}</span>
        <span className="album-title">{title} <span aria-hidden="true">↗</span></span>
      </a>
      <dialog ref={dialog} aria-labelledby="album-name">
        <div className="sheet">
          <form className="close-form" method="dialog"><button autoFocus>Close <span aria-hidden="true">×</span></button></form>
          {children}
        </div>
      </dialog>
    </>
  );
}
