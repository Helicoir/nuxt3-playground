const StyleDictionary = require("style-dictionary");
const setTokenRecursiveParserForTokensStudio = require("./parser.js");

StyleDictionary.registerAction({
  name: "dropShadow-shorthand",
  do: (dictionary, configs) => {
    console.log(dictionary.tokens.shadow);
    console.log("===");
    console.log(configs.transforms);
  },
  undo: () => {
    console.log("undo");
  },
});

// const parseTargetValueTypeList = ["boxShadow", "typography", "composition"];

// const flattenCompositeTokenValues = (parsedToken) => {
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

// StyleDictionary.registerParser({
//   pattern: /\.json$/,
//   parse: ({ contents }) => {
//     const parsedToken = JSON.parse(contents);

//     const flattenValues = flattenCompositeTokenValues(parsedToken);
//     return {
//       ...flattenValues,
//     };
//   },
// });

setTokenRecursiveParserForTokensStudio();

const sd = StyleDictionary.extend({
  source: ["src/configs/design-tokens/formatted-tokens-with-alias.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/assets/css/",
      files: [
        {
          destination: "_variables.css",
          format: "css/variables",
        },
      ],
      // transforms: ["sample"],
      // actions: ["dropShadow-shorthand"],
    },
  },
});

sd.buildAllPlatforms();
