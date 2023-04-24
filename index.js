/* eslint-disable no-magic-numbers */

const pluralize = word => {
  word = word.toLowerCase().trim();

  if (IRREGULAR_PLURALS[word]) {
    return IRREGULAR_PLURALS[word];
  }

  if (word.length >= 2 && VOWELS.includes(word[word.length - 2])) {
    return `${word}s`;
  }

  if (word.endsWith('s') || word.endsWith('sh') || word.endsWith('ch') || word.endsWith('x') || word.endsWith('z')) {
    return `${word}es`;
  }

  if (word.endsWith('y')) {
    return `${word.slice(0, -1)}ies`;
  }

  return `${word}s`;
};

module.exports = {
  pluralize,

  quantify: (count = 1, word) => `${count.toLocaleString()} ${count === 1 ? word : pluralize(word)}`,

  prune: (string = '', length = 0) => `${string}`.trim().substring(0, length).replace(/(<([^>]+)>)/gi, ''),

  capitalizeSlug: source => (
    source
      .split('-')
      .map(word => (
        word.replace(
          word.charAt(0),
          word.charAt(0).toUpperCase()
        ))
      )
      .join(' ')
  ),

  toSlug: source => (
    source.toLowerCase().trim().replace(/ /, '-')
  ),

  toDollar: number => {
    const dollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return dollar.format(number);
  },

  toSingular: source => {
    let result = source;

    if (result.substr(-3) === 'ies') {
      result = `${result.slice(0, -3)}y`;
    }

    if (result.substr(-1) === 's') {
      result = result.slice(0, -1);
    }

    return result;
  },

  generateUUID: () => {
    const g4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
    };

    return (
      `${g4()}${g4()}-${g4()}-${g4()}-${g4()}-${g4()}${g4()}${g4()}`
    );
  }
};
