export interface Player {
  bungieGlobalDisplayName: string;
  bungieGlobalDisplayNameCode: number;
  bungieNetMembershipId: string;
  profilePicturePath: string;
  destinyMemberships: Array<{
    iconPath: string;
    displayName: string;
    membershipType: number;
    membershipId: string;
  }>;
}
