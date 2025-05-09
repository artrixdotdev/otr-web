import { RulesetEnumHelper } from '@/lib/enums';
import { SelectContent, SelectItem } from '../ui/select';
import { Ruleset } from '@osu-tournament-rating/otr-api-client';

export default function RulesetSelectContent({
  maniaOther = false,
}: {
  maniaOther?: boolean;
}) {
  return (
    <SelectContent>
      {Object.entries(RulesetEnumHelper.metadata).map(([k, { text }]) => {
        if (Number(k) === Ruleset.ManiaOther && !maniaOther) {
          return;
        }

        return (
          <SelectItem key={`ruleset-${k}`} value={k}>
            {text}
          </SelectItem>
        );
      })}
    </SelectContent>
  );
}
