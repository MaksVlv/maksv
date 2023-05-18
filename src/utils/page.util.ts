import { NextApiRequest } from "next";

export default class Page {

    public page: number;
    public size: number;
    public count: number;
    public search: string;
    public data: any[];

    constructor(req: NextApiRequest) {
        this.page = 0
        this.size = 5
        this.count = 0
        this.search = ''

        this.data = []

        if (req.query.page) {
            this.page = Number(req.query.page)
        }
        if (req.query.size) {
            this.size = Number(req.query.size)
        }
        if (req.query.search) {
            this.search = req.query.search as string
        }
    }

    get Page() { return this.page }
    get Search() { return this.search }
    get Size() { return this.size }
    get Count() { return this.count }
    get Data() { return this.data }

    setCount(count: number) {
        this.count = count
    }

    setData(data: any[]) {
        this.data = data
    }

    pageResponse() {
        return {
            page: this.page,
            pages: Math.ceil(this.count/this.size),
            data: this.data
        }
    }
}
