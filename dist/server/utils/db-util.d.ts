declare const _default: {
    query: (sql: string, values: (string | number | (string | number)[])[]) => Promise<unknown>;
    createTable: (sql: string) => Promise<unknown>;
    findDataById: (table: string, id: string, start: number, end: number) => Promise<unknown>;
    findDataByPage: (table: string, keys: string, start: number, end: number) => Promise<unknown>;
    deleteDataById: (table: string, id: string) => Promise<unknown>;
    insertData: (table: string, values: []) => Promise<unknown>;
    updateData: (table: string, values: [], id: string) => Promise<unknown>;
    select: (keys: string[], table: string) => Promise<unknown>;
    selectWhere: (keys: string[], table: string, where: string) => Promise<unknown>;
    count: (table: string) => Promise<unknown>;
};
export default _default;
