import { parseTracksXml } from './captions';
// import fetch from 'isomorphic-unfetch';
// improve fetch mock with https://kentcdodds.com/blog/stop-mocking-fetch

// test('getTracks should get tracks', async () => {
//   global.fetch = fetch;
//   expect(await getTracks('rokGy0huYEA')).toMatchInlineSnapshot();
// });

test('parseTracksXml returns array even when there is 1 track', () => {
  expect(
    parseTracksXml(
      '<?xml version="1.0" encoding="utf-8" ?><transcript_list docid="14931616755950075552"><track id="0" name="" lang_code="en" lang_original="English" lang_translated="English" lang_default="true"/></transcript_list>'
    )
  ).toHaveLength(1);
});

test('parseTracksXml returns array of tracks', () => {
  expect(
    parseTracksXml(`<?xml version="1.0" encoding="utf-8" ?><transcript_list docid="12576590904572141632"><track id="0" name="" lang_code="ar" lang_original="العربية" lang_translated="Arabic"/><track id="2" name="" lang_code="bn" lang_original="বাংলা" lang_translated="Bangla"/><track id="1" name="" lang_code="bg" lang_original="Български" lang_translated="Bulgarian"/><track id="3" name="" lang_code="ca" lang_original="Català" lang_translated="Catalan"/><track id="54" name="" lang_code="zh-HK" lang_original="中文（香港）" lang_translated="Chinese (Hong Kong)"/><track id="53" name="" lang_code="zh-CN" lang_original="中文（简体）" lang_translated="Chinese (Simplified)"/><track id="55" name="" lang_code="zh-TW" lang_original="中文（繁體）" lang_translated="Chinese (Traditional)"/><track id="21" name="" lang_code="hr" lang_original="Hrvatski" lang_translated="Croatian"/><track 
    id="4" name="" lang_code="cs" lang_original="Čeština" lang_translated="Czech"/><track id="5" name="" lang_code="da" lang_original="Dansk" lang_translated="Danish"/><track id="33" name="" lang_code="nl-BE" lang_original="Nederlands (België)" lang_translated="Dutch (Belgium)"/><track id="34" name="" lang_code="nl-NL" lang_original="Nederlands (Nederland)" lang_translated="Dutch (Netherlands)"/><track id="8" name="" lang_code="en-GB" lang_original="English (United Kingdom)" lang_translated="English (United Kingdom)" lang_default="true"/><track id="9" name="CC" lang_code="en-US" lang_original="English (United States)" lang_translated="English (United States)"/><track id="12" name="" lang_code="et" lang_original="Eesti" lang_translated="Estonian"/><track id="15" name="" lang_code="fil" lang_original="Filipino" lang_translated="Filipino"/><track id="14" name="" 
    lang_code="fi" lang_original="Suomi" lang_translated="Finnish"/><track id="16" name="" lang_code="fr-BE" lang_original="Français (Belgique)" lang_translated="French (Belgium)"/><track id="17" name="" lang_code="fr-CA" lang_original="Français (Canada)" lang_translated="French (Canada)"/><track id="18" name="" lang_code="fr-FR" lang_original="Français (France)" lang_translated="French (France)"/><track id="6" name="" lang_code="de" 
    lang_original="Deutsch" lang_translated="German"/><track id="7" name="" lang_code="el" lang_original="Ελληνικά" lang_translated="Greek"/><track id="19" name="" lang_code="gu" lang_original="ગુજરાતી" lang_translated="G
    ujarati"/><track id="24" name="" lang_code="iw" lang_original="עברית" lang_translated="Hebrew"/><track id="20" name="" lang_code="hi" lang_original="हिन्दी" lang_translated="Hindi"/><track id="22" name="" lang_code="i
    d" lang_original="Indonesia" lang_translated="Indonesian"/><track id="23" name="" lang_code="it" lang_original="Italiano" lang_translated="Italian"/><track id="25" name="" lang_code="ja" lang_original="日本語" lang_translated="Japanese"/><track id="26" name="" lang_code="kn" lang_original="ಕನ್ನಡ" lang_translated="Kannada"/><track id="27" name="" lang_code="ko" lang_original="한국어" lang_translated="Korean"/><track id="29" name=""
     lang_code="lv" lang_original="Latviešu" lang_translated="Latvian"/><track id="28" name="" lang_code="lt" lang_original="Lietuvių" lang_translated="Lithuanian"/><track id="32" name="" lang_code="ms" lang_original="Melayu" lang_translated="Malay"/><track id="30" name="" lang_code="ml" lang_original="മലയാളം" lang_translated="Malayalam"/><track id="31" name="" lang_code="mr" lang_original="मराठी" lang_translated="Marathi"/><track id="35" name="" lang_code="no" lang_original="Norsk" lang_translated="Norwegian"/><track id="13" name="" lang_code="fa" lang_original="فارسی" lang_translated="Persian"/><track id="37" name="" lang_code="pl" lang_original="Polski" lang_translated="Polish"/><track id="38" name="" lang_code="pt-BR" lang_original="Português (Brasil)" lang_translated="Portuguese (Brazil)"/><track id="39" name="" lang_code="pt-PT" lang_original="Português 
    (Portugal)" lang_translated="Portuguese (Portugal)"/><track id="36" name="" lang_code="pa" lang_original="ਪੰਜਾਬੀ" lang_translated="Punjabi"/><track id="40" name="" lang_code="ro" lang_original="Română" lang_translated
    ="Romanian"/><track id="41" name="" lang_code="ru" lang_original="Русский" lang_translated="Russian"/><track id="44" name="" lang_code="sr" lang_original="Српски" lang_translated="Serbian"/><track id="42" name="" lang_code="sk" lang_original="Slovenčina" lang_translated="Slovak"/><track id="43" name="" lang_code="sl" lang_original="Slovenščina" lang_translated="Slovenian"/><track id="10" name="" lang_code="es-419" lang_original="Español (Latinoamérica)" lang_translated="Spanish (Latin America)"/><track id="11" name="" lang_code="es-ES" lang_original="Español (España)" lang_translated="Spanish (Spain)"/><track id="46" name="" lang_code="sw" lang_original="Kiswahili" lang_translated="Swahili"/><track id="45" name="" lang_code="sv" lang_original="Svenska" lang_translated="Swedish"/><track id="47" name="" lang_code="ta" lang_original="தமிழ்" lang_translated="T
    amil"/><track id="48" name="" lang_code="te" lang_original="తెలుగు" lang_translated="Telugu"/><track id="49" name="" lang_code="th" lang_original="ไทย" lang_translated="Thai"/><track id="50" name="" lang_code="tr" lan
    g_original="Türkçe" lang_translated="Turkish"/><track id="51" name="" lang_code="uk" lang_original="Українська" lang_translated="Ukrainian"/><track id="52" name="" lang_code="vi" lang_original="Tiếng Việt" lang_translated="Vietnamese"/></transcript_list>`)
  ).toMatchSnapshot();
});
