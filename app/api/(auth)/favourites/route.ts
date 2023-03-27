import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createFavourite,
  getFavourites,
  getFavouritesWithUserinfo,
} from '../../../../database/favourites';

const userType = z.object({
  user_giver_id: z.number(),
  user_receiver_id: z.number(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const favourites = await getFavourites();

  return NextResponse.json({ favourites: favourites });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = userType.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    console.log('error.issues', result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties id, user_giver_id, user_receiver_id ',
      },
      { status: 400 },
    );
  }

  const newUser = await createFavourite(
    result.data.user_giver_id,
    result.data.user_receiver_id,
  );

  return NextResponse.json({ user: newUser });
}
