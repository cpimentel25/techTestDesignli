export class MappedJsonDto {
  spam: boolean;
  virus: boolean;
  dns: boolean;
  mes: string;
  retrasado: boolean;
  emisor: string;
  receptor: string[];
}

// export class MailHeaders {
//   name: string;
//   value: string;
// }

// export class CommonHeaders {
//   returnPath: string;
//   from: string[];
//   date: string;
//   to: string[];
//   messageId: string;
//   subject: string;
// }

// export class Mail {
//   timestamp: string;
//   source: string;
//   messageId: string;
//   destination: string[];
//   headersTruncated: boolean;
//   headers: MailHeaders[];
//   commonHeaders: CommonHeaders;
// }

// export class Verdict {
//   status: string;
// }

// export class Action {
//   type: string;
//   topicArn: string;
// }

// export class Receipt {
//   timestamp: string;
//   processingTimeMillis: number;
//   recipients: string[];
//   spamVerdict: Verdict;
//   virusVerdict: Verdict;
//   spfVerdict: Verdict;
//   dkimVerdict: Verdict;
//   dmarcVerdict: Verdict;
//   dmarcPolicy: string;
//   action: Action;
// }

// export class Ses {
//   receipt: Receipt;
//   mail: Mail;
// }

// export class Record {
//   eventVersion: string;
//   ses: Ses;
//   eventSource: string;
// }

// export class MailParserDto {
//   Records: Record[];
// }
