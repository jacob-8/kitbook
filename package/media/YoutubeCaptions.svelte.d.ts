import { SvelteComponentTyped } from "svelte";
import type { YoutubeCaption, YoutubeCaptionTrack } from './captions';
declare const __propDef: {
    props: {
        videoId: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            captions: YoutubeCaption[];
            track: YoutubeCaptionTrack;
        };
    };
};
export declare type YoutubeCaptionsProps = typeof __propDef.props;
export declare type YoutubeCaptionsEvents = typeof __propDef.events;
export declare type YoutubeCaptionsSlots = typeof __propDef.slots;
export default class YoutubeCaptions extends SvelteComponentTyped<YoutubeCaptionsProps, YoutubeCaptionsEvents, YoutubeCaptionsSlots> {
}
export {};
