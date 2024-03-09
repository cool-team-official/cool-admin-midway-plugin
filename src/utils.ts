import CryptoJS from "crypto-js";

/**
 * 获得ws签名链接
 * @param options
 * @returns
 */
export const getWebsocketUrl = async (options): Promise<string> => {
  const { APIKey, APISecret, Host, url, version } = options;
  const { urlVersion } = getVersions(options);
  return signUrl(options, "wss", Host, `/${urlVersion}/chat`);
};

/**
 * 地址签名
 * @param options
 * @param pre
 * @param host
 * @param url
 * @returns
 */
export const signUrl = (
  options,
  pre,
  host,
  url,
  method = "GET"
): Promise<string> => {
  const { APIKey, APISecret } = options;
  return new Promise((resolve, reject) => {
    let apiKey = APIKey;
    let apiSecret = APISecret;
    let wsUrl = `${pre}://${host}${url}`;
    // @ts-ignore
    let date = new Date().toGMTString();
    let algorithm = "hmac-sha256";
    let headers = "host date request-line";
    let signatureOrigin = `host: ${host}\ndate: ${date}\n${method} ${url} HTTP/1.1`;
    let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    let signature = CryptoJS.enc.Base64.stringify(signatureSha);
    let authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    let authorization = btoa(authorizationOrigin);
    wsUrl = `${wsUrl}?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(encodeURI(wsUrl));
  });
};

// 发送消息
export const webSocketSend = (ws, options, messages) => {
  const { domain } = getVersions(options);
  const { APPID, parameter } = options;
  var params = {
    header: {
      app_id: APPID,
      uid: "COOL",
    },
    parameter: {
      chat: {
        domain,
        temperature: 0.1,
        max_tokens: 2028,
        ...parameter,
      },
    },
    payload: {
      message: {
        text: messages,
      },
    },
  };
  ws.send(JSON.stringify(params));
};

// 获取版本对应的域名和url版本
const getVersions = (options) => {
  const { Version } = options;
  const domains = {
    "v1.5": "general",
    "v2.0": "generalv2",
    "v3.0": "generalv3",
    "v3.5": "generalv3.5",
  };

  const urls = {
    "v1.5": "v1.1",
    "v2.0": "v2.1",
    "v3.0": "v3.1",
    "v3.5": "v3.5",
  };
  return {
    domain: domains[Version],
    urlVersion: urls[Version],
  };
};
