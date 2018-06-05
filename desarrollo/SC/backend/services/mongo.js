exports.getPopulateOptions = (populatePaths, hiddenFields, option) => {
  console.log(populatePaths)
  let count = 0;
  if (option === 'populated') {
    count = 0;
  } else if (option === 'fullPopulated') {
    count = 2;
  } else {
    count = -1;
  }

  let populate = ''

  for (i = count; i >= 0; i--) {
    if (populatePaths[i] !== '') {
      const newPopulate = {
        path: populatePaths[i],
        select: hiddenFields,
        populate
      }

      populate = Object.assign({}, newPopulate);
    }
  }

  return populate;
}
