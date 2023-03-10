const StyleDictionary = require("style-dictionary");
// @ts-ignore
const transform = require("token-transformer/import");

const utils = require("./utils");
/**
 * Parser for flatten composite token values of specific type, such as "boxShadow", "typography", "composition".
 */

// const parseTargetValueTypeList = ["boxShadow", "typography", "composition"];

// const flattenCompositeTokenValues = (parsedToken) => {
//   console.log("✨ start flattenCompositeTokenValues...");
//   const findParseTargetValueTypeRecursively = ([, val]) => {
//     const nextKeys = Object.keys(val);
//     if (nextKeys.includes("type")) {
//       return parseTargetValueTypeList.includes(val.type);
//     }

//     return Object.entries(val).some((entry) =>
//       findParseTargetValueTypeRecursively(entry)
//     );
//   };
//   const tokenEntries = Object.entries(parsedToken);
//   const tokenEntriesFilteredByParseTargetType = tokenEntries.filter((entry) => {
//     return findParseTargetValueTypeRecursively(entry);
//   });

//   const result = { ...parsedToken };

//   if (!tokenEntriesFilteredByParseTargetType.length) return result;

//   const flattenTokenRecursively = (
//     [propertyName, propertyValue],
//     tokenKeyName
//   ) => {
//     if (propertyName === "type") return;
//     if (propertyName !== "value") {
//       return Object.entries(propertyValue).forEach((entry) => {
//         const suffix =
//           entry[0] === "value" ? tokenKeyName : `${tokenKeyName}-${entry[0]}`;
//         return flattenTokenRecursively(entry, suffix);
//       });
//     }
//     Object.entries(propertyValue).forEach(([key, value]) => {
//       const keyName = `${tokenKeyName}-${key}`;
//       Object.assign(result, {
//         [keyName]: { value },
//       });

//       delete result[tokenKeyName];
//     });
//   };

//   tokenEntriesFilteredByParseTargetType.forEach((tokenEntry) =>
//     flattenTokenRecursively(tokenEntry, tokenEntry[0])
//   );

//   return result;
// };

// function setTokenVariablePropertiesRecursiveMapper(parsedToken) {
//   console.log("✨ start setTokenVariablePropertiesRecursiveMapper...");
//   const allTokenKeyValues = utils.flattenAllTokenKeyValues(parsedToken);

//   const result = { ...parsedToken };

//   const substituteAliasStringToValue = (token, S) => {
//     Object.entries(token).forEach(([propertyName, propertyValue]) => {
//       const isLastNest = propertyName === "value";
//       if (isLastNest && typeof propertyValue === "object") {
//         console.log("OBJECTTTTTTTTTTTTTT");
//         Object.entries(propertyValue).forEach(([k, v]) => {
//           const keyname = [S].value[k];

//           Object.assign(result, {
//             [keyname]: utils.getSubstitutedString(v, allTokenKeyValues),
//           });
//         });
//       } else if (isLastNest && typeof propertyValue === "string") {
//         // propName = 'red', propVal = '0000ff'
//         console.log('debug');
//         console.log('stuckKeyname', S);
//         console.log([S][propertyName]);
//         const keyname = S ? [S][propertyName] : propertyName;

//         Object.assign(result, {
//           [keyname]: utils.getSubstitutedString(
//             propertyValue,
//             allTokenKeyValues
//           ),
//         });

//         console.log("end: ", keyname);
//       } else {
//         Object.entries(propertyValue).forEach(([k, v]) => {
//           console.log([S][k]);
//           substituteAliasStringToValue(v, S ? [S][k] : k);
//         });
//       }
//     });
//   };

//   substituteAliasStringToValue(parsedToken);
//   return result;
// }

function setTokenTransformFunctionsForTokensStudio() {
  StyleDictionary.registerParser({
    pattern: /\.json$/,
    parse: ({ contents }) => {
      const setsToUse = ["test"];
      const excludes = [];

      const transformerOptions = {
        expandTypography: true,
        expandShadow: true,
        expandComposition: true,
        preserveRawValue: false,
        throwErrorWhenNotResolved: true,
        resolveReferences: true,
      };

      console.log(transform);
      const result = transform(
        contents,
        setsToUse,
        excludes,
        transformerOptions
      );
      console.log(result);
      return result;
    },
  });
}

module.exports = setTokenTransformFunctionsForTokensStudio;
