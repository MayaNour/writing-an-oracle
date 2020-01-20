//@nearfile
import { storage, logging } from "near-runtime-ts";
import { OracleQueryParams } from "./model";

// --- contract code goes below

export function setResponseByKey(key: string, newResponse: string): void { // Store and retrieve information from the blockchaine22
  storage.setString(key, newResponse);
}

export function getResponseByKey(key: string): string {  // I got an error here, "Object is possibly 'null'.", I think the solution should be (key: string|null)
  return storage.getString(key);                        // With an if statement to handle both cases, so if null return null
}                                                       // and if key return storage.getString(key);


export function setOracleQueryParams(uid: string, url: string, callback: string): void {

  let oracleQueryParams = new OracleQueryParams()
  oracleQueryParams.uid = uid
  oracleQueryParams.url = url
  oracleQueryParams.callback = callback

  storage.setBytes(`oracleQueryParams`, oracleQueryParams.encode().serialize())
}

export function getOracleQueryParams(): OracleQueryParams {
  return OracleQueryParams.decode(storage.getBytes('oracleQueryParams'))
}

export function finalizeBet(): void {
  let price = storage.getString("btc-price")
  if (price) {
    let btcPrice: f64 = parseFloat(price.split(',').join(''));
    let outcome: string;
    if (btcPrice >= 5000) {
      outcome = "BTC price is " + btcPrice.toString() + "- Pay Moon Hodler 2000 USD"
    } else {
      outcome = "BTC price is " + btcPrice.toString() + "- Pay FUD Hodler 2000 USD"
    }
    storage.setString("betOutcome", outcome)
  } else {
    storage.setString("betOutcome", "btc price is undefined")
  }
}
