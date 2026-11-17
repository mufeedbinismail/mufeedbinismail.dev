import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import type { CaseStudy } from '../lib/cases';
import { glueNumberRanges, numbered } from '../lib/format';
import WriteUp from './WriteUp';
import './write-up-drawer.css';

interface Props {
  /** Every write-up, in reading order; prev / next and the arrow keys follow this order. */
  studies: CaseStudy[];
  /** Tab title suffix while a write-up is open. */
  siteName: string;
  /** Tab title once the drawer is closed. */
  homeTitle: string;
  /** Slug of the write-up to show open on arrival, when the page is that write-up's own URL. */
  initial?: string;
}

const pathOf = (study: CaseStudy) => `/work/${study.slug}`;

const isPlainClick = (e: MouseEvent | ReactMouseEvent) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

/**
 * Reads write-ups in a drawer over the home page.
 *
 * - A plain click on any link to `/work/<slug>` opens it here instead of
 *   navigating; the address bar follows the open write-up and Back closes it.
 * - Arriving at `/work/<slug>` shows the home page with that write-up already
 *   open; closing it returns the address bar to `/`.
 * - The bar's Prev / Next / Close are real links, so without JavaScript they
 *   still move between write-ups and back to the home page.
 */
export default function WriteUpDrawer({ studies, siteName, homeTitle, initial }: Props) {
  const initialIndex = initial ? studies.findIndex((s) => s.slug === initial) : -1;
  const [open, setOpen] = useState<number | null>(initialIndex === -1 ? null : initialIndex);
  // Rendered open in the HTML on arrival, so it is readable before (or without) JavaScript.
  const [openInHtml] = useState(initialIndex !== -1);
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const count = studies.length;

  // Arrived at a write-up's own URL: mark the history entry so closing can return to "/".
  useEffect(() => {
    if (initialIndex === -1) return;
    history.replaceState({ writeUp: studies[initialIndex].slug, landed: true }, '', pathOf(studies[initialIndex]));
  }, [initialIndex, studies]);

  // Open from any write-up link on the page behind the drawer.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || !isPlainClick(e)) return;
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || link.closest('dialog')) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      const index = studies.findIndex((s) => url.pathname === pathOf(s));
      if (index === -1) return;
      e.preventDefault();
      opener.current = link;
      history.pushState({ writeUp: studies[index].slug }, '', pathOf(studies[index]));
      setOpen(index);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [studies]);

  const step = useCallback(
    (by: number) => setOpen((current) => (current == null ? current : (current + by + count) % count)),
    [count],
  );

  const close = useCallback(() => {
    if (history.state?.landed) {
      history.replaceState(null, '', '/');
      setOpen(null);
    } else if (history.state?.writeUp) {
      // Opening pushed one history entry; going back pops it and popstate closes the drawer.
      history.back();
    } else {
      setOpen(null);
    }
  }, []);

  useEffect(() => {
    const onPop = () => {
      const index = studies.findIndex((s) => s.slug === history.state?.writeUp);
      setOpen(index === -1 ? null : index);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [studies]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open == null) {
      if (el.open) {
        el.close();
        document.title = homeTitle;
        opener.current?.focus();
      }
      return;
    }
    // Opened in the HTML as a plain (non-modal) dialog: reopen it as a modal.
    if (!el.matches(':modal')) {
      if (el.open) el.close();
      el.showModal();
    }
    // Prev / next swap the URL in place rather than stacking history entries.
    const slug = studies[open].slug;
    if (history.state?.writeUp && history.state.writeUp !== slug) {
      history.replaceState({ ...history.state, writeUp: slug }, '', pathOf(studies[open]));
    }
    document.title = `${studies[open].title} · ${siteName}`;
    panel.current?.scrollTo({ top: 0 });
  }, [open, studies, siteName, homeTitle]);

  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  /** A link that works without JavaScript and runs `action` instead on a plain click. */
  const enhanced = (action: () => void) => (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(e)) return;
    e.preventDefault();
    action();
  };

  const study = open == null ? null : studies[open];
  const prev = open == null ? null : studies[(open - 1 + count) % count];
  const next = open == null ? null : studies[(open + 1) % count];

  return (
    <dialog
      ref={dialog}
      className="drawer"
      open={openInHtml || undefined}
      aria-label={study ? study.title : 'Write-up'}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      {study && prev && next && open != null && (
        <div className="drawer-panel" ref={panel}>
          <div className="drawer-bar">
            <span className="hint">
              Write-up {numbered(open)} / {numbered(count - 1)}
            </span>
            <nav className="drawer-actions" aria-label="Write-ups">
              <a className="pill-button" href={pathOf(prev)} onClick={enhanced(() => step(-1))}>
                ← Prev
              </a>
              <a className="pill-button" href={pathOf(next)} onClick={enhanced(() => step(1))}>
                Next →
              </a>
              <a className="pill-button solid" href="/" onClick={enhanced(close)}>
                Close
              </a>
            </nav>
          </div>
          <div className="drawer-body">
            <WriteUp study={study} titleAs="h2" />
            <a className="wu-next" href={pathOf(next)} onClick={enhanced(() => step(1))}>
              <span className="hint">Next write-up →</span>
              <span className="wu-next-title">{glueNumberRanges(next.title)}</span>
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
