'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import LoginButton from '../buttons/LoginButton';
import Link from 'next/link';
import ProfileRoleBadge from './ProfileRoleBadge';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useMediaQuery, useToggle } from '@uidotdev/usehooks';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '../ui/collapsible';
import { logout } from '@/lib/actions/auth';
import { useSession } from '@/lib/hooks/useSession';
import { UserDTO } from '@osu-tournament-rating/otr-api-client';

export default function ProfileCard() {
  const [isOpen, toggleIsOpen] = useToggle();
  const user = useSession();
  const isMobile = useMediaQuery('only screen and (max-width : 768px)');

  if (!user) {
    return <LoginButton />;
  }

  if (isMobile) {
    return (
      <Collapsible open={isOpen} onOpenChange={toggleIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="relative mb-2 w-full cursor-pointer overflow-hidden rounded-md md:hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute inset-0 backdrop-blur-md" />
              <Image
                src={'/decorations/decoration-2.svg'}
                alt="background image"
                width={300}
                height={200}
                className="size-full object-cover"
              />
            </div>
            <div className="relative z-10 flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <UserAvatar user={user} />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {user?.player.username}
                  </span>
                  {user?.scopes && <ProfileRoleBadge scopes={user?.scopes} />}
                </div>
              </div>
              <ChevronDown
                className={cn(
                  'size-4 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Link
            href={`/players/${user?.player.id}`}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <User className="size-4" />
            <span>My Profile</span>
          </Link>

          <Link
            href="/settings"
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <Settings className="size-4" />
            <span>Settings</span>
          </Link>

          <button
            onClick={() => logout()}
            className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10"
          >
            <LogOut className="size-4" />
            <span>Log out</span>
          </button>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={toggleIsOpen}>
      <DropdownMenuTrigger asChild>
        {/* Profile picture */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="cursor-pointer focus:outline-none"
        >
          <UserAvatar user={user} />
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 w-56 rounded-xl bg-card">
        {/* Player card */}
        <DropdownMenuLabel className="relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 backdrop-blur-md" />
            <Image
              src={'/decorations/decoration-2.svg'}
              alt="background image"
              width={300}
              height={200}
              className="size-full object-cover"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center py-1">
            <div className="flex items-center gap-2">
              <p className="text-sm leading-none">
                <span className="font-bold">
                  {user?.player.username ?? 'Username'}
                </span>
              </p>
              {user?.scopes && <ProfileRoleBadge scopes={user?.scopes} />}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Player page link */}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/players/${user?.player.id}`}>
            <User className="mr-2 size-4" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>
        {/* Settings */}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings">
            <Settings className="mr-2 size-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Log out */}
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer text-destructive hover:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserAvatar({ user }: { user: UserDTO | undefined }) {
  return (
    <Avatar className="size-9 transition-all hover:border-primary/80">
      <AvatarImage
        src={`https://a.ppy.sh/${user.player.osuId}`}
        alt={
          user?.player.username
            ? `${user.player.username}'s avatar`
            : 'User avatar'
        }
      />
      <AvatarFallback>
        <User className="size-4" />
      </AvatarFallback>
    </Avatar>
  );
}
