import { User } from "../user_controller/user";
import axios from "axios";
import { getQuote } from "../services/exchange";

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("testing user methods", ()=>{
    const user = new User({cash: {"BRL": 0, "USD": 0}});

    const data = {
      "Meta Data": {
        "4. Last Refreshed": "2023-02-17 11:55:00"
      },
      "Time Series FX (5min)": {
        "2023-02-17 11:55:00": {
          "1. open": "0.1920"
        }
      }
    };
    const resp = {data: data};
    mockedAxios.request.mockResolvedValueOnce(resp);

    it("deposite should work",()=>{
        let value = 300;
        let to_coin = "BRL"
        user.deposite(value,to_coin);
        expect(user.cash[to_coin]).toEqual(value);
    });
    it("exchange should work", async()=>{
        let value = 100;
        let from_coin = "BRL";
        let to_coin = "USD";
        await user.exchange(value,from_coin,to_coin);
        expect(user.cash["USD"]).toEqual(19.20);
    });
});

describe("testing services", ()=>{
  const data = {
    "Meta Data": {
      "4. Last Refreshed": "2023-02-17 11:55:00"
    },
    "Time Series FX (5min)": {
      "2023-02-17 11:55:00": {
        "1. open": "0.1920"
      }
    }
  };
  const resp = {data: data};
  mockedAxios.request.mockResolvedValueOnce(resp);

  it("getQuote should work",async()=>{
    let quote = await getQuote("BRL","USD");
    expect(quote).toEqual(0.192);
  });
})

jest.clearAllMocks();