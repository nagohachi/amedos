import * as convert from "xml-js";

async function fetchLocationFromKeyword(keyword: string) {
  const response = await fetch(
    `https://geoapi.heartrails.com/api/xml?method=suggest&matching=like&keyword=${keyword}`
  );
  const dataText = await response.text();
  const locations = JSON.parse(convert.xml2json(dataText, { compact: true }))
    .response.location;
  // location が配列の場合は、最初の要素を取得
  let location;
  if (Array.isArray(locations)) {
    location = locations[0];
  } else {
    location = locations;
  }

  // location が undefined の場合は、エラーを投げる
  if (!location) {
    throw new Error(
      "有効なキーワードではありません。市町村名などを入力してください。"
    );
  }

  // JSON から緯度経度を取得
  const lng = parseFloat(location.x._text);
  const lat = parseFloat(location.y._text);
  return { lat, lng } as { lat: number; lng: number };
}

export default fetchLocationFromKeyword;
