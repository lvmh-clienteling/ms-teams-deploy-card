"use strict";
exports.__esModule = true;
exports.formatCompactLayout = void 0;
var core_1 = require("@actions/core");
var constants_1 = require("../constants");
var models_1 = require("../models");
function formatCompactLayout(commit, conclusion, elapsedSeconds) {
    var _a;
    var author = commit.data.author;
    var repoUrl = "https://github.com/".concat(process.env.GITHUB_REPOSITORY);
    var shortSha = (_a = process.env.GITHUB_SHA) === null || _a === void 0 ? void 0 : _a.substr(0, 7);
    var runLink = "".concat(repoUrl, "/actions/runs/").concat(process.env.GITHUB_RUN_ID);
    var webhookBody = new models_1.WebhookBody();
    // Set status and elapsedSeconds
    var labels = "`".concat(conclusion.toUpperCase(), "`");
    if (elapsedSeconds) {
        labels = "`".concat(conclusion.toUpperCase(), " [").concat(elapsedSeconds, "s]`");
    }
    // Set environment name
    var environment = (0, core_1.getInput)('environment');
    if (environment !== '') {
        labels += " `ENV:".concat(environment.toUpperCase(), "`");
    }
    // Set themeColor
    webhookBody.themeColor = constants_1.CONCLUSION_THEMES[conclusion] || '957DAD';
    webhookBody.text =
        "".concat(labels, " &nbsp; CI [#").concat(process.env.GITHUB_RUN_NUMBER, "](").concat(runLink, ") ") +
            "(commit [".concat(shortSha, "](").concat(commit.data.html_url, ")) on [").concat(process.env.GITHUB_REPOSITORY, "](").concat(repoUrl, ") ") +
            "by [@".concat(author.login, "](").concat(author.html_url, ")");
    return webhookBody;
}
exports.formatCompactLayout = formatCompactLayout;
