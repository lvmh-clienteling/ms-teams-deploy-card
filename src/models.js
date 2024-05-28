"use strict";
exports.__esModule = true;
exports.WebhookBody = exports.CardSection = exports.Fact = exports.PotentialAction = void 0;
var PotentialAction = /** @class */ (function () {
    function PotentialAction(name, target) {
        this['@context'] = 'http://schema.org';
        this['@type'] = 'ViewAction';
        this.name = '';
        this.target = [];
        this.name = name;
        this.target = target;
    }
    return PotentialAction;
}());
exports.PotentialAction = PotentialAction;
var Fact = /** @class */ (function () {
    function Fact(name, value) {
        this.name = name;
        this.value = value;
    }
    return Fact;
}());
exports.Fact = Fact;
var CardSection = /** @class */ (function () {
    function CardSection() {
        this.activityTitle = '';
        this.activitySubtitle = '';
        this.activityImage = '';
    }
    return CardSection;
}());
exports.CardSection = CardSection;
var WebhookBody = /** @class */ (function () {
    function WebhookBody() {
        this.summary = 'Github Actions CI';
        this.themeColor = 'FFF49C';
        this.sections = [];
    }
    return WebhookBody;
}());
exports.WebhookBody = WebhookBody;
