import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        audio?: boolean;
        video?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            stream: MediaStream;
            closeStream: () => void;
            microphones: MediaDeviceInfo[];
            cameras: MediaDeviceInfo[];
            chooseMicrophone: (microphone: MediaDeviceInfo) => Promise<void>;
            chooseCamera: (camera: MediaDeviceInfo) => Promise<void>;
            selectedMicrophone: MediaDeviceInfo;
            selectedCamera: MediaDeviceInfo;
        };
    };
};
export declare type MediaStreamProps = typeof __propDef.props;
export declare type MediaStreamEvents = typeof __propDef.events;
export declare type MediaStreamSlots = typeof __propDef.slots;
export default class MediaStream extends SvelteComponentTyped<MediaStreamProps, MediaStreamEvents, MediaStreamSlots> {
}
export {};
