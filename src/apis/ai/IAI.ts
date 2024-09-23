export interface IAI {
    summarizeText(text: string): Promise<string>;
    answerQuery(query: string): Promise<string>;
}