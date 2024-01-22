const axios = require("axios");
const functions = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");
const {defineSecret} = require("firebase-functions/params");
const CUSTOM_SEARCH_API_KEY = defineSecret("CUSTOM_SEARCH_API_KEY");
const SEARCH_ENGINE_ID = defineSecret("SEARCH_ENGINE_ID");


// exports.testCustomSearchApiKey = onRequest(
//     {secrets: [CUSTOM_SEARCH_API_KEY]},
//     (req, res) => {
//       const apiKey = CUSTOM_SEARCH_API_KEY.value();
//       res.send(apiKey.slice(0, 10));
//     });

functions.setGlobalOptions({maxInstances: 10});

exports.getAutocompleteResults = functions.https.onCall(
    {cors: true,
      region: "europe-west1"},
    async (req) => {
      const searchQuery = req.data.q;
      logger.info(req);
      const axiosRes = await axios.get(
          `https://www.google.com/complete/search?client=hp&hl=en&sugexp=msedr&gs_rn=62&gs_ri=hp&cp=1&gs_id=9c&q=${searchQuery}&xhr=t
      `,
      );
      const results = axiosRes.data[1].map((rawResult) => {
        const match = rawResult[0].match(/<b>(.+)<\/b>/);
        if (match) return match[1];
      });
      const filteredResults = results.filter((r) => r !== null);
      logger.info("first autocomplete:", filteredResults[0]);

      return filteredResults;
    },
);

exports.searchGoogle = functions.https.onCall(
    {cors: true,
      region: "europe-west1",
      secrets: [CUSTOM_SEARCH_API_KEY, SEARCH_ENGINE_ID]},
    async (req) => {
      const apiKey = CUSTOM_SEARCH_API_KEY.value();
      const searchId = SEARCH_ENGINE_ID.value();
      logger.info("google search params:", req.data.q,
          apiKey.slice(0, 10), searchId.slice(0, 10));
      const axiosRes = await axios
          .get("https://www.googleapis.com/customsearch/v1", {
            params: {
              "q": req.data.q,
              "key": apiKey,
              "cx": searchId,
            },
          });
      const snippets = axiosRes.data["items"].map((e) => e["snippet"]);
      logger.info(snippets[0]);
      return snippets.filter((snippet) => !!snippet);
    },
);
