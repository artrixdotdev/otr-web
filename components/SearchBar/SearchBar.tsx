'use client';

import { fetchSearchData } from '@/app/actions';
import SearchIcon from '@/public/icons/search.svg';
import { useClickAway } from '@uidotdev/usehooks';
import { AnimatePresence, motion, stagger } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useActionState } from 'react';
import styles from './SearchBar.module.css';

const initialState = {
  search: undefined,
};

const containerMotionStates = {
  initial: {
    backgroundColor: 'hsla(0, 0%, 0%, 0)',
    transition: {
      delay: 0.15,
    },
  },
  animate: {
    backgroundColor: 'hsla(0, 0%, 0%, 0.8)',
  },
};

const bodyMotionStates = {
  initial: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.15,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.2,
    },
  },
};

const bodyContentMotionStates = {
  initial: {
    opacity: 0,
    x: -10,
  },
  animate: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.15 * index,
      ease: 'easeOut',
    },
  }),
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.3,
      delay: 0.15,
      ease: 'easeOut',
    },
  },
};

const mode: { [key: number]: { image: any; alt: string } } = {
  0: 'std',
  1: 'taiko',
  2: 'ctb',
  3: 'mania',
};

const disableEnter = (e) => {
  if (e.keyCode === 13) return e.preventDefault();
};

// Highlight function
const highlightMatch = (text, query) => {
  if (!query) return text;

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <span>{text.slice(index, index + query.length)}</span>
      {text.slice(index + query.length)}
    </>
  );
};

export default function SearchBar({ setIsSeachBarOpen }) {
  const [searchValue, setSearchValue] = useState('');
  const [state, formAction] = useActionState(fetchSearchData, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useClickAway(() => {
    setIsSeachBarOpen(false);
  });

  useEffect(() => {
    if (searchValue.length < 3) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let timeout = setTimeout(() => {
      let formData = new FormData();
      formData.append('search', searchValue);
      formAction(formData);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  useEffect(() => {
    if (state?.status !== 'success') return;

    setIsLoading(false);
  }, [state]);

  return (
    <motion.div
      className={styles.container}
      initial={containerMotionStates.initial}
      animate={containerMotionStates.animate}
      exit={containerMotionStates.initial}
    >
      <motion.div
        className={styles.body}
        ref={ref}
        initial={bodyMotionStates.initial}
        animate={bodyMotionStates.animate}
        exit={bodyMotionStates.initial}
        layout="position"
      >
        <form
          action={fetchSearchData}
          className={styles.bar}
          onKeyDown={disableEnter}
        >
          <input
            name={'search'}
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={(e) => e.preventDefault(true)}
            autoFocus={true}
          />
          <div className={styles.icon}>
            {isLoading ? (
              <span aria-saving="true" />
            ) : (
              <SearchIcon className="stroke" />
            )}
          </div>
        </form>
        {state?.search?.players.length > 0 && (
          <motion.div
            className={styles.content}
            initial={bodyContentMotionStates.initial}
            animate={bodyContentMotionStates.animate}
            exit={bodyContentMotionStates.exit}
            custom={1}
            layout={'position'}
          >
            <h3 className={styles.header}>Players</h3>
            <div className={styles.list}>
              {state?.search?.players.slice(0, 12).map((player) => {
                return (
                  <Link
                    href={`/players/${player.id}`}
                    className={styles.item}
                    key={player.username}
                    onClick={() => setIsSeachBarOpen(false)}
                  >
                    <div className={styles.propic}>
                      <Image
                        src={`http://${player.thumbnail}`}
                        alt={`${player.username}`}
                        fill
                      />
                    </div>
                    <div className={styles.name}>
                      {highlightMatch(player.username, searchValue)}
                    </div>
                    <div className={styles.secondaryInfo}>
                      {player.globalRank && (
                        <div className={styles.rank}>
                          #
                          {Intl.NumberFormat('us-US').format(player.globalRank)}
                        </div>
                      )}
                      {player.rating && (
                        <div className={styles.rating}>
                          {player.rating.toFixed(0)} TR
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
        {state?.search?.tournaments.length > 0 && (
          <motion.div
            className={styles.content}
            initial={bodyContentMotionStates.initial}
            animate={bodyContentMotionStates.animate}
            exit={bodyContentMotionStates.exit}
            custom={2}
            layout={'position'}
          >
            <h3 className={styles.header}>Tournaments</h3>
            <div className={styles.list}>
              {state?.search?.tournaments.slice(0, 12).map((tournament) => {
                return (
                  <Link
                    className={styles.item}
                    key={tournament.name}
                    href={`/tournaments/${tournament.id}`}
                    onClick={() => setIsSeachBarOpen(false)}
                  >
                    <div className={styles.name}>
                      {highlightMatch(tournament.name, searchValue)}
                    </div>
                    <div className={styles.secondaryInfo}>
                      <div className={styles.mode}>
                        {mode[tournament.ruleset]}
                      </div>
                      <div className={styles.format}>
                        {tournament.lobbySize}v{tournament.lobbySize}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
        {state?.search?.matches.length > 0 && (
          <motion.div
            className={styles.content}
            initial={bodyContentMotionStates.initial}
            animate={bodyContentMotionStates.animate}
            exit={bodyContentMotionStates.exit}
            custom={3}
            layout={'position'}
          >
            <h3 className={styles.header}>Matches</h3>
            <div className={styles.list}>
              {state?.search?.matches.slice(0, 12).map((match) => {
                return (
                  <div className={styles.item} key={match.name}>
                    <div className={styles.name}>
                      {highlightMatch(match.name, searchValue)}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
