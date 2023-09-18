export function fetchCurrentFile(file_token:string){
    fetch("https://file.notion.so/f/t/c399f679-acb7-46d6-9792-83c4c630b44d/Export-2ff388f3-081f-433f-9848-493b534b1e2b.zip?id=121e46fb-0d34-455c-8717-39590bcdccb2&table=user_export&expirationTimestamp=1695145178700&signature=xFmHwEvXCE2mY6g3Qy6X6v4BMbDo5sCouJX7crLnydI&download=true&downloadName=c399f679-acb7-46d6-9792-83c4c630b44d%2FExport-2ff388f3-081f-433f-9848-493b534b1e2b.zip", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-site",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1"
        },
        "referrer": "https://www.notion.so/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      });
}