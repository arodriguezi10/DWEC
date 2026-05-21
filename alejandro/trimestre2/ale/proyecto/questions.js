// Importación usando Import Attributes (Node.js moderno)
import datos from './database.json' with { type: 'json' };

export class questions {
  // Uso de campos privados (#) para evitar mutaciones externas (Buena práctica)
  #geografia;  //array de datos de historia
  #historia; //array de datos de historia
  #ciencia; //array de datos de historia
  #arteLiteratura; //array de datos de historia

  constructor() {
    this.#geografia = datos["Geografía"] || [];
    this.#historia = datos["Historia"] || [];
    this.#ciencia = datos["Ciencia"] || [];
    this.#arteLiteratura = datos["Arte y Literatura"] || [];
  }

  // Retornamos una copia del array (spread operator) para mantener la inmutabilidad
  get historia() {
    return [...this.#historia];
  }

  get geografia() {
    return [...this.#geografia];
  }

  get ciencia() {
    return [...this.#ciencia];
  }

  get arteLiteratura() {
    return [...this.#arteLiteratura];
  }

  getTopics() {
    return ['Geografía', 'Historia', 'Ciencia', 'Arte y Literatura'];
  }
}