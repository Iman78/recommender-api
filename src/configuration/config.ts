export const serverConfig : ServerConfig= {
    PORT : process.env.PORT
}
export const dbConfig : DbConfig= {
    MONGODB_DBNAME : process.env.MONGODB_DBNAME,
    MONGODB_USER : process.env.MONGODB_USER,
    MONGODB_PASSWORD : process.env.MONGODB_PASSWORD,
}

export type ServerConfig ={
    PORT : string;
}
export type DbConfig ={
    MONGODB_DBNAME : string;
    MONGODB_USER : string;
    MONGODB_PASSWORD : string;
}