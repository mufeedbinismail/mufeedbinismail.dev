import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import type { CaseStudy } from '../lib/cases';
import { glueNumberRanges, numbered } from '../lib/format';
import CaseStudyBody from './CaseStudyBody';
import './case-studies.css';

interface Props {
  studies: CaseStudy[];
  /** Tab title suffix while a study is open, matching its standalone page. */
  siteName: string;
}

const pathOf = (study: CaseStudy) => `/work/${study.slug}`;

const isPlainClick = (e: MouseEvent) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

/**
 * The case study list, and the drawer that reads them in place. Each row is a
 * real link to the study's own page, so without JS (or on a modified click)
 * the page opens instead. The drawer keeps the address bar on that same URL,
 * so a copied link always lands on the study being read.
 */
export default function CaseStudies({ studies, siteName }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const homeTitle = useRef('');
  const count = studies.length;

  const show = (index: number, e: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(e)) return;
    e.preventDefault();
    opener.current = e.currentTarget;
    history.pushState({ caseStudy: studies[index].slug }, '', pathOf(studies[index]));
    setOpen(index);
  };

  const step = useCallback(
    (by: number) => setOpen((current) => (current == null ? current : (current + by + count) % count)),
    [count],
  );

  // Every open pushed one history entry; closing pops it, and popstate does the rest.
  const close = useCallback(() => {
    if (history.state?.caseStudy) history.back();
    else setOpen(null);
  }, []);

  useEffect(() => {
    const onPop = () => {
      const index = studies.findIndex((s) => s.slug === history.state?.caseStudy);
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
        document.title = homeTitle.current;
        opener.current?.focus();
      }
      return;
    }
    if (!el.open) {
      homeTitle.current = document.title;
      el.showModal();
    }
    // Prev/next swap the URL in place rather than stacking history entries.
    const slug = studies[open].slug;
    if (history.state?.caseStudy && history.state.caseStudy !== slug) {
      history.replaceState({ caseStudy: slug }, '', pathOf(studies[open]));
    }
    document.title = `${studies[open].title} · ${siteName}`;
    panel.current?.scrollTo({ top: 0 });
  }, [open, studies, siteName]);

  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  const study = open == null ? null : studies[open];

  return (
    <>
      <ol className="case-list">
        {studies.map((s, i) => (
          <li key={s.slug}>
            <a className="case-row" href={pathOf(s)} onClick={(e) => show(i, e)}>
              <span className="case-n">{numbered(i)}</span>
              <span className="case-main">
                <span className="display case-title">{glueNumberRanges(s.title)}</span>
                <span className="case-summary muted">{s.summary}</span>
              </span>
              <span className="case-metric">
                <span className="display">{s.metric}</span>
                <span className="hint">{s.metricLabel}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <dialog
        ref={dialog}
        className="drawer"
        aria-label={study ? study.title : 'Case study'}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        {study && open != null && (
          <div className="drawer-panel" ref={panel}>
            <div className="drawer-bar">
              <span className="hint">
                Case study {numbered(open)} / {numbered(count - 1)}
              </span>
              <div className="drawer-actions">
                <button type="button" className="pill-button" onClick={() => step(-1)}>
                  ← Prev
                </button>
                <button type="button" className="pill-button" onClick={() => step(1)}>
                  Next →
                </button>
                <button type="button" className="pill-button solid" onClick={close}>
                  Close
                </button>
              </div>
            </div>
            <div className="drawer-body">
              <CaseStudyBody study={study} titleAs="h2" />
              <button type="button" className="cs-next" onClick={() => step(1)}>
                <span className="hint">Next case study →</span>
                <span className="display">{glueNumberRanges(studies[(open + 1) % count].title)}</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
