const WORDS_PER_MINUTE = 200;

export function analyzeContent(text) {
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readTime = Math.round((wordCount / WORDS_PER_MINUTE) * 10) / 10;

  const paragraphs = text.split(/\n\n/).filter(p => p.trim());
  const headings = text.match(/^#{1,6}\s+.+$/gm) || [];

  const sentences = text.split(/[.!?]+\s+/).filter(s => s.trim());
  const sentenceCount = sentences.length;
  const avgSentenceLength = sentenceCount
    ? Math.round(sentences.reduce((sum, s) => sum + s.split(/\s+/).filter(Boolean).length, 0) / sentenceCount)
    : 0;

  const hasLists = /^[\s]*[-*]\s+/m.test(text);
  const hasLinks = /\[.+?\]\(.+?\)/.test(text);

  return {
    wordCount,
    estimatedReadTimeMinutes: readTime,
    paragraphCount: paragraphs.length,
    headingCount: headings.length,
    hasLists,
    hasLinks,
    sentenceCount,
    avgSentenceLength,
  };
}
