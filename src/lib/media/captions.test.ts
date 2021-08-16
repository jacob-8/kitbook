import { parseCaptionsXml, parseTracksXml } from './captions';
// import fetch from 'isomorphic-unfetch';
// improve fetch mock with https://kentcdodds.com/blog/stop-mocking-fetch

// test('getTracks should get tracks', async () => {
//   global.fetch = fetch;
//   expect(await getTracks('rokGy0huYEA')).toMatchInlineSnapshot();
// });

test('parseTracksXml returns array even when there is 1 track', () => {
  expect(parseTracksXml('<?xml version="1.0" encoding="utf-8" ?><transcript_list docid="14931616755950075552"><track id="0" name="" lang_code="en" lang_original="English" lang_translated="English" lang_default="true"/></transcript_list>')).toHaveLength(1);
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

test('parseCaptionsXml', () => {
  expect(
    parseCaptionsXml(`<?xml version="1.0" encoding="utf-8" ?><transcript><text start="2.102" dur="4.122">So Glasgow got a great theatre,
  A lively crowd
  And a great atmosphere</text><text start="6.725" dur="2.6">So far though
  There is one thing missing</text><text start="9.526" dur="0.7">Talent!</text><text start="12.127" dur="5.9">Yes, tensions are high backstage
  As everyone wonders where that
  Talent is going to come from?</text><text start="18.228" dur="5.1">Next up is a contestant who thinks
  She has what it takes
  To put Glasgow on the map</text><text start="24.729" dur="2">Alright
  How are you doing?
  I&amp;#39;m very well</text><text start="26.83" dur="5.5">My name is Susan Boyle
  I&amp;#39;m nearly 48
  Currently unemployed but i&amp;#39;m still looking</text><text start="32.331" dur="2.8">I&amp;#39;m going to sing for you on
  Britains Got Talent today</text><text start="35.232" dur="4">A little nervous?
  Yeah Sure!
  That&amp;#39;s not surprising</text><text start="40.133" dur="3.2">At the moment I live
  On my own with my cat
  Called Pebbles</text><text start="43.434" dur="6.6">i&amp;#39;ve never been married
  Never been kissed
  Oh shame, but its not and advert!</text><text start="50.335" dur="3.1">Have you done this for many a year?
  Since I was twelve</text><text start="54.136" dur="8.4">I have always wanted to
  Perform in front of a large audience
  I&amp;#39;m going to make that audience ROCK!</text><text start="68.137" dur="6.1">Hi, what&amp;#39;s your name darling?
  My name is Susan Boyle
  Ok, Susan where are you from?</text><text start="74.438" dur="2.1">I&amp;#39;m from Blackburn
  Near Bathgate
  West Lothian</text><text start="76.539" dur="4.8">Its a big town?
  its a sort of a collection of
  A collection of eh</text><text start="82.94" dur="3.8">Villages!
  Had to think there
  And how old are you Susan?</text><text start="86.741" dur="2.5">I&amp;#39;m 47</text><text start="90.942" dur="4.3">And that&amp;#39;s just one side of me</text><text start="100.143" dur="5.1">Ok whats the dream?
  I&amp;#39;m trying to be a professional singer</text><text start="105.244" dur="4.3">And why hasn&amp;#39;t it
  Worked out so far Susan?
  I haven&amp;#39;t been giving the chance before</text><text start="109.545" dur="4.6">But heres hoping it will change?
  Who would you like to be
  As successful as?</text><text start="114.346" dur="1.6">Elaine Paige!</text><text start="115.947" dur="1.2">What are you going to
  Sing for us?</text><text start="117.248" dur="3.5">I&amp;#39;m going to sing
  I Dreamed A Dream
  From Les Miserables</text><text start="120.749" dur="6.3">Ok Big Song!
  Yeah
  Yeah!</text><text start="137.35" dur="5.7">I dreamed a dream
  In time gone by
  ( Cheering and Applause )</text><text start="144.051" dur="6">When hope was high
  And life worth living
  ( You didnt expect that did you? No )</text><text start="150.052" dur="6.5">I dreamed that love
  Would never die</text><text start="157.253" dur="5.5">I dreamed that
  God would be forgiving</text><text start="163.454" dur="5.5">Then I was young
  And unafraid</text><text start="169.855" dur="7">And dreams were made
  And used and wasted</text><text start="177.856" dur="5.8">There was no ransom
  to be paid</text><text start="183.757" dur="5.5">No song unsung
  No wine untasted</text><text start="190.358" dur="12.7">But the tigers come at night
  With their voices soft as thunder</text><text start="203.159" dur="19.4">As they tear your hope apart
  And they turn your dream to shame
  ( Look at that! )</text><text start="222.56" dur="12.6">And still I dream he&amp;#39;ll come to me
  That we will live the years together</text><text start="235.361" dur="13.3">But there are dreams that cannot be
  And there are storms we cannot weather</text><text start="251.762" dur="11.1">I had a dream my life would be
  So different from this hell I&amp;#39;m living</text><text start="262.963" dur="15">So different now from what it seemed
  Now life has killed the dream I dreamed.</text><text start="278.064" dur="10">HUGE APPLAUSE !</text><text start="290.565" dur="8.6">Hey, Come back here, wait, wait
  Alright, Thank you very much, Susan
  Ok Piers</text><text start="299.366" dur="7.4">Without a doubt that
  Is the biggest surprise I have had
  In my three years on the show</text><text start="307.767" dur="6.2">When you stood there
  With that cheeky grin
  And said &amp;quot;I want to be like Elaine Paige&amp;quot;</text><text start="313.968" dur="4.9">And everyone was laughing at you
  No-One is laughing now!
  That was STUNNING!</text><text start="318.869" dur="4.5">An incredible perfomance
  (APPLAUSE)</text><text start="324.17" dur="4.1">Amazing!
  I&amp;#39;m reeling from shock
  I don&amp;#39;t know what you thought of it?</text><text start="328.371" dur="4.9">I&amp;#39;m so thrilled because
  I know everybody was against you</text><text start="333.372" dur="7">I honestly think we were all
  Being very cynical and that&amp;#39;s
  The biggest wake-up call ever</text><text start="340.373" dur="7.2">And i just want to say
  It was a complete privilege
  Listening to that (APPLAUSE) (Thank You)</text><text start="348.574" dur="5.4">Susan I knew the minute
  You walk out ( Laughter)
  Oh Simon!</text><text start="354.075" dur="8.4">On that stage that we were
  Going to hear something extraordinary
  And I was right ( Laughter)</text><text start="362.576" dur="1.9">What a load of tosh!</text><text start="364.477" dur="5.3">Susan, you are a little tiger
  Aren&amp;#39;t you?
  I don&amp;#39;t know about that</text><text start="369.778" dur="3.2">You are, Ok, moment of truth
  Piers, Yes or No?</text><text start="372.979" dur="5.4">The biggest YES I have
  Ever given anybody</text><text start="378.88" dur="8.6">Amanda? Yes, definitley
  Susan Boyle, you can go back
  To your village</text><text start="387.781" dur="7.5">With your head held high
  Its three Yeses</text><text start="397.982" dur="8.9">HUGE APPLAUSE
  (Thank you)</text><text start="410.783" dur="4.3">I think you enjoyed
  That just a little!
  You maybe right</text><text start="415.784" dur="3.3">What a voice!
  Incredible</text><text start="419.385" dur="6">Congratulations!
  Oh my god!
  How do you feel?</text><text start="425.486" dur="1.7">Bloody fantastic</text><text start="427.187" dur="6.7">Piers said thats the biggest YES
  He&amp;#39;s ever given on the show
  In three series, Oh my god!</text><text start="433.888" dur="5">Mind blowing
  The most extraordinary shock
  We&amp;#39;ve ever had</text><text start="438.889" dur="7.1">Just so emotional
  Unbelieveable, Emotional
  And Fantastic</text></transcript>`)
  ).toMatchSnapshot();
});
