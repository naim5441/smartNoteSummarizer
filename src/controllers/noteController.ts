import Note from "../db";

export const saveNote = async (title: string, summary: string) => {
  const note = new Note({
    dateTime: new Date(),
    title,
    summary,
  });

  try {
    await note.save();
    console.log(`Note ${title} saved successfully.`);
  } catch (err) {
    console.error(`Failed to save note: ${err}`);
  }
};
