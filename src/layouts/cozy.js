"use strict";
exports.__esModule = true;
exports.formatCozyLayout = exports.OCTOCAT_LOGO_URL = void 0;
var core_1 = require("@actions/core");
var luxon_1 = require("luxon");
var constants_1 = require("../constants");
var models_1 = require("../models");
var utils_1 = require("../utils");
exports.OCTOCAT_LOGO_URL = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
function formatCozyLayout(commit, conclusion, elapsedSeconds) {
    var _a;
    var timezone = (0, core_1.getInput)('timezone') || 'UTC';
    var nowFmt = luxon_1.DateTime.local().setZone(timezone).toFormat('dddd, MMMM Do YYYY, h:mm:ss a z');
    var webhookBody = new models_1.WebhookBody();
    var repoUrl = "https://github.com/".concat(process.env.GITHUB_REPOSITORY);
    var shortSha = (_a = process.env.GITHUB_SHA) === null || _a === void 0 ? void 0 : _a.substr(0, 7);
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
    // Get potential actions
    var actions = (0, utils_1.renderActions)("".concat(repoUrl, "/actions/runs/").concat(process.env.GITHUB_RUN_ID), commit.data.html_url);
    var actionsConcat = actions.map(function (action) { return " &nbsp; &nbsp; [".concat(action.name, "](").concat(action.target, ")"); }).join('');
    var author = commit.data.author;
    // Set sections
    webhookBody.sections = [
        {
            activityTitle: "**CI #".concat(process.env.GITHUB_RUN_NUMBER, " (commit ").concat(shortSha, ")** on [").concat(process.env.GITHUB_REPOSITORY, "](").concat(repoUrl, ")"),
            activityImage: (author === null || author === void 0 ? void 0 : author.avatar_url) || exports.OCTOCAT_LOGO_URL,
            activitySubtitle: author ? "by [@".concat(author.login, "](").concat(author.html_url, ") on ").concat(nowFmt) : nowFmt,
            activityText: "".concat(labels).concat(actionsConcat)
        },
    ];
    return webhookBody;
}
exports.formatCozyLayout = formatCozyLayout;
