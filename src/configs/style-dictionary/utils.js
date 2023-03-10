const flattenAllTokenKeyValues = (parsedTokens) => {
  const result = {};

  const appendAllValuesWithKeyName = ([key, value]) => {
    const isLastNest = !!value.value && !!value.type;
    if (isLastNest) {
      Object.assign(result, { [key]: value.value });
    } else {
      Object.entries(value).forEach((v) => appendAllValuesWithKeyName(v));
    }
  };

  Object.entries(parsedTokens).forEach((p) => appendAllValuesWithKeyName(p));
  return result;
};

const extractAliasPropertyFromStr = (str) => str.match(/\{[^\]]*\}/g);

const getSubstitutedString = (str, d) => {
  console.log("aaaaaaaaaaaaaaaaa");
  const targetAliasList = extractAliasPropertyFromStr(str);
  if (!targetAliasList) return str;
  console.log('reduce!');
  return targetAliasList.reduce(
    (prev, next) => prev.replace(new RegExp("/{[^]]" + next + "}/g"), d[next]),
    str
  );
};

const utils = {
  flattenAllTokenKeyValues,
  extractAliasPropertyFromStr,
  getSubstitutedString,
};

module.exports = utils;
