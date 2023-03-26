module.exports = (array, locales, localeOptions) => {
  let data = array;
  let sortOperations = [];
  let sortLocales = locales;
  let sortLocaleOptions = localeOptions;
  let subLevelFunctions;
  let numberOfOperations = 0;

  const isNotDefined = value => value === null || value === undefined;

  const getValue = (item, valueRetriever) => {
    if (typeof valueRetriever === 'function')
        return valueRetriever(item);

    if (isNotDefined(valueRetriever)) return undefined;

    valueRetriever = valueRetriever.replace(/\?/g, '')
    const parts = valueRetriever.split(/[\.\[]/g);

    let value = item;

    try {
      for (let i = 0; i < parts.length; i++) {
        let part = parts[i]

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
    for (let i = 0; i < numberOfOperations; i++) {
      let { valueRetriever, valueComparer, sortAscending }  = sortOperations[i];
      let valA = sortAscending ? getValue(itemA, valueRetriever) : getValue(itemB, valueRetriever);
      let valB = sortAscending ? getValue(itemB, valueRetriever) : getValue(itemA, valueRetriever);

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
    numberOfOperations = sortOperations.length;
    data.sort(sortObjectArray);
  };

  const addSortOperation = (valueRetriever, comparer = null, sortAscending = true) => {
    let valueComparer = null;
    if (typeof valueRetriever !== 'function' && typeof valueRetriever !== 'string') return;
    if (typeof comparer === 'function') 
      valueComparer = comparer;
    sortOperations.push({ valueRetriever, valueComparer, sortAscending })
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