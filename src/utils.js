"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.renderActions = exports.getWorkflowRunStatus = exports.formatAndNotify = exports.submitNotification = exports.getOctokitCommit = exports.getRunInformation = exports.escapeMarkdownTokens = void 0;
var core_1 = require("@actions/core");
var rest_1 = require("@octokit/rest");
var luxon_1 = require("luxon");
var node_fetch_1 = require("node-fetch");
var yaml_1 = require("yaml");
var compact_1 = require("./layouts/compact");
var complete_1 = require("./layouts/complete");
var cozy_1 = require("./layouts/cozy");
var models_1 = require("./models");
function escapeMarkdownTokens(text) {
    return text
        .replace(/\n\ {1,}/g, '\n ')
        .replace(/\_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/\|/g, '\\|')
        .replace(/#/g, '\\#')
        .replace(/-/g, '\\-')
        .replace(/>/g, '\\>');
}
exports.escapeMarkdownTokens = escapeMarkdownTokens;
function getRunInformation() {
    var _a = (process.env.GITHUB_REPOSITORY || '').split('/'), owner = _a[0], repo = _a[1];
    return {
        owner: owner,
        repo: repo,
        ref: process.env.GITHUB_SHA || undefined,
        branchUrl: "https://github.com/".concat(process.env.GITHUB_REPOSITORY, "/tree/").concat(process.env.GITHUB_REF),
        runId: process.env.GITHUB_RUN_ID || undefined,
        runNum: process.env.GITHUB_RUN_NUMBER || undefined
    };
}
exports.getRunInformation = getRunInformation;
function getOctokitCommit() {
    return __awaiter(this, void 0, void 0, function () {
        var runInfo, githubToken, octokit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    runInfo = getRunInformation();
                    (0, core_1.info)('Workflow run information: ' + JSON.stringify(runInfo, undefined, 2));
                    githubToken = (0, core_1.getInput)('github-token', { required: true });
                    octokit = new rest_1.Octokit({ auth: "token ".concat(githubToken) });
                    return [4 /*yield*/, octokit.repos.getCommit({
                            owner: runInfo.owner,
                            repo: runInfo.repo,
                            ref: runInfo.ref || ''
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getOctokitCommit = getOctokitCommit;
function submitNotification(webhookBody) {
    return __awaiter(this, void 0, void 0, function () {
        var webhookUri, webhookBodyJson, response, message_1_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    webhookUri = (0, core_1.getInput)('webhook-uri', { required: true });
                    webhookBodyJson = JSON.stringify(webhookBody, undefined, 2);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])(webhookUri, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: webhookBodyJson
                        })];
                case 2:
                    response = _a.sent();
                    (0, core_1.setOutput)('webhook-body', webhookBodyJson);
                    (0, core_1.info)(webhookBodyJson);
                    return [2 /*return*/, response];
                case 3:
                    message_1_1 = _a.sent();
                    return [2 /*return*/, console.error(message_1_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.submitNotification = submitNotification;
function formatAndNotify(state, conclusion, elapsedSeconds) {
    if (conclusion === void 0) { conclusion = 'in_progress'; }
    return __awaiter(this, void 0, void 0, function () {
        var webhookBody, commit, cardLayoutStart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getOctokitCommit()];
                case 1:
                    commit = _a.sent();
                    cardLayoutStart = (0, core_1.getInput)("card-layout-".concat(state));
                    if (cardLayoutStart === 'compact') {
                        webhookBody = (0, compact_1.formatCompactLayout)(commit, conclusion, elapsedSeconds);
                    }
                    else if (cardLayoutStart === 'cozy') {
                        webhookBody = (0, cozy_1.formatCozyLayout)(commit, conclusion, elapsedSeconds);
                    }
                    else {
                        webhookBody = (0, complete_1.formatCompleteLayout)(commit, conclusion, elapsedSeconds);
                    }
                    return [4 /*yield*/, submitNotification(webhookBody)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.formatAndNotify = formatAndNotify;
function getWorkflowRunStatus() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var runInfo, githubToken, octokit, workflowJobs, job, lastStep, stoppedStep, startTime, endTime;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    runInfo = getRunInformation();
                    githubToken = (0, core_1.getInput)('github-token', { required: true });
                    octokit = new rest_1.Octokit({ auth: "token ".concat(githubToken) });
                    return [4 /*yield*/, octokit.actions.listJobsForWorkflowRun({
                            owner: runInfo.owner,
                            repo: runInfo.repo,
                            run_id: parseInt(runInfo.runId || '1')
                        })];
                case 1:
                    workflowJobs = _c.sent();
                    job = workflowJobs.data.jobs.find(function (job) { return job.name === process.env.GITHUB_JOB; });
                    stoppedStep = (_a = job === null || job === void 0 ? void 0 : job.steps) === null || _a === void 0 ? void 0 : _a.find(function (step) {
                        return step.conclusion === 'failure' ||
                            step.conclusion === 'timed_out' ||
                            step.conclusion === 'cancelled' ||
                            step.conclusion === 'action_required';
                    });
                    if (stoppedStep) {
                        lastStep = stoppedStep;
                    }
                    else {
                        lastStep = (_b = job === null || job === void 0 ? void 0 : job.steps) === null || _b === void 0 ? void 0 : _b.reverse().find(function (step) { return step.status === 'completed'; });
                    }
                    if ((job === null || job === void 0 ? void 0 : job.started_at) && (lastStep === null || lastStep === void 0 ? void 0 : lastStep.completed_at)) {
                        startTime = luxon_1.DateTime.fromISO(job.started_at);
                        endTime = luxon_1.DateTime.fromISO(lastStep.completed_at);
                        return [2 /*return*/, {
                                elapsedSeconds: endTime.diff(startTime, 'seconds'),
                                conclusion: lastStep === null || lastStep === void 0 ? void 0 : lastStep.conclusion
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getWorkflowRunStatus = getWorkflowRunStatus;
function renderActions(statusUrl, diffUrl) {
    var actions = [];
    if ((0, core_1.getInput)('enable-view-status-action').toLowerCase() === 'true') {
        actions.push(new models_1.PotentialAction((0, core_1.getInput)('view-status-action-text'), [statusUrl]));
    }
    if ((0, core_1.getInput)('enable-review-diffs-action').toLowerCase() === 'true') {
        actions.push(new models_1.PotentialAction((0, core_1.getInput)('review-diffs-action-text'), [diffUrl]));
    }
    // Set custom actions
    var customActions = (0, core_1.getInput)('custom-actions');
    if (customActions && customActions.toLowerCase() !== 'null') {
        try {
            var customActionsCounter_1 = 0;
            var customActionsList = (0, yaml_1.parse)(customActions);
            if (Array.isArray(customActionsList)) {
                customActionsList.forEach(function (action) {
                    if (action.text !== undefined &&
                        action.url !== undefined &&
                        action.url.match(/https?:\/\/\S+/g)) {
                        actions.push(new models_1.PotentialAction(action.text, [action.url]));
                        customActionsCounter_1++;
                    }
                });
            }
            (0, core_1.info)("Added ".concat(customActionsCounter_1, " custom facts."));
        }
        catch (_a) {
            (0, core_1.warning)('Invalid custom-actions value.');
        }
    }
    return actions;
}
exports.renderActions = renderActions;
