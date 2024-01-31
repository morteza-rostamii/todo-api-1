import mongoose from "mongoose";

(global as any).mongoose = {
  conn: null,
  promise: null,
}

export async function dbConnect(): Promise<any> {

  if ((global as any).mongoose && (global as any).mongoose.conn) {
    console.log('already connected!');
    return (global as any).mongoose.conn;
  }
  else {
    const connectionStr: string = process.env.MONGO_URL || '';

    const promise = mongoose.connect(connectionStr, {
      autoIndex: true,
    });

    const db = mongoose.connection;

    db.on('error', () => {
      console.error.bind(console, 'connection error!');
    });
    db.once('open', () => console.log('connected!'));

    // saving connection in global object
    (global as any).mongoose = {
      // get db connection
      conn: await promise,
      promise,
    };
    console.log('new connection to mongo_atlas');

    // return connection
    return await promise;
  }
}