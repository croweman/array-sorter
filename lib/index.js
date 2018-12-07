module.exports = (array, locales, localeOptions) => {
  let data = array;
  let sortOperations = [];
  let sortLocales = locales;
  let sortLocaleOptions = localeOptions;
  let subLevelFunctions;

  const sortObjectArray = (itemA, itemB) => {
    for (let i = 0; i < sortOperations.length; i++) {
      let { valueRetriever, valueComparer, sortAscending }  = sortOperations[i];
      let valA = sortAscending ? valueRetriever(itemA) : valueRetriever(itemB);
      let valB = sortAscending ? valueRetriever(itemB) : valueRetriever(itemA);

      if (valA === null || valA === undefined) valA = '';
      if (valB === null || valB === undefined) valB = '';

      let equality;

      if (valueComparer) { 
        equality = valueComparer(valA, valB);
      }
      else {
        if (typeof valA === 'string' || typeof valB === 'string') { 
          equality = valA.localeCompare(valB, sortLocales, sortLocaleOptions);
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
    if (typeof valueRetriever !== 'function') return;
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