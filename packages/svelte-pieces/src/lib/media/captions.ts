import { parse } from 'fast-xml-parser';
import type { X2jOptions } from 'fast-xml-parser';
import he from 'he';

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

export const getTracks = async (videoId: string): Promise<YoutubeCaptionTrack[]> => {
  const response = await fetch(
    `https://cors-proxy.peoples.workers.dev/?https://python.zerotohero.ca/timedtext?v=${videoId}&type=list`
  );
  const xml = await response.text();
  return parseTracksXml(xml);
};

export const getCaptions = async (
  videoId: string,
  { langCode, name }: YoutubeCaptionTrack
): Promise<YoutubeCaption[]> => {
  const url = `https://cors-proxy.peoples.workers.dev/?https://python.zerotohero.ca/timedtext?v=${videoId}&lang=${langCode}${
    name ? '&name=' + name : ''
  }&fmt=srv3`; //https://python.zerotohero.ca/timedtext?v=7XeYmKhrK9Q&lang=zh-Hans&fmt=srv3
  // if (name) url += `&name=${name}`;
  const response = await fetch(url);
  const xml = await response.text();
  return parseSrv3CaptionsXml(xml);
};

const options: Partial<X2jOptions> = {
  ignoreAttributes: false,
  ignoreNameSpace: true, // ?
  allowBooleanAttributes: true,
  parseNodeValue: true,
  textNodeName: 'text',
  parseAttributeValue: true,
  attributeNamePrefix: '',
  trimValues: true,
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
};

export const parseTracksXml = (xml: string): YoutubeCaptionTrack[] => {
  const res = parse(xml, options);
  if (!res.transcript_list) {
    return [];
  }
  let tracks = res.transcript_list.track;
  if (!Array.isArray(res.transcript_list.track)) {
    tracks = [tracks];
  }

  return tracks.map((attrs) => {
    return {
      id: Number(attrs.id),
      name: attrs.name,
      langCode: attrs.lang_code,
      langOriginal: attrs.lang_original,
      langTranslated: attrs.lang_translated,
      langDefault: attrs.lang_default === true,
    };
  });
};

// deprecated with the passing of YouTube's API
// export const parseCaptionsXml = (xml: string): YoutubeCaption[] => {
//   const res = parse(xml, options);

//   if (!res.transcript || !Array.isArray(res.transcript.text)) {
//     return [];
//   }

//   return res.transcript.text
//     .map((item) => {
//       return {
//         text: item.text || '',
//         start: Number(item.start),
//         duration: item.dur ? Number(item.dur) : undefined,
//       };
//     })
//     .filter((item) => item.text);
// };

export const parseSrv3CaptionsXml = (xml: string): YoutubeCaption[] => {
  const res = parse(xml, options);

  if (!(res?.timedtext?.body?.p && Array.isArray(res.timedtext.body.p))) {
    return [];
  }

  const lines = res.timedtext.body.p;
  return lines
    .map((item) => {
      return {
        text: item.text || '',
        start: Number(item.t) / 1000,
        duration: item.d ? Number(item.d) / 1000 : undefined,
      };
    })
    .filter((item) => item.text);
  // see https://github.com/longjiang/zerotohero-nuxt/blob/master/lib/youtube.js#L40-L54 if having trouble with empty lines or out of order
};

// from @os-team/youtube-captions though its sax depenency is only for Node so am using fast-xml-parser instead to cover browser usage
// useful links: https://stackoverflow.com/questions/23665343/get-closed-caption-cc-for-youtube-video/30601863

export const findCurrentCaption = (captions: YoutubeCaption[], time: number) => {
  return captions.find(({ start, duration }) => start <= time && start + duration > time);
};
