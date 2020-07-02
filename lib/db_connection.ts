import * as mysql2 from 'mysql2/promise';
import config from '../config/config';

const dbConnect = () => mysql2.createPool(config.db_dev);
// const dbConnect = () => mysql2.createPool(config.db_production);

export default dbConnect;