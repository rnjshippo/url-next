import * as mysql2 from 'mysql2/promise';
import config from '../config/config';

const dbConnect = () => mysql2.createPool(config.db_dev);

export default dbConnect;