import { useEffect, useRef, useState } from 'react';
import type { PublishedCv } from '../lib/cvs';
import { deobfuscate, type Obfuscated } from '../lib/obfuscate';
import './contact-dialog.css';

interface Props {
  email: Obfuscated;
  phone: Obfuscated;
  location: string;
  linkedin: string;
  github: string;
  cvs: PublishedCv[];
}

/** Any element with this attribute, anywhere on the page, opens the dialog. */
const OPENER = '[data-open-contact]';

const shortUrl = (url: string) => url.replace(/^https:\/\/(www\.)?/, '');

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked; the value is on screen to select by hand.
    }
  };
  return (
    <button type="button" className="copy" onClick={copy}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

interface HiddenDetailProps {
  value: Obfuscated;
  /** Shown on the button: "Show email", "Show phone". */
  noun: string;
  /** The link for the decoded value: `mailto:…`, `tel:…`. */
  hrefOf: (value: string) => string;
}

/** One contact detail, decoded only by its own click. */
function HiddenDetail({ value, noun, hrefOf }: HiddenDetailProps) {
  const [shown, setShown] = useState<string | null>(null);

  if (shown == null) {
    return (
      <button type="button" className="show" onClick={() => setShown(deobfuscate(value))}>
        Show {noun}
      </button>
    );
  }
  return (
    <>
      <a href={hrefOf(shown)}>{shown}</a>
      <CopyButton value={shown} />
    </>
  );
}

/**
 * The header's Contact button and the dialog it opens. Email and phone stay
 * encoded in the page and each is decoded only by its own click inside the
 * dialog, so crawlers that run JS but never click see neither. Closing the
 * dialog hides them again.
 */
export default function ContactDialog({ email, phone, location, linkedin, github, cvs }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  // Keying the details on this remounts them hidden. Bumped on open as well as
  // close: browsers may delay `close` for a background tab, and every visit
  // must start hidden regardless.
  const [visit, setVisit] = useState(0);
  const concealDetails = () => setVisit((n) => n + 1);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || !e.target.closest(OPENER)) return;
      e.preventDefault();
      concealDetails();
      dialog.current?.showModal();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <button type="button" className="pill-button contact-button" data-open-contact>
        Contact
      </button>

      <dialog
        ref={dialog}
        className="contact-dialog"
        aria-labelledby="contact-title"
        onClose={concealDetails}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="contact-panel">
          <div className="contact-head">
            <h2 id="contact-title" className="display">
              Contact
            </h2>
            <button type="button" className="pill-button solid" onClick={() => dialog.current?.close()}>
              Close
            </button>
          </div>

          <dl className="contact-list" key={visit}>
              <div>
                <dt className="label">Email</dt>
                <dd>
                  <HiddenDetail value={email} noun="email" hrefOf={(v) => `mailto:${v}`} />
                </dd>
              </div>
              <div>
                <dt className="label">Phone</dt>
                <dd>
                  <HiddenDetail value={phone} noun="phone" hrefOf={(v) => `tel:${v.replace(/[^\d+]/g, '')}`} />
                </dd>
              </div>
              <div>
                <dt className="label">Location</dt>
                <dd>{location}</dd>
              </div>
              <div>
                <dt className="label">LinkedIn</dt>
                <dd>
                  <a href={linkedin}>{shortUrl(linkedin)} ↗</a>
                </dd>
              </div>
              <div>
                <dt className="label">GitHub</dt>
                <dd>
                  <a href={github}>{shortUrl(github)} ↗</a>
                </dd>
              </div>
              {cvs.length > 0 && (
                <div>
                  <dt className="label">CV</dt>
                  <dd>
                    {cvs.map((cv) => (
                      <a key={cv.href} href={cv.href} download>
                        {cv.label}
                      </a>
                    ))}
                  </dd>
                </div>
              )}
          </dl>
        </div>
      </dialog>
    </>
  );
}
