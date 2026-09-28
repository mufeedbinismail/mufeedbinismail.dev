import type { CaseStudy } from '../lib/cases';
import { glueNumberRanges, numbered } from '../lib/format';
import './case-study.css';

interface Props {
  study: CaseStudy;
  /** `h1` on a case study's own page, `h2` inside the drawer on the home page. */
  titleAs: 'h1' | 'h2';
}

/** The full write-up of one case study, identical in the drawer and on its own page. */
export default function CaseStudyBody({ study, titleAs: Title }: Props) {
  return (
    <article className="cs">
      <div className="cs-intro">
        <span className="eyebrow">
          {study.year} · {study.role}
        </span>
        <Title className="display cs-title">{glueNumberRanges(study.title)}</Title>
        <p className="cs-summary muted">{study.summary}</p>
        <ul className="cs-tags" aria-label="Tags">
          {study.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      <dl className="cs-metrics">
        {study.metrics.map((metric) => (
          <div key={metric.label}>
            <dt className="display">{metric.value}</dt>
            <dd className="muted">{metric.label}</dd>
          </div>
        ))}
      </dl>

      <section className="cs-part">
        <h3 className="label">The problem</h3>
        <p className="cs-prose">{study.problem}</p>
      </section>

      <section className="cs-part">
        <h3 className="label">Approach</h3>
        <ol className="cs-steps">
          {study.steps.map((step, i) => (
            <li key={step.heading}>
              <span className="cs-step-n">{numbered(i)}</span>
              <div>
                <h4>{step.heading}</h4>
                <p className="muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cs-part">
        <h3 className="label">Outcome</h3>
        <p className="cs-prose">{study.outcome}</p>
      </section>

      <blockquote className="cs-lesson">
        <span className="eyebrow">What I took away</span>
        <p className="display">{study.lesson}</p>
      </blockquote>
    </article>
  );
}
