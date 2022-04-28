export interface YoutubeCaptionTrack {
    id: number;
    name: string;
    langCode: string;
    langOriginal: string;
    langTranslated: string;
    langDefault: boolean;
}
export interface YoutubeCaption {
    text: string;
    start: number;
    duration?: number;
}
export declare const getTracks: (videoId: string) => Promise<YoutubeCaptionTrack[]>;
export declare const getCaptions: (videoId: string, { langCode, name }: YoutubeCaptionTrack) => Promise<YoutubeCaption[]>;
export declare const parseTracksXml: (xml: string) => YoutubeCaptionTrack[];
export declare const parseSrv3CaptionsXml: (xml: string) => YoutubeCaption[];
export declare const findCurrentCaption: (captions: YoutubeCaption[], time: number) => YoutubeCaption;
