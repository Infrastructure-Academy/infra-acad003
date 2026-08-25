// Framework-agnostic responsive image contract.
// Wire NarrateButton to a pre-generated neural audio URL; do not use browser Web Speech for final release.

export function BitPointsCard({ card, NarrateButton }) {
  return (
    <article className={`bitpoints-card suit-${card.suit_no}`} data-release-status={card.release_status}>
      <a href={card.website_route} aria-label={`Open ${card.title}`}>
        <picture>
          <source
            type="image/webp"
            srcSet={`${card.image.thumb.url} 448w, ${card.image.medium.url} 896w, ${card.image.large.url} 1792w`}
            sizes="(max-width: 640px) 92vw, (max-width: 1200px) 44vw, 360px"
          />
          <img
            src={card.image.original_jpg.url}
            width="1792"
            height="2400"
            alt={card.alt_text}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: 'auto', objectFit: 'contain', aspectRatio: '1792 / 2400' }}
          />
        </picture>
      </a>
      <h3>{card.code} — {card.title}</h3>
      <p>{card.body}</p>
      <NarrateButton text={card.narration_text} audioUrl={card.narration_audio_url} />
    </article>
  );
}
