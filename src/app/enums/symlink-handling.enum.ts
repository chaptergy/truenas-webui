import { marker as T } from '@biesbjerg/ngx-translate-extract-marker';

export enum SymlinkHandling {
  Ignore = 'IGNORE',
  Follow = 'FOLLOW',
  RcloneLink = 'RCLONELINK',
}

export const transferModeNames = new Map<SymlinkHandling, string>([
  [SymlinkHandling.Ignore, T('IGNORE')],
  [SymlinkHandling.Follow, T('FOLLOW')],
  [SymlinkHandling.RcloneLink, T('RCLONELINK')],
]);
