export const embeddingService = async (data) => {
  let texto = '';

  if (typeof data === 'string') {
    texto = data.trim();
  } else if (data && typeof data === 'object' && !Array.isArray(data)) {
    const { nombre, descripcion } = data;

    if (typeof nombre === 'string' && nombre.trim()
      && typeof descripcion === 'string' && descripcion.trim()) {
      texto = `${nombre.trim()}: ${descripcion.trim()}`;
    }
  }

  if (!texto) {
    return {
      status: 400,
      message: 'Proporciona un texto no vacío o un producto con nombre y descripcion no vacíos.',
    };
  }

  const apiKey = process.env.GOOGLE_API_KEY?.trim();

  if (!apiKey) {
    return { status: 500, message: 'No está configurada GOOGLE_API_KEY.' };
  }

  try {
    // La credencial se transmite en la cabecera, sin incluirla en la URL.
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          model: 'models/gemini-embedding-001',
          content: { parts: [{ text: texto }] },
          outputDimensionality: 768,
        }),
        signal: AbortSignal.timeout(30000),
      },
    );

    if (!response.ok) {
      return { status: response.status, message: 'Google no pudo generar el embedding.' };
    }

    const result = await response.json();
    const vector = result?.embedding?.values;

    // Solo acepta vectores compatibles con la columna vector(768).
    if (!Array.isArray(vector) || vector.length !== 768 || !vector.every(Number.isFinite)) {
      return { status: 502, message: 'Google devolvió un embedding inválido: se esperaban 768 números finitos.' };
    }

    return { status: 200, message: vector };
  } catch {
    return { status: 502, message: 'No se pudo generar el embedding con Google.' };
  }
};
