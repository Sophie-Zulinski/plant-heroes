import { NextRequest, NextResponse } from 'next/server';
import { nullable, z } from 'zod';
import {
  createFavourite,
  Favourites,
  getFavouriteID,
  updateFavourites,
} from '../../../../../database/favourites';

const userType = z.object({
  id: z.number(),
  user_giver_id: z.number(),
  user_receiver_id: z.number(),
});

export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: Record<string, string | string[] | number | undefined | null> },
) {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'User id is not valid',
      },
      { status: 400 },
    );
  }

  const favourite = await getFavouriteID(userId);

  return NextResponse.json({ user: favourite });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = userType.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        error: 'Request body is missing one of the needed properties  ',
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

export async function PUT(
  request: NextRequest,
  {
    params,
  }: { params: Record<string, string | string[] | number | null | undefined> },
) {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'User id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();
  console.log('body', body);
  const result = userType.safeParse(body);
  console.log('result', body);
  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    console.log(result.error.issues);

    return NextResponse.json(
      {
        error: 'Request body is missing one of the needed properties  ',
      },
      { status: 400 },
    );
  }

  const newFavourite = await updateFavourites(
    userId,
    result.data.user_giver_id,
    result.data.user_receiver_id,
  );

  return NextResponse.json({ favourite: newFavourite });
}
