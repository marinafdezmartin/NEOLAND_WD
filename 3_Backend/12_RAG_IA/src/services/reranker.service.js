/** @param {{ query?: string, documents?: string[], top_n?: number }} [params] */
export const rerankerService = async (params = {}) => {
  const { query, documents, top_n } = params ?? {};

  if (typeof query !== 'string' || !query.trim()) {
    return { status: 400, message: 'La consulta para reordenar debe ser un texto no vacío.' };
  }

  if (!Array.isArray(documents) || documents.length === 0
    || !documents.every((document) => typeof document === 'string' && document.trim())) {
    return { status: 400, message: 'Los documentos deben ser una lista de textos no vacíos.' };
  }

  const topN = top_n === undefined ? documents.length : top_n;

  if (!Number.isInteger(topN) || topN < 1 || topN > documents.length) {
    return { status: 400, message: 'top_n debe ser un entero entre 1 y el número de documentos.' };
  }

  const apiKey = process.env.JINA_API_KEY?.trim();

  if (!apiKey) {
    return { status: 500, message: 'No está configurada JINA_API_KEY.' };
  }

  try {
    const response = await fetch('https://api.jina.ai/v1/rerank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'jina-reranker-v2-base-multilingual',
        query: query.trim(),
        documents,
        top_n: topN,
        return_documents: false,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      return { status: response.status, message: 'Jina no pudo reordenar los documentos.' };
    }

    const result = await response.json();

    if (!Array.isArray(result?.results)) {
      return { status: 502, message: 'Jina devolvió una respuesta inválida.' };
    }

    return { status: 200, message: result.results };
  } catch {
    return { status: 502, message: 'No se pudo reordenar los documentos con Jina.' };
  }
};
