/// <reference types="youtube" />
import { SvelteComponentTyped } from "svelte";
export declare const PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
};
declare const __propDef: {
    props: {
        videoId: string;
    };
    events: {
        ready: CustomEvent<YT.Player>;
        error: CustomEvent<YT.OnErrorEvent>;
        stateChange: CustomEvent<YT.OnStateChangeEvent>;
        playbackRateChange: CustomEvent<YT.OnPlaybackRateChangeEvent>;
        playbackQualityChange: CustomEvent<YT.OnPlaybackQualityChangeEvent>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            player: YT.Player;
            state: YT.PlayerState;
            playbackRate: number;
            playbackQuality: string;
        };
    };
};
export declare type YoutubeProps = typeof __propDef.props;
export declare type YoutubeEvents = typeof __propDef.events;
export declare type YoutubeSlots = typeof __propDef.slots;
export default class Youtube extends SvelteComponentTyped<YoutubeProps, YoutubeEvents, YoutubeSlots> {
}
export {};
