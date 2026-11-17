import type { CaseStudy } from '../lib/cases';
import { glueNumberRanges } from '../lib/format';
import './write-up.css';

interface Props {
  study: CaseStudy;
  /** `h1` on a write-up's own page, `h2` inside the drawer on the home page. */
  titleAs: 'h1' | 'h2';
}

/** The full write-up of one piece of work, as plain prose; identical in the drawer and on its own page. */
export default function WriteUp({ study, titleAs: Title }: Props) {
  return (
    <article className="wu">
      <header className="wu-intro">
        <span className="hint">
          {study.year} · {study.area} · {study.role}
        </span>
        <Title className="display wu-title">{glueNumberRanges(study.title)}</Title>
        <p className="wu-summary muted">{glueNumberRanges(study.summary)}</p>
        <p className="hint">Used: {study.stack.join(', ')}</p>
      </header>

      <section className="wu-part">
        <h3 className="label">The problem</h3>
        <p>{study.problem}</p>
      </section>

      <section className="wu-part">
        <h3 className="label">What I did</h3>
        {study.steps.map((step) => (
          <div className="wu-step" key={step.heading}>
            <h4>{step.heading}</h4>
            <p>{step.text}</p>
          </div>
        ))}
      </section>

      <section className="wu-part">
        <h3 className="label">Result</h3>
        <p>{glueNumberRanges(study.outcome)}</p>
      </section>

      <section className="wu-part">
        <h3 className="label">Looking back</h3>
        <p>{study.lesson}</p>
      </section>
    </article>
  );
}
