import { SvelteComponentTyped } from "svelte";
import type RecordRTCType from 'recordrtc';
import type { Options } from 'recordrtc';
declare const __propDef: {
    props: {
        stream: MediaStream;
        options: Options;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            start: () => void;
            pause: () => void;
            stop: () => Promise<Blob>;
            recorder: RecordRTCType;
            recordingTime: number;
            state: RecordRTCType.State;
        };
    };
};
export declare type RecorderProps = typeof __propDef.props;
export declare type RecorderEvents = typeof __propDef.events;
export declare type RecorderSlots = typeof __propDef.slots;
export default class Recorder extends SvelteComponentTyped<RecorderProps, RecorderEvents, RecorderSlots> {
}
export {};
