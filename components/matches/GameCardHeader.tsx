import { ScoringTypeEnumHelper, TeamTypeEnumHelper } from '@/lib/enums';
import { GameDTO } from '@osu-tournament-rating/otr-api-client';
import Image from 'next/image';
import RulesetIcon from '../icons/RulesetIcon';
import ModIconset from '../icons/ModIconset';

export default function GameCardHeader({ game }: { game: GameDTO }) {
  const startDate = new Date(game.startTime).toLocaleDateString();
  const endDate = new Date(game.endTime ?? new Date()).toLocaleDateString();

  return (
    <div className="relative flex h-32 flex-col overflow-hidden rounded-xl">
      {/* Beatmap bg dim */}
      <div className="absolute inset-0 z-2 h-full w-full bg-black/50" />
      {/* Beatmap bg */}
      <Image
        className="absolute z-1 rounded-xl object-cover"
        src={`https://assets.ppy.sh/beatmaps/${game.beatmap.beatmapset?.osuId}/covers/cover@2x.jpg`}
        alt={'beatmap cover'}
        fill
      />
      {/* Game / beatmap info */}
      <div className="z-2 flex h-full w-full flex-col p-2">
        {/* Top row */}
        <div className="flex h-8 w-full items-center justify-between">
          <div className="flex h-full flex-row items-center gap-4 whitespace-nowrap">
            <RulesetIcon
              className="h-full w-fit fill-foreground stroke-0 py-1"
              ruleset={game.ruleset}
            />
            <span>
              {ScoringTypeEnumHelper.getMetadata(game.scoringType).text}
            </span>
            <span>{TeamTypeEnumHelper.getMetadata(game.teamType).text}</span>
          </div>
          <div>
            <span>{`${startDate} - ${endDate}`}</span>
          </div>
        </div>
        {/* Bottom row */}
        <div className="flex w-full flex-1 flex-row justify-between">
          <div className="flex max-w-3/4 flex-1 flex-col justify-end">
            <span className="text-lg">
              Set by {game.beatmap.beatmapset?.creator?.username} • Map by{' '}
              {game.beatmap.creators.map((c) => c.username).join(',')}
            </span>
            <span className="overflow-clip text-4xl font-bold text-nowrap">
              {game.beatmap.beatmapset?.title} [{game.beatmap.diffName}]
            </span>
          </div>
          <div className="flex min-w-1/8 flex-row items-end justify-end">
            <ModIconset mods={game.mods} freemod={game.isFreeMod} />
          </div>
        </div>
      </div>
    </div>
  );
}
