// copied from web-app repo, consider unifying when merging repos

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/typedef
export const routeBuilders = {
    home: (_: void) => '/',
    signIn: (params: { returnTo?: string } | void) => {
        // eslint-disable-next-line @typescript-eslint/typedef
        const returnToQuery = params?.returnTo ? `?redirectTo=${encodeURIComponent(params.returnTo)}` : '';
        return '/sign-in' + returnToQuery;
    },
    administration: (_: void) => '/administration',
    profile: (_: void) => '/profile',
    profileBookingRequests: (_: void) => '/profile/bookings',
    userProfileBookingRequest: (params: { bookingRequestId: string }) => '/profile/bookings/s/' + params.bookingRequestId,
    cookProfileBookingRequest: (params: { bookingRequestId: string }) => '/profile/bookings/r/' + params.bookingRequestId,
    profileGlobalBookingRequest: (params: { globalBookingRequestId: string }) =>
        '/profile/bookings/global/' + params.globalBookingRequestId,
} as const;
