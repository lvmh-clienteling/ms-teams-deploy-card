export class PotentialAction {
  '@context' = 'http://schema.org';
  '@type' = 'ViewAction';
  name = '';
  target: string[] = [];

  constructor(name: string, target: string[]) {
    this.name = name;
    this.target = target;
  }
}

export class Fact {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

export class CardSection {
  activityTitle = '';
  activitySubtitle?: string = '';
  activityImage = '';
  activityText?: string;
  facts?: Fact[];
  potentialAction?: PotentialAction[];
}

export class WebhookBody {
  summary = 'Github Actions CI';
  text?: string;
  themeColor = 'FFF49C';
  sections: CardSection[] = [];
}
