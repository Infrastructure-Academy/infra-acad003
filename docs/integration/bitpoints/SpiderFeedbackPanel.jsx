// Visible learning feedback panel: never hide this behind a modal or accordion.
// NarrateButton should play pre-generated neural audio for explanatory copy.

export function SpiderFeedbackPanel({ card, NarrateButton, onSubmit }) {
  const explanation = 'This card is part of a living experiment. If you find a fact, image, connection, or idea that deserves review, tell the Spider. Your observation becomes evidence for the next synthesis.';
  return (
    <section className="spider-feedback" aria-labelledby={`spider-${card.card_id}`}>
      <h3 id={`spider-${card.card_id}`}>Found something? Tell the Spider.</h3>
      <p>{explanation}</p>
      <NarrateButton text={explanation} audioUrl={card.spider_feedback_audio_url ?? null} />
      <p><strong>{card.player_badge}:</strong> {card.experimental_meaning}</p>
      <form onSubmit={onSubmit} data-card-id={card.card_id}>
        <label>What did you notice?<textarea name="observation" required minLength={3} /></label>
        <label>Type of finding<select name="category" required>
          {card.spider_feedback.feedback_categories.map((item) => <option key={item}>{item}</option>)}
        </select></label>
        <label>Evidence link, if any<input name="evidence_url" type="url" /></label>
        <label>Your suggested synthesis<textarea name="suggested_synthesis" /></label>
        <label><input name="consent_to_publish_anonymously" type="checkbox" /> I consent to anonymous publication of this observation in the experiment log.</label>
        <button type="submit">Send to the Spider</button>
      </form>
    </section>
  );
}
