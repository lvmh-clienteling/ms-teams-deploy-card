"use strict";
exports.__esModule = true;
exports.formatCompleteLayout = exports.formatFilesToDisplay = void 0;
var core_1 = require("@actions/core");
var yaml_1 = require("yaml");
var models_1 = require("../models");
var utils_1 = require("../utils");
var cozy_1 = require("./cozy");
function formatFilesToDisplay(files, allowedLength, htmlUrl) {
    var filesChanged = files
        .slice(0, allowedLength)
        .map(function (file) { return "[".concat((0, utils_1.escapeMarkdownTokens)(file.filename), "](").concat(file.blob_url, ") (").concat(file.changes, " changes)"); });
    var filesToDisplay = '';
    if (files.length === 0) {
        filesToDisplay = '*No files changed.*';
    }
    else {
        filesToDisplay = '* ' + filesChanged.join('\n\n* ');
        if (files.length > 7) {
            var moreLen = files.length - 7;
            filesToDisplay += "\n\n* and [".concat(moreLen, " more files](").concat(htmlUrl, ") changed");
        }
    }
    return filesToDisplay;
}
exports.formatFilesToDisplay = formatFilesToDisplay;
function formatCompleteLayout(commit, conclusion, elapsedSeconds) {
    var _a, _b;
    var repoUrl = "https://github.com/".concat(process.env.GITHUB_REPOSITORY);
    var branchUrl = "".concat(repoUrl, "/tree/").concat(process.env.GITHUB_REF);
    var webhookBody = (0, cozy_1.formatCozyLayout)(commit, conclusion, elapsedSeconds);
    var section = webhookBody.sections[0];
    // for complete layout, just replace activityText with potentialAction
    section.activityText = undefined;
    section.potentialAction = (0, utils_1.renderActions)("".concat(repoUrl, "/actions/runs/").concat(process.env.GITHUB_RUN_ID), commit.data.html_url);
    // Set status and elapsedSeconds
    var labels = "`".concat(conclusion.toUpperCase(), "`");
    if (elapsedSeconds) {
        labels = "`".concat(conclusion.toUpperCase(), " [").concat(elapsedSeconds, "s]`");
    }
    // Set section facts
    section.facts = [
        new models_1.Fact('Event type:', '`' + ((_a = process.env.GITHUB_EVENT_NAME) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + '`'),
        new models_1.Fact('Status:', labels),
        new models_1.Fact('Commit message:', (0, utils_1.escapeMarkdownTokens)(commit.data.commit.message)),
        new models_1.Fact('Repository & branch:', "[".concat(branchUrl, "](").concat(branchUrl, ")")),
    ];
    // Set custom facts
    var customFacts = (0, core_1.getInput)('custom-facts');
    if (customFacts && customFacts.toLowerCase() !== 'null') {
        try {
            var customFactsCounter_1 = 0;
            var customFactsList = (0, yaml_1.parse)(customFacts);
            if (Array.isArray(customFactsList)) {
                customFactsList.forEach(function (fact) {
                    var _a;
                    if (fact.name !== undefined && fact.value !== undefined) {
                        (_a = section.facts) === null || _a === void 0 ? void 0 : _a.push(new models_1.Fact(fact.name + ':', fact.value));
                        customFactsCounter_1++;
                    }
                });
            }
            (0, core_1.info)("Added ".concat(customFactsCounter_1, " custom facts."));
        }
        catch (_c) {
            (0, core_1.warning)('Invalid custom-facts value.');
        }
    }
    // Set environment name
    var environment = (0, core_1.getInput)('environment');
    if (environment !== '') {
        section.facts.splice(1, 0, new models_1.Fact('Environment:', "`".concat(environment.toUpperCase(), "`")));
    }
    // Set list of files
    if ((0, core_1.getInput)('include-files').toLowerCase() === 'true') {
        var allowedFileLen = (0, core_1.getInput)('allowed-file-len').toLowerCase();
        var allowedFileLenParsed = parseInt(allowedFileLen === '' ? '7' : allowedFileLen);
        var filesToDisplay = formatFilesToDisplay(commit.data.files, allowedFileLenParsed, commit.data.html_url);
        (_b = section.facts) === null || _b === void 0 ? void 0 : _b.push({
            name: 'Files changed:',
            value: filesToDisplay
        });
    }
    return webhookBody;
}
exports.formatCompleteLayout = formatCompleteLayout;
