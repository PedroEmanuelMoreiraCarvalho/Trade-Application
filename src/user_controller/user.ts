import { getQuote } from "../services/exchange";

class User {
    _id?: string;
    cash: {
        [BRL: string]: number,
        USD: number
    };

    constructor(obj: any){
        this._id = obj?._id;
        this.cash = obj.cash;
    }

    getCash(coin: string): number{
        return this.cash[coin];
    }

    deposite(cash: number, to_coin: string): void{
        if(this.cash[to_coin] === undefined)return;
        this.cash[to_coin] += cash;
    }

    removeCash(cash: number, to_coin: string): void{
        if(this.cash[to_coin] === undefined)return;
        this.cash[to_coin] -= cash;
    }

    async exchange(cash: number, from_coin: string, to_coin: string): Promise<void>{
        if(this.cash[from_coin] < cash) return;

        this.removeCash(cash,from_coin);

        let quote: number = await getQuote(from_coin, to_coin);
        let converted_cash = cash * quote;

        this.deposite(converted_cash, to_coin);
    }
}

export { User };