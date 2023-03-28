module.exports = (array, locales, localeOptions) => {
  const data = array;
  const sortOperations = [];
  const sortLocales = locales;
  const sortLocaleOptions = localeOptions;
  let subLevelFunctions;

  const isNotDefined = value => value === null || value === undefined;

  const getValue = (item, retriever) => {
    const { valueRetriever, parts } = retriever
    if (isNotDefined(valueRetriever)) return undefined;

    if (typeof valueRetriever === 'function')
      return valueRetriever(item);

    let value = item;

    try {
      for (let part of parts) {
        if (isNotDefined(value))
          break;

        if (part.endsWith(']')) {
          part = part.substring(0, part.length - 1);
          value = value[parseInt(part)]
        } else {
          value = value[part]
        }
      }
    } catch {
      value = undefined
    }

    return value;
  }

  const sortObjectArray = (itemA, itemB) => {
    for (const { retriever, valueComparer, sortAscending } of sortOperations) {
      let valA = sortAscending ? getValue(itemA, retriever) : getValue(itemB, retriever);
      let valB = sortAscending ? getValue(itemB, retriever) : getValue(itemA, retriever);

      if (isNotDefined(valA)) valA = '';
      if (isNotDefined(valB)) valB = '';

      let equality;

      if (valueComparer) {
        equality = valueComparer(valA, valB);
      }
      else {
        if (typeof valA === 'string' || typeof valB === 'string') {
          equality = ('' + valA).localeCompare(('' + valB), sortLocales, sortLocaleOptions);
        }
        else {
          equality = valA - valB;
        }
      }

      if (equality !== 0) return equality;
    }

    return 0;
  };

  const sort = () => {
    if (data === null || data === undefined || !Array.isArray(data)) return;
    data.sort(sortObjectArray);
  };

  const addSortOperation = (valueRetriever, comparer = null, sortAscending = true) => {
    let valueComparer = null;

    if (typeof valueRetriever !== 'function' && typeof valueRetriever !== 'string') return;

    if (typeof comparer === 'function')
      valueComparer = comparer;

    const retriever = {
      valueRetriever
    }

    if (typeof valueRetriever === 'string') {
      retriever.parts = valueRetriever.replace(/\?/g, '').split(/[\.\[]/g)
    }

    sortOperations.push({ retriever, valueComparer, sortAscending })
  }

  const thenBy = (valueRetriever, comparer = null) => {
    addSortOperation(valueRetriever, comparer, true);
    return subLevelFunctions;
  };

  const thenByDescending = (valueRetriever, comparer = null) => {
    addSortOperation(valueRetriever, comparer, false);
    return subLevelFunctions;
  };

  const orderBy = (valueRetriever, comparer = null) => {
    addSortOperation(valueRetriever, comparer, true);
    return subLevelFunctions;
  };

  const orderByDescending = (valueRetriever, comparer = null) => {
    addSortOperation(valueRetriever, comparer, false);
    return subLevelFunctions;
  };

  subLevelFunctions = {
    thenBy,
    thenByDescending,
    sort
  };

  return {
    orderBy,
    orderByDescending
  };
};