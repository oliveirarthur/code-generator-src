export interface ITemplate {
  text: string;
}

export interface IProcessedTemplate {
  [key: string]: string;
}

export interface IProcessedTemplateError {
  [key: string]: string;
}
