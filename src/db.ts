import config from "config";
import mongoose, { Document, Schema } from "mongoose";

const db: string = config.get<string>("mongodb.uri");

interface NoteSchema extends Document {
  dateTime: Date;
  title: String;
  summary: String;
}

const NoteSchema = new Schema<NoteSchema>({
  dateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model<NoteSchema>("Note", NoteSchema);

export default Note;

//const connectDB = async () => {
//  try {
//    await mongoose.connect(db);
//    console.log("MongoDB is connected...");
//  } catch (err) {
//    console.error(err);
//    process.exit(1);
//  }
//};

//export default connectDB;
