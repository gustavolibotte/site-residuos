'use strict';

module.exports = (config, webpack) => {
  const runtime = require.resolve('regenerator-runtime/runtime');

  // Função segura para injetar o runtime no início de qualquer entrada
  const injectRuntime = (entry) => {
    if (typeof entry === 'string') {
      return [runtime, entry];
    }
    if (Array.isArray(entry)) {
      return [runtime, ...entry];
    }
    return entry;
  };

  // Verifica e injeta o runtime dependendo do formato do 'config.entry'
  if (config.entry) {
    if (typeof config.entry === 'string' || Array.isArray(config.entry)) {
      config.entry = injectRuntime(config.entry);
    } else if (typeof config.entry === 'object') {
      // Se for objeto, tenta injetar no 'main' ou em todos
      if (config.entry.main) {
        config.entry.main = injectRuntime(config.entry.main);
      } else {
        for (const key in config.entry) {
          config.entry[key] = injectRuntime(config.entry[key]);
        }
      }
    }
  }

  return config;
};