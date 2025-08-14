import { WatermarkedImage } from "../common/WatermarkedImage"
import { Bird, Note } from "../../types"
import { formatTimestamp } from "../../utils/formatTimestamp"
import { Button } from "../common/Button";

interface NotesListProps {
  notes: Note[];
  bird: Bird;
  onAddNoteClick?: () => void;
}

export const NotesList = ({ notes, bird, onAddNoteClick }: NotesListProps) => {
  if (!!bird && notes.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-text-primary text-sm font-medium">No notes yet</p>
        <Button 
          variant="secondary" 
          className="w-fit"
          onClick={onAddNoteClick}
        >
          Add note
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {notes.map((note, index) => (
        <div className="flex gap-4 items-center" key={index}>
          <WatermarkedImage
            src={bird.thumb_url}
            alt={bird.english_name}
            className="w-14 h-14 object-cover rounded-lg"
          />
          <div className="flex flex-col w-full">
            <p className="text-text-primary font-medium">
              {note.comment}
            </p>
            <p className="text-text-secondary text-sm">
              {formatTimestamp(note.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}