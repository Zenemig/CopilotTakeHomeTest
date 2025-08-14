import { Bird } from "../../types";

interface OtherLanguagesProps {
  bird: Bird;
}

export const OtherLanguages = ({ bird }: OtherLanguagesProps) => {
  const otherLanguages = Object.entries(bird).filter(([key]) => key.endsWith('_name') && key !== 'english_name');

  const languageLabel = (key: string) => {
    return key.split('_').map(word => {
      if (word !== 'name') {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return null;
    }).join(' ');
  }

  return (
    <div className="flex justify-between items-start gap-4">
      {otherLanguages.map(([key, value]) => (
        <div key={key} className="flex-1">
          <p className="text-text-secondary text-sm">{languageLabel(key)}</p>
          <p className="text-text-primary">{value}</p>
        </div>
      ))}
    </div>
  )
}